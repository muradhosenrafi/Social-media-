import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error("SMTP_HOST, SMTP_USER and SMTP_PASSWORD must be configured.");
  }

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });
  }
  return transporter;
}

export async function sendVerificationCode({ email, name, code }) {
  if (!email) throw new Error("An email address is required to send the verification code.");
  if (!/^\d{6}$/.test(String(code))) throw new Error("A six-digit verification code is required.");

  const safeName = escapeHtml(name || "there");
  const expiryText = "5 minutes";
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>DateNexa email verification</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f2f7;font-family:Arial,Helvetica,sans-serif;color:#241b2b;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your DateNexa verification code expires in five minutes.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7f2f7;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 16px 48px rgba(76,24,66,.12);">
          <tr><td style="height:7px;background:#d32375;font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr><td style="padding:30px 34px 22px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
              <td width="46" height="46" align="center" valign="middle" style="width:46px;height:46px;border-radius:15px;background:#fce5f0;color:#b41460;font-size:22px;font-weight:700;">D</td>
              <td style="padding-left:12px;font-size:20px;font-weight:700;letter-spacing:.2px;color:#35102b;">DateNexa</td>
            </tr></table>
          </td></tr>
          <tr><td style="padding:12px 34px 36px;">
            <p style="margin:0 0 10px;color:#b41460;font-size:11px;line-height:18px;font-weight:700;letter-spacing:2px;">ONE LAST STEP</p>
            <h1 style="margin:0;color:#241b2b;font-size:30px;line-height:38px;">Verify your email</h1>
            <p style="margin:18px 0 0;color:#625866;font-size:15px;line-height:24px;">Hi ${safeName}, use this one-time code to finish creating your DateNexa account.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:26px;background:#fff5fa;border:1px solid #f4c9de;border-radius:18px;">
              <tr><td align="center" style="padding:22px 12px 20px;">
                <p style="margin:0 0 10px;color:#775b6d;font-size:10px;line-height:16px;font-weight:700;letter-spacing:2px;">YOUR VERIFICATION CODE</p>
                <div dir="ltr" style="color:#97104f;font-family:Consolas,'Courier New',monospace;font-size:38px;line-height:48px;font-weight:700;letter-spacing:9px;">${code}</div>
                <p style="margin:10px 0 0;color:#775b6d;font-size:12px;line-height:18px;">Enter this code within ${expiryText}.</p>
              </td></tr>
            </table>
            <p style="margin:22px 0 0;color:#746b77;font-size:13px;line-height:21px;">If you did not create a DateNexa account, you can ignore this email. Never share your verification code with anyone.</p>
          </td></tr>
          <tr><td style="padding:17px 34px;background:#fcf9fc;border-top:1px solid #f0e8ef;color:#8a808c;font-size:11px;line-height:18px;">DateNexa · Meet, connect, and make plans safely.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return getTransporter().sendMail({
    from,
    to: email,
    subject: "DateNexa | Your verification code",
    text: `Hi ${name || "there"},\n\nYour DateNexa verification code is ${code}. It expires in five minutes.\n\nIf you did not create this account, ignore this email. Never share your code with anyone.`,
    html,
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

export async function sendPhoneVerificationCode({ phone, name, code }) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
    throw new Error("Twilio settings must be configured to send a verification SMS.");
  }

  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(TWILIO_ACCOUNT_SID)}/Messages.json`;
  const credentials = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");
  const body = new URLSearchParams({
    From: TWILIO_FROM_NUMBER,
    To: phone,
    Body: `Hi ${name}, your DateNexa verification code is ${code}. It expires in 5 minutes.`,
  });
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message || "SMS provider could not deliver the verification code.");
  }
  return response.json();
}
