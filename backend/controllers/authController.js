import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createOtp, hashOtp, otpMatches } from "../utils/otp.js";
import { sendVerificationCode } from "../utils/emailSender.js";
import { sendPhoneVerificationCode } from "../utils/phoneSender.js";

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_RE = /^\+?[1-9]\d{9,14}$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,64}$/;
const OTP_TTL_MS = 5 * 60 * 1000;

function normalizePhone(value) {
  const cleaned = value.replace(/[\s()-]/g, "");
  if (/^01\d{9}$/.test(cleaned)) return `+880${cleaned.slice(1)}`;
  if (/^8801\d{9}$/.test(cleaned)) return `+${cleaned}`;
  if (/^\+?\d+$/.test(cleaned)) return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
  return cleaned;
}

function readContact(body = {}) {
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (email && rawPhone) return null;
  if (email) return EMAIL_RE.test(email) ? { channel: "email", value: email } : null;
  if (rawPhone) {
    const phone = normalizePhone(rawPhone);
    return PHONE_RE.test(phone) ? { channel: "phone", value: phone } : null;
  }
  return null;
}

function isAdult(dob) {
  const now = new Date();
  let age = now.getUTCFullYear() - dob.getUTCFullYear();
  const beforeBirthday = now.getUTCMonth() < dob.getUTCMonth()
    || (now.getUTCMonth() === dob.getUTCMonth() && now.getUTCDate() < dob.getUTCDate());
  if (beforeBirthday) age -= 1;
  return age >= 18;
}

function schedulePendingUserCleanup(user) {
  const delay = Math.max(0, user.otpExpiresAt.getTime() - Date.now());
  const cleanup = setTimeout(() => {
    User.deleteOne({
      _id: user._id,
      isVerified: false,
      otpExpiresAt: { $lte: new Date() },
    }).catch((error) => console.error("Expired registration cleanup failed:", error.message));
  }, delay + 250);
  cleanup.unref?.();
}

async function issueOtp(user) {
  const code = createOtp();
  user.otpHash = hashOtp(code);
  user.otpExpiresAt = new Date(Date.now() + OTP_TTL_MS);
  await user.save();
  schedulePendingUserCleanup(user);

  try {
    if (user.email) await sendVerificationCode({ email: user.email, name: user.name, code, otpExpiresAt: user.otpExpiresAt });
    else await sendPhoneVerificationCode({ phone: user.phone, name: user.name, code });
  } catch (error) {
    console.error("Verification code could not be delivered:", error.message);
    throw new Error(`Could not send the verification code. Check the backend ${user.email ? "SMTP" : "Twilio SMS"} settings and try again.`);
  }
}

export async function register(req, res) {
  const body = req.body ?? {};
  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : `${firstName} ${lastName}`.trim();
  const contact = readContact(body);
  const password = typeof body.password === "string" ? body.password : "";

  if (!name || !contact || !password) {
    return res.status(400).json({ success: false, message: "Name, a valid email or phone number, and password are required." });
  }
  if (name.length > 61 || !PASSWORD_RE.test(password)) {
    return res.status(400).json({ success: false, message: "Enter a valid name and use an 8–64 character password with a letter and a number." });
  }
  if (!firstName || !lastName || !["male", "female", "other"].includes(body.gender)) {
    return res.status(400).json({ success: false, message: "First name, last name and a valid gender are required." });
  }

  const dob = typeof body.dob === "string" ? new Date(`${body.dob}T00:00:00.000Z`) : new Date(NaN);
  if (!Number.isFinite(dob.getTime()) || !isAdult(dob)) {
    return res.status(400).json({ success: false, message: "A valid date of birth for someone 18 or older is required." });
  }

  let user;
  try {
    user = await User.findOne({ [contact.channel]: contact.value });
    if (user?.isVerified) {
      return res.status(409).json({ success: false, message: "An account with this contact already exists. Please log in." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    if (!user) user = new User({ [contact.channel]: contact.value });
    Object.assign(user, { name, firstName, lastName, password: passwordHash, gender: body.gender, dob });
    await issueOtp(user);

    return res.status(201).json({
      success: true,
      message: "Verification code sent. Enter the 6-digit code to finish registration.",
      contact: contact.value,
      channel: contact.channel,
      otpExpiresAt: user.otpExpiresAt,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "An account with this contact already exists. Please log in." });
    }
    if (error.message.startsWith("Could not send the verification code")) {
      // Keep the pending registration so the user can retry/resend the code.
      return res.status(502).json({ success: false, message: error.message });
    }
    throw error;
  }
}

export async function verifyOtp(req, res) {
  const contact = readContact(req.body);
  const code = typeof req.body?.code === "string" ? req.body.code.trim() : "";
  if (!contact || !/^\d{6}$/.test(code)) {
    return res.status(400).json({ success: false, message: "Enter a valid email or phone number and the 6-digit verification code." });
  }

  const user = await User.findOne({ [contact.channel]: contact.value, isVerified: false }).select("+otpHash");
  if (!user || !user.otpHash || !user.otpExpiresAt || user.otpExpiresAt <= new Date() || !otpMatches(code, user.otpHash)) {
    return res.status(400).json({ success: false, message: "That code is incorrect or expired. Request a new one and try again." });
  }

  user.isVerified = true;
  user.otpHash = null;
  user.otpExpiresAt = null;
  await user.save();
  return res.json({ success: true, message: "Your contact is verified. You can now log in." });
}

export async function resendOtp(req, res) {
  const contact = readContact(req.body);
  if (!contact) {
    return res.status(400).json({ success: false, message: "Enter a valid email or phone number." });
  }

  const user = await User.findOne({ [contact.channel]: contact.value, isVerified: false });
  if (!user) {
    return res.status(404).json({ success: false, message: "No pending registration was found. Please register again." });
  }

  try {
    await issueOtp(user);
    return res.json({ success: true, message: "A new verification code has been sent." });
  } catch (error) {
    return res.status(502).json({ success: false, message: error.message });
  }
}
