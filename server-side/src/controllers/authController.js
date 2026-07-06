// src/controllers/authController.js

import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { validateEmail, validatePassword } from "../utils/validators.js";
import { verifyOtpHelper } from "../controllers/otpController.js";

export const registerUser = async (req, res) => {
    try {
        const { email, name, password, otp } = req.body;

        if (!name || !email || !password || !otp) {
            return res.status(400).json({
                success: false,
                message: "Missing Details",
            });
        }

        const emailCheck = validateEmail(email);
        if (!emailCheck.valid) {
            return res.status(400).json({
                success: false,
                message: emailCheck.message,
            });
        }

        const passwordCheck = validatePassword(password);
        if (!passwordCheck.valid) {
            return res.status(400).json({
                success: false,
                message: passwordCheck.message,
            });
        }

        const existingUser = await userModel.findOne({
            email: email.trim().toLowerCase(),
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Account already exists. Please login.",
            });
        }

        // OTP verify karo
        const otpCheck = await verifyOtpHelper(email.trim().toLowerCase(), otp);
        if (!otpCheck.success) {
            return res.status(400).json({
                success: false,
                message: otpCheck.message,
            });
        }

        // ✅ FIX: Plain password do - userModel.pre("save") khud hash karega
        // bcrypt.hash() YAHAN MAT KARO - double hashing hogi
        const newUser = new userModel({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password, // ← Plain password, model hash karega
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Registration failed",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // ✅ +password explicitly select karo
        const user = await userModel
            .findOne({ email: email.trim().toLowerCase() })
            .select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Get Profile Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching profile.",
        });
    }
};
