import express from "express";
import { otpLimiter } from "../middleware/auth.js";
import { sendRegistrationOtp } from "../controllers/otpController.js";

const otpRouter = express.Router();

otpRouter.post("/send-otp", otpLimiter, sendRegistrationOtp);

export default otpRouter;
