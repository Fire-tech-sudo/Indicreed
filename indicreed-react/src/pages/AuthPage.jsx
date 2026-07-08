// src/pages/AuthPage.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import OTPVerification from "../components/OTPVerification";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendOtp, login, isAuthLoading, addNotification } = useApp();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // ============ OTP STATES ============
  const [showOTP, setShowOTP] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  // ============ FORM VALIDATION ============
  const validateForm = () => {
    if (!formData.email.trim()) {
      setFormError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError("Invalid email format");
      return false;
    }
    if (!formData.password) {
      setFormError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return false;
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        setFormError("Name is required");
        return false;
      }
      if (!formData.confirmPassword) {
        setFormError("Please confirm your password");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setFormError("Passwords don't match");
        return false;
      }
    }

    return true;
  };

  // ============ FORM SUBMIT ============
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validateForm()) return;

    if (isLogin) {
      // ===== LOGIN: Direct login, NO OTP =====
      const result = await login(formData.email, formData.password);
      if (result.success) {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
      } else {
        setFormError(result.error || "Login failed");
      }
    } else {
      // ===== SIGNUP: Send OTP first =====
      setIsLoading(true);

      try {
        // Backend: POST /api/v1/auth/send-otp → { name, email, password }
        const otpResult = await sendOtp(
          formData.name,
          formData.email,
          formData.password,
        );

        if (otpResult.success) {
          // Save registration data and show OTP overlay
          setRegistrationData({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
          setShowOTP(true);
        } else {
          setFormError(otpResult.error || "Failed to send OTP");
        }
      } catch (error) {
        setFormError("Failed to send OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ============ OTP CLOSE HANDLER ============
  const handleOTPClose = (result) => {
    setShowOTP(false);

    if (result?.verified) {
      // Registration successful
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } else {
      // User cancelled - keep form data
      setRegistrationData(null);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFocusedField(null);
    setFormError("");
    setShowOTP(false);
    setRegistrationData(null);
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
      { level: 0, text: "", color: "" },
      { level: 1, text: "Weak", color: "bg-red-500" },
      { level: 2, text: "Fair", color: "bg-orange-500" },
      { level: 3, text: "Good", color: "bg-yellow-500" },
      { level: 4, text: "Strong", color: "bg-emerald-500" },
    ];
    return levels[score];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const inputWrapperClass = (field) =>
    `relative border transition-all duration-300 ${
      focusedField === field
        ? "border-white"
        : "border-gray-700 hover:border-gray-500"
    }`;

  const isSubmitting = isAuthLoading || isLoading;

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-4 py-6 sm:py-10 md:py-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[1000px] max-h-[127vh] grid grid-cols-1 mt-15 md:mt-0 lg:grid-cols-2 rounded-xl
                   border border-gray-200/50 bg-white overflow-hidden"
      >
        {/* ============ LEFT PANEL - BRANDING ============ */}
        <div className="relative hidden lg:flex flex-col justify-between p-10 bg-blue-600 border-r border-gray-200 overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 items-center justify-center">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="196.000000pt"
                height="216.000000pt"
                viewBox="0 0 196.000000 216.000000"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
              >
                <g
                  transform="translate(0.000000,216.000000) scale(0.100000,-0.100000)"
                  fill="#ffffff"
                  stroke="none"
                >
                  <path d="M817 2028 c-7 -94 -35 -168 -97 -256-28 -39 -50 -74 -50 -77 0 -2 20 -34 45 -70 24 -36 54 -96 67 -133 22 -66 23 -75 26 -624 1 -307 0 -558 -3 -558 -17 0 -107 70 -162 126 -114 116 -183 309 -169 474 12 144 75 317 165 448 l41 61 -51 60 c-28 34 -54 61 -58 61 -10 0 -108 -159 -151 -248 -66 -135 -92 -237 -97 -387 -4 -108 -2 -145 15 -216 63 -264 202 -421 525 -594 l87 -47 0 891 0 891 -24 62 c-21 58 -73 165 -94 196 -6 9 -11 -12 -15 -60z" />
                  <path d="M1108 2004 c-26 -54 -54 -117 -63 -138 -18 -46 -24 -34 96 -196 269 -367 369 -586 369 -808 -1 -158 -66 -326 -168 -429 -53 -54 -145 -123 -164 -123 -4 0 -8 96 -8 213 0 233 -16 411 -56 602 -24 117 -72 291 -79 284 -1 -2 0 -309 3 -681 l5 -677 86 46 c188 101 285 173 360 267 136 171 198 385 172 600 -26 221 -118 416 -354 746 -107 150 -134 209 -145 319 l-7 74 -47 -99z" />
                </g>
              </svg>
            </div>
            <span className="font-extrabold text-lg text-black tracking-tight">
              INDICREED<span className="text-white">STUDIO</span>
            </span>
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-extrabold text-4xl text-black leading-tight mb-4">
                  {isLogin ? (
                    <>
                      Welcome
                      <br />
                      <span className="text-white">Back</span>
                    </>
                  ) : (
                    <>
                      Start Your
                      <br />
                      <span className="text-white">Journey</span>
                    </>
                  )}
                </h2>
                <p className="text-white leading-relaxed max-w-sm text-sm">
                  {isLogin
                    ? "Sign in to access your projects, manage your edits, and continue creating amazing content."
                    : "Join thousands of creators who trust us with their video editing needs."}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                { value: "500+", label: "Projects" },
                { value: "98%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="text-center py-3 border border-white">
                  <div className="text-black font-extrabold text-lg">
                    {stat.value}
                  </div>
                  <div className="text-white font-semibold text-[10px] uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 bg-white border border-gray-200 p-4 mb-20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 flex items-center justify-center border border-gray-300 text-black font-bold text-sm flex-shrink-0">
                R
              </div>
              <div>
                <div className="text-black font-semibold text-sm">
                  Rahul Sharma
                </div>
                <div className="text-gray-400 text-xs">YouTuber • 2M Subs</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-black/70 text-xs">
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed italic">
              "Best editing team I've ever worked with. They transformed my
              content completely!"
            </p>
          </div>
        </div>

        {/* ============ RIGHT PANEL - FORM ============ */}
        <div className="relative bg-black p-6 sm:p-10 lg:p-12 overflow-y-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-7 h-7 flex items-center justify-center">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="196.000000pt"
                height="216.000000pt"
                viewBox="0 0 196.000000 216.000000"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
              >
                <g
                  transform="translate(0.000000,216.000000) scale(0.100000,-0.100000)"
                  fill="#ffffff"
                  stroke="none"
                >
                  <path d="M817 2028 c-7 -94 -35 -168 -97 -256-28 -39 -50 -74 -50 -77 0 -2 20 -34 45 -70 24 -36 54 -96 67 -133 22 -66 23 -75 26 -624 1 -307 0 -558 -3 -558 -17 0 -107 70 -162 126 -114 116 -183 309 -169 474 12 144 75 317 165 448 l41 61 -51 60 c-28 34 -54 61 -58 61 -10 0 -108 -159 -151 -248 -66 -135 -92 -237 -97 -387 -4 -108 -2 -145 15 -216 63 -264 202 -421 525 -594 l87 -47 0 891 0 891 -24 62 c-21 58 -73 165 -94 196 -6 9 -11 -12 -15 -60z" />
                  <path d="M1108 2004 c-26 -54 -54 -117 -63 -138 -18 -46 -24 -34 96 -196 269 -367 369 -586 369 -808 -1 -158 -66 -326 -168 -429 -53 -54 -145 -123 -164 -123 -4 0 -8 96 -8 213 0 233 -16 411 -56 602 -24 117 -72 291 -79 284 -1 -2 0 -309 3 -681 l5 -677 86 46 c188 101 285 173 360 267 136 171 198 385 172 600 -26 221 -118 416 -354 746 -107 150 -134 209 -145 319 l-7 74 -47 -99z" />
                </g>
              </svg>
            </div>
            <span className="font-extrabold text-sm text-white">
              INDICREED<span className="text-gray-400">STUDIO</span>
            </span>
          </div>

          {/* Toggle Tabs */}
          <div className="flex mb-8 border border-gray-700">
            {["Login", "Sign Up"].map((tab) => {
              const isActive =
                (tab === "Login" && isLogin) || (tab === "Sign Up" && !isLogin);
              return (
                <button
                  key={tab}
                  onClick={() => toggleMode()}
                  className={`relative flex-1 py-3 font-semibold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Form Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-header" : "signup-header"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mb-6"
            >
              <h1 className="font-extrabold text-2xl sm:text-3xl text-white mb-1">
                {isLogin ? "Sign In" : "Create Account"}
              </h1>
              <p className="text-gray-400 text-sm">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Fill in the details to get started with us"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Error message */}
          <AnimatePresence>
            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-4 px-4 py-3 border border-red-500/40 bg-red-500/10 text-red-400 text-sm"
              >
                {formError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-form" : "signup-form"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Name (Signup only) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <div className={inputWrapperClass("name")}>
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className="w-full bg-transparent text-white pl-12 pr-4 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className={inputWrapperClass("email")}>
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-white pl-12 pr-4 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider">
                      Password
                    </label>
                    {isLogin && (
                      <button
                        type="button"
                        className="text-white text-xs font-semibold hover:opacity-80 cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className={inputWrapperClass("password")}>
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-white pl-12 pr-12 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-sm" />
                      ) : (
                        <FaEye className="text-sm" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength */}
                  {!isLogin && formData.password && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2.5"
                    >
                      <div className="flex gap-1.5 mb-1.5">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 transition-all duration-500 ${
                              passwordStrength.level >= level
                                ? passwordStrength.color
                                : "bg-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-medium text-gray-400">
                        {passwordStrength.text}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Confirm Password (Signup only) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      Confirm Password
                    </label>
                    <div className={inputWrapperClass("confirmPassword")}>
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="••••••••"
                        className="w-full bg-transparent text-white pl-12 pr-12 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none"
                        required={!isLogin}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash className="text-sm" />
                        ) : (
                          <FaEye className="text-sm" />
                        )}
                      </button>
                    </div>

                    {formData.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-xs mt-2 font-medium flex items-center gap-1.5 ${
                          formData.password === formData.confirmPassword
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {formData.password === formData.confirmPassword ? (
                          <>
                            <FaCheck className="text-[10px]" /> Passwords match
                          </>
                        ) : (
                          "Passwords don't match"
                        )}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* Remember Me (Login only) */}
                {isLogin && (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 border-gray-600 accent-white cursor-pointer"
                    />
                    <label
                      htmlFor="remember"
                      className="text-gray-400 text-sm cursor-pointer"
                    >
                      Remember me for 30 days
                    </label>
                  </div>
                )}

                {/* Terms (Signup only) */}
                {!isLogin && (
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 mt-0.5 border-gray-600 accent-white cursor-pointer"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-gray-400 text-sm cursor-pointer"
                    >
                      I agree to the{" "}
                      <span className="text-white hover:underline cursor-pointer">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-white hover:underline cursor-pointer">
                        Privacy Policy
                      </span>
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* ============ SUBMIT BUTTON ============ */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest
                         disabled:opacity-70 disabled:cursor-not-allowed 
                         transition-all duration-300 cursor-pointer"
              whileHover={!isSubmitting ? { scale: 1.01 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    {isLogin ? "SIGNING IN..." : "SENDING OTP..."}
                  </>
                ) : (
                  <>
                    {isLogin ? (
                      <>
                        SIGN IN
                        <FaArrowRight className="text-xs" />
                      </>
                    ) : (
                      <>
                        <FaEnvelope className="text-xs" />
                        SEND OTP & CREATE ACCOUNT
                      </>
                    )}
                  </>
                )}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-gray-700/50" />
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-gray-700/50" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 py-3 border border-gray-700 
                           text-white text-sm font-medium hover:border-gray-500 
                           transition-all duration-300 cursor-pointer"
              >
                <FaGoogle className="text-base" /> Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 py-3 border border-gray-700 
                           text-white text-sm font-medium hover:border-gray-500 
                           transition-all duration-300 cursor-pointer"
              >
                <FaApple className="text-lg" /> Apple
              </button>
            </div>

            {/* Toggle Text */}
            <p className="text-center text-gray-400 text-sm mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-white font-semibold hover:opacity-80 transition-opacity cursor-pointer"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </form>
        </div>
      </motion.div>

      {/* ============ OTP OVERLAY ============ */}
      <OTPVerification
        isOpen={showOTP}
        onClose={handleOTPClose}
        email={registrationData?.email || ""}
        registrationData={registrationData}
        otpLength={6}
        resendTimeout={30}
      />
    </div>
  );
};

export default AuthPage;
