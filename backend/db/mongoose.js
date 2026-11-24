import mongoose from "mongoose";
import User from "../models/User.js";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required.");

  await mongoose.connect(uri);
  await User.init();
  console.log("Connected to MongoDB.");
}
