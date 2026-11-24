import { Router } from "express";
import { register, resendOtp, verifyOtp } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

export default router;
