import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { rateLimit } from "express-rate-limit";
import { connectDatabase } from "./db/mongoose.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = Number(process.env.PORT || 5001);
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

app.disable("x-powered-by");
app.use(cors({ origin: allowedOrigins, methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json({ limit: "12kb" }));
app.get("/", (_req, res) => res.json({ name: "DateNexa API", status: "ok" }));
app.get("/health", (_req, res) => {
  const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
  const dbHost = mongoose.connection.host || "";
  res.json({
    status: "ok",
    database: {
      status: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      name: mongoose.connection.name || null,
      target: dbHost.includes("mongodb.net") ? "atlas" : "local",
    },
    emailOtp: smtpConfigured ? "configured" : "needs_smtp_settings",
  });
});
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: "draft-8", legacyHeaders: false }));
app.use("/api/auth", authRoutes);
app.use((_req, res) => res.status(404).json({ success: false, message: "Route not found." }));
app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ success: false, message: "Request body must be valid JSON." });
  }
  console.error("API error:", error.message);
  return res.status(500).json({ success: false, message: "Server error. Please try again." });
});

try {
  await connectDatabase();
  app.listen(port, () => console.log(`DateNexa API listening on port ${port}.`));
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn("Email OTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD in backend/.env, then restart the backend.");
  }
} catch (error) {
  console.error("Backend startup failed:", error.message);
  console.error("Check that backend/.env exists, MONGODB_URI is set, and MongoDB is running (npm run db:up from the project root starts the local database). The API will not listen on port 5001 until the database is ready.");
  process.exitCode = 1;
}
