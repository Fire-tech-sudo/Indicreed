import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import sendOtpEmail from "../utils/sendEmail.js";
import { validateEmail } from "../utils/validators.js";

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

export const sendRegistrationOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide Name, Email, and Password first.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailCheck = validateEmail(normalizedEmail);
    if (!emailCheck.valid) {
      return res.status(400).json({
        success: false,
        message: emailCheck.message,
      });
    }

    const existingUser = await userModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Account with this email already exists. Please login.",
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    // ✅ FIX: 'new' → 'returnDocument: after'
    await otpModel.findOneAndUpdate(
      { email: normalizedEmail },
      { otp: hashedOtp, expiresAt, attempts: 0 },
      {
        upsert: true,
        returnDocument: "after", // ✅ Deprecated 'new: true' fix
      },
    );

    sendOtpEmail(normalizedEmail, otp).catch((err) =>
      console.error("Background Email Error:", err),
    );

    return res.json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error("sendRegistrationOtp Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP.",
    });
  }
};

export const verifyOtpHelper = async (email, otp) => {
  // ✅ FIX: 'new' → 'returnDocument: after'
  const record = await otpModel.findOneAndUpdate(
    { email },
    { $inc: { attempts: 1 } },
    {
      returnDocument: "after", // ✅ Deprecated fix
    },
  );

  if (!record) {
    return {
      success: false,
      message: "OTP not found or expired. Please request a new one.",
    };
  }

  if (record.expiresAt < new Date()) {
    await otpModel.deleteOne({ _id: record._id });
    return {
      success: false,
      message: "OTP has expired. Please request a new one.",
    };
  }

  if (record.attempts > 5) {
    await otpModel.deleteOne({ _id: record._id });
    return {
      success: false,
      message: "Too many failed attempts. Please request a new OTP.",
    };
  }

  const isValid = await bcrypt.compare(otp, record.otp);
  if (!isValid) {
    return {
      success: false,
      message: "Invalid OTP. Please try again.",
    };
  }

  await otpModel.deleteOne({ _id: record._id });
  return { success: true };
};
