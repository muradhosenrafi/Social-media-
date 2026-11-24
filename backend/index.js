import "dotenv/config";
import cors from "cors";
import express from "express";
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
} catch (error) {
  console.error("Backend startup failed:", error.message);
  process.exitCode = 1;
}
