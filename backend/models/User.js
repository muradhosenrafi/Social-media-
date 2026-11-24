import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 61 },
    firstName: { type: String, required: true, trim: true, maxlength: 30 },
    lastName: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    phone: { type: String, trim: true, unique: true, sparse: true },
    password: { type: String, required: true, select: false },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dob: { type: Date, required: true },
    isVerified: { type: Boolean, default: false, index: true },
    otpHash: { type: String, select: false },
    otpExpiresAt: { type: Date },
  },
  { timestamps: true },
);

// MongoDB automatically removes expired, still-unverified registrations.
userSchema.index(
  { otpExpiresAt: 1 },
  { expireAfterSeconds: 0, partialFilterExpression: { isVerified: false } },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
