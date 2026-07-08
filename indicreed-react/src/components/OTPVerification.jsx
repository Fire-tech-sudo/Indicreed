// src/components/OTPVerification.jsx

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaShieldAlt,
  FaEnvelope,
  FaCheck,
  FaRedo,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import { useApp } from "../context/AppContext";

const OTPVerification = ({
  isOpen,
  onClose,
  email = "",
  registrationData = null,
  otpLength = 6,
  resendTimeout = 30,
}) => {
  const { register, sendOtp } = useApp();

  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(resendTimeout);
  const [canResend, setCanResend] = useState(false);
  const [shakeKey, setShakeKey] = useState(0); // shake trigger

  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  // ============ RESET ON OPEN ============
  useEffect(() => {
    if (isOpen) {
      setOtp(new Array(otpLength).fill(""));
      setActiveIndex(0);
      setError("");
      setIsVerified(false);
      setIsVerifying(false);
      setIsResending(false);
      setResendTimer(resendTimeout);
      setCanResend(false);
      setShakeKey(0);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 300);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  // ============ COUNTDOWN TIMER ============
  useEffect(() => {
    if (!isOpen) return;

    if (resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, resendTimer]);

  // ============ AUTO SUBMIT - ONLY WHEN ALL FILLED ============
  useEffect(() => {
    // ✅ FIX: isVerifying check - agar already verifying hai to dobara mat karo
    if (isVerifying || isVerified) return;

    const otpValue = otp.join("");
    const allFilled = otpValue.length === otpLength && !otp.includes("");

    if (allFilled) {
      handleVerify(otpValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  // ============ INPUT CHANGE ============
  const handleChange = (value, index) => {
    // ✅ FIX: Agar verify ho raha hai ya ho gaya, input disable
    if (isVerifying || isVerified) return;
    if (!/^\d*$/.test(value)) return;

    setError("");
    const newOtp = [...otp];

    if (value.length > 1) {
      const digits = value.split("").slice(0, otpLength - index);
      digits.forEach((digit, i) => {
        if (index + i < otpLength) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);

      const nextIndex = Math.min(index + digits.length, otpLength - 1);
      setActiveIndex(nextIndex);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otpLength - 1) {
        setActiveIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // ============ KEY DOWN ============
  const handleKeyDown = (e, index) => {
    if (isVerifying || isVerified) return;

    switch (e.key) {
      case "Backspace":
        e.preventDefault();
        const newOtp = [...otp];
        if (otp[index]) {
          newOtp[index] = "";
          setOtp(newOtp);
        } else if (index > 0) {
          newOtp[index - 1] = "";
          setOtp(newOtp);
          setActiveIndex(index - 1);
          inputRefs.current[index - 1]?.focus();
        }
        break;

      case "ArrowLeft":
        e.preventDefault();
        if (index > 0) {
          setActiveIndex(index - 1);
          inputRefs.current[index - 1]?.focus();
        }
        break;

      case "ArrowRight":
        e.preventDefault();
        if (index < otpLength - 1) {
          setActiveIndex(index + 1);
          inputRefs.current[index + 1]?.focus();
        }
        break;

      case "Enter":
        e.preventDefault();
        const val = otp.join("");
        if (val.length === otpLength && !otp.includes("")) {
          handleVerify(val);
        }
        break;

      default:
        break;
    }
  };

  // ============ PASTE ============
  const handlePaste = (e) => {
    if (isVerifying || isVerified) return;
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, otpLength);

    if (digits.length > 0) {
      const newOtp = new Array(otpLength).fill("");
      digits.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);

      const focusIndex = Math.min(digits.length, otpLength - 1);
      setActiveIndex(focusIndex);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  // ============ VERIFY OTP ============
  const handleVerify = async (otpValue) => {
    if (isVerifying || isVerified) return;

    if (!registrationData) {
      setError("Registration data missing. Please go back and try again.");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      const result = await register(
        registrationData.name,
        registrationData.email,
        registrationData.password,
        otpValue,
      );

      if (result.success) {
        // ✅ SUCCESS: Show animation, phir close
        setIsVerified(true);
        setTimeout(() => {
          onClose({ verified: true, user: result.user });
        }, 1800);
      } else {
        // ✅ FIX: Error pe sirf shake karo, overlay band MAT karo
        setError(result.error || "Invalid OTP. Please try again.");
        triggerShakeAndClear();
        // isVerifying false karo taaki user retry kar sake
        setIsVerifying(false);
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      triggerShakeAndClear();
      setIsVerifying(false);
    }
    // ✅ FIX: finally mein setIsVerifying(false) NAHI - upar handle kiya
    // kyunki success case mein verified state hai aur close ho raha hai
  };

  // ============ SHAKE + CLEAR (Overlay BAND NAHI HOGI) ============
  const triggerShakeAndClear = () => {
    // Shake animation trigger
    setShakeKey((prev) => prev + 1);

    // Delay ke baad clear karo
    setTimeout(() => {
      setOtp(new Array(otpLength).fill(""));
      setActiveIndex(0);
      setError(""); // Error clear karo after shake
      // ✅ Overlay yahan band NAHI hoti - user retry kar sakta hai
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 50);
    }, 800);
  };

  // ============ RESEND OTP ============
  const handleResend = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setError("");

    try {
      const result = await sendOtp(
        registrationData?.name,
        registrationData?.email,
        registrationData?.password,
      );

      if (result.success) {
        setOtp(new Array(otpLength).fill(""));
        setActiveIndex(0);
        setResendTimer(resendTimeout);
        setCanResend(false);
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 50);
      } else {
        setError(result.error || "Failed to resend OTP.");
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  // ============ MASK EMAIL ============
  const getMaskedEmail = (emailStr) => {
    if (!emailStr) return "your email";
    const [name, domain] = emailStr.split("@");
    if (!domain) return emailStr;
    const masked =
      name.length > 3
        ? name.slice(0, 2) + "•".repeat(name.length - 3) + name.slice(-1)
        : name.charAt(0) + "•".repeat(Math.max(name.length - 1, 1));
    return `${masked}@${domain}`;
  };

  // ============ PARTICLES ============
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 8,
    delay: Math.random() * 3,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        >
          {/* ============ BACKDROP ============ */}
          {/* ✅ FIX: Backdrop click pe sirf tab close karo jab verified ho
              ya user khud close kare - isVerifying mein nahi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => {
              // ✅ Verifying ho raha hai ya verified hai - close mat karo
              if (isVerifying || isVerified) return;
              onClose({ verified: false });
            }}
          />

          {/* ============ OTP CARD ============ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-surface-bright/95 backdrop-blur-2xl 
                       rounded-3xl border border-white/[0.08] overflow-hidden
                       shadow-[0_0_100px_rgba(51,87,232,0.15)]"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-[60px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-[60px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full bg-primary/20"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                  }}
                  animate={{ y: [0, -20, 0], opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 sm:p-10">
              {/* ✅ Close Button - sirf tab show karo jab verifying/verified nahi */}
              {!isVerifying && !isVerified && (
                <motion.button
                  onClick={() => onClose({ verified: false })}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full 
                             bg-white/[0.05] hover:bg-white/[0.1] 
                             flex items-center justify-center text-gray-500 
                             hover:text-white transition-all cursor-pointer
                             border border-white/[0.06]"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-sm" />
                </motion.button>
              )}

              <AnimatePresence mode="wait">
                {/* SUCCESS STATE */}
                {isVerified ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 200,
                        delay: 0.1,
                      }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full 
                                 bg-gradient-to-br from-emerald-500 to-green-600 
                                 flex items-center justify-center
                                 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <FaCheck className="text-white text-4xl" />
                      </motion.div>
                    </motion.div>

                    {[0.3, 0.5].map((delay, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                   w-32 h-32 rounded-full border-2 border-emerald-500/20"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 1, delay }}
                      />
                    ))}

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl font-bold text-white mb-2"
                    >
                      Email Verified!
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-on-surface-variant text-sm"
                    >
                      Account created successfully. Redirecting...
                    </motion.p>
                  </motion.div>
                ) : (
                  /* OTP FORM STATE */
                  <motion.div
                    key="otp-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 15, delay: 0.1 }}
                        className="w-20 h-20 mx-auto mb-5 rounded-2xl 
                                   bg-gradient-to-br from-primary/20 to-primary/5 
                                   flex items-center justify-center
                                   border border-primary/20"
                      >
                        <motion.div
                          animate={{ y: [0, -3, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <FaShieldAlt className="text-primary text-3xl" />
                        </motion.div>
                      </motion.div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-2">
                        Verify Your Email
                      </h2>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        We sent a {otpLength}-digit verification code to
                      </p>
                      <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <FaEnvelope className="text-primary text-xs" />
                        <span className="text-primary text-sm font-semibold">
                          {getMaskedEmail(email)}
                        </span>
                      </div>
                    </div>

                    {/* ✅ OTP INPUTS - shakeKey se shake trigger */}
                    <motion.div
                      key={shakeKey} // ← Ye shake trigger karega
                      className="flex justify-center gap-2 sm:gap-3 mb-6"
                      animate={
                        shakeKey > 0
                          ? { x: [0, -12, 12, -10, 10, -6, 6, 0] }
                          : {}
                      }
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {otp.map((digit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * index + 0.2 }}
                          className="relative"
                        >
                          <input
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={otpLength}
                            value={digit}
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            onFocus={() => setActiveIndex(index)}
                            disabled={isVerifying || isVerified}
                            className={`w-12 h-14 sm:w-14 sm:h-16 text-center 
                                       text-xl sm:text-2xl font-bold rounded-xl 
                                       bg-white/[0.03] text-on-surface outline-none 
                                       transition-all duration-300
                                       disabled:opacity-50 disabled:cursor-not-allowed
                                       ${
                                         error
                                           ? "border-2 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                                           : activeIndex === index
                                             ? "border-2 border-primary shadow-[0_0_20px_rgba(51,87,232,0.2)] bg-primary/5"
                                             : digit
                                               ? "border-2 border-primary/30 bg-primary/5"
                                               : "border-2 border-white/[0.08] hover:border-white/[0.15]"
                                       }`}
                            style={{ caretColor: "transparent" }}
                          />

                          {/* Cursor Blink */}
                          {activeIndex === index &&
                            !digit &&
                            !isVerifying &&
                            !isVerified && (
                              <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 
                                           -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full"
                                animate={{ opacity: [1, 0] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                }}
                              />
                            )}

                          {/* Filled Dot */}
                          {digit && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -bottom-2 left-1/2 -translate-x-1/2 
                                         w-1.5 h-1.5 rounded-full bg-primary"
                            />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* ERROR MESSAGE */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          className="flex items-center justify-center gap-2 mb-4 
                                     px-4 py-2.5 bg-red-500/10 border border-red-500/20 
                                     rounded-xl"
                        >
                          <svg
                            className="w-4 h-4 text-red-400 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-red-400 text-sm font-medium">
                            {error}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* VERIFY BUTTON */}
                    <motion.button
                      onClick={() => {
                        const val = otp.join("");
                        if (val.length === otpLength && !otp.includes("")) {
                          handleVerify(val);
                        }
                      }}
                      disabled={otp.includes("") || isVerifying || isVerified}
                      className="w-full py-4 bg-primary text-on-primary font-semibold 
                                 rounded-xl text-sm relative overflow-hidden group 
                                 cursor-pointer transition-all duration-300
                                 disabled:opacity-40 disabled:cursor-not-allowed"
                      whileHover={
                        !otp.includes("") && !isVerifying ? { scale: 1.01 } : {}
                      }
                      whileTap={
                        !otp.includes("") && !isVerifying ? { scale: 0.98 } : {}
                      }
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent 
                                      via-white/10 to-transparent -translate-x-full 
                                      group-hover:translate-x-full transition-transform 
                                      duration-1000"
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isVerifying ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <FaLock className="text-xs" />
                            Verify & Create Account
                          </>
                        )}
                      </span>
                    </motion.button>

                    {/* RESEND */}
                    <div className="mt-6 text-center">
                      <p className="text-on-surface-variant text-sm">
                        Didn't receive the code?
                      </p>

                      {canResend ? (
                        <motion.button
                          onClick={handleResend}
                          disabled={isResending || isVerifying}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="inline-flex items-center gap-2 mt-2 px-5 py-2 
                                     text-primary font-semibold text-sm rounded-xl
                                     hover:bg-primary/10 transition-all cursor-pointer
                                     border border-primary/20
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={
                            !isResending && !isVerifying ? { scale: 1.05 } : {}
                          }
                          whileTap={
                            !isResending && !isVerifying ? { scale: 0.95 } : {}
                          }
                        >
                          {isResending ? (
                            <>
                              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <FaRedo className="text-xs" />
                              Resend Code
                            </>
                          )}
                        </motion.button>
                      ) : (
                        <div className="mt-2 flex items-center justify-center gap-2">
                          <span className="text-on-surface-variant/50 text-sm">
                            Resend in
                          </span>
                          <div className="relative w-10 h-10">
                            <svg
                              className="w-10 h-10 -rotate-90"
                              viewBox="0 0 40 40"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="16"
                                fill="none"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="3"
                              />
                              <circle
                                cx="20"
                                cy="20"
                                r="16"
                                fill="none"
                                stroke="var(--color-primary)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray={100.5}
                                strokeDashoffset={
                                  100.5 - (resendTimer / resendTimeout) * 100.5
                                }
                                className="transition-all duration-1000"
                              />
                            </svg>
                            <span
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 
                                           -translate-y-1/2 text-primary text-xs font-bold"
                            >
                              {resendTimer}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* BACK BUTTON */}
                    <motion.button
                      onClick={() => {
                        if (!isVerifying && !isVerified) {
                          onClose({ verified: false });
                        }
                      }}
                      disabled={isVerifying || isVerified}
                      className="w-full mt-4 py-3 text-on-surface-variant text-sm 
                                 font-medium rounded-xl hover:bg-white/[0.03] 
                                 transition-all cursor-pointer flex items-center 
                                 justify-center gap-2
                                 disabled:opacity-40 disabled:cursor-not-allowed"
                      whileHover={
                        !isVerifying && !isVerified ? { scale: 1.01 } : {}
                      }
                      whileTap={
                        !isVerifying && !isVerified ? { scale: 0.98 } : {}
                      }
                    >
                      <FaArrowLeft className="text-xs" />
                      Back to Sign Up
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Dots */}
              <div className="mt-6 flex justify-center gap-1.5">
                {otp.map((digit, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isVerified
                        ? "w-6 bg-emerald-500"
                        : digit
                          ? "w-6 bg-primary"
                          : "w-3 bg-white/[0.06]"
                    }`}
                    layout
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OTPVerification;
