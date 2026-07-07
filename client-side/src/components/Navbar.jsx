// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const MotionLink = motion.create(Link);

// Default Logo Component
const DefaultLogo = ({ color }) => (
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
      fill={color}
      stroke="none"
    >
      <path
        d="M817 2028 c-7 -94 -35 -168 -97 -256-28 -39 -50 -74 -50 -77 0 -2
20 -34 45 -70 24 -36 54 -96 67 -133 22 -66 23 -75 26 -624 1 -307 0 -558 -3
-558 -17 0 -107 70 -162 126 -114 116 -183 309 -169 474 12 144 75 317 165
448 l41 61 -51 60 c-28 34 -54 61 -58 61 -10 0 -108 -159 -151 -248 -66 -135
-92 -237 -97 -387 -4 -108 -2 -145 15 -216 63 -264 202 -421 525 -594 l87 -47
0 891 0 891 -24 62 c-21 58 -73 165 -94 196 -6 9 -11 -12 -15 -60z"
      />
      <path
        d="M1108 2004 c-26 -54 -54 -117 -63 -138 -18 -46 -24 -34 96 -196 269
-367 369 -586 369 -808 -1 -158 -66 -326 -168 -429 -53 -54 -145 -123 -164
-123 -4 0 -8 96 -8 213 0 233 -16 411 -56 602 -24 117 -72 291 -79 284 -1 -2
0 -309 3 -681 l5 -677 86 46 c188 101 285 173 360 267 136 171 198 385 172
600 -26 221 -118 416 -354 746 -107 150 -134 209 -145 319 l-7 74 -47 -99z"
      />
    </g>
  </svg>
);

function Navbar({
  logo = null,
  logoText = "INDICREED",
  logoAccentText = "STUDIO",
  ctaLabel = "Start a Project",
  ctaHref = "#contact",

  logoColor = "#000000",
  logoTextColor = "#ffffff",
  logoAccentColor = "#000000",
  ctaBgColor = "#000000",
  ctaTextColor = "#ffffff",
  navLinkColor = "#d1d5db",
  navLinkHoverColor = "#ffffff",
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ============ AUTH CONTEXT ============
  const { user, isAuthenticated, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  // ============ CTA BUTTON HANDLER ============
  const handleCtaClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (!isAuthenticated) {
      // Not logged in → Go to auth page
      // Save intended destination so after login, user goes to contact
      navigate("/auth", { state: { from: "/#contact" } });
    } else {
      // Logged in → Go to contact section
      // Check if we're on home page
      if (window.location.pathname === "/") {
        // Same page → smooth scroll
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Different page → navigate to home + contact
        navigate("/#contact");
        // After navigation, scroll to contact
        setTimeout(() => {
          const contactSection = document.querySelector("#contact");
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }
    }
  };

  // ============ LOGOUT HANDLER ============
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  // ============ RENDER LOGO ============
  const renderLogo = () => {
    if (typeof logo === "function") {
      return logo(logoColor);
    }
    if (React.isValidElement(logo)) {
      return React.cloneElement(logo, {
        style: { ...logo.props.style, color: logoColor, fill: logoColor },
      });
    }
    return <DefaultLogo color={logoColor} />;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`theme-hero-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-dark-500/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ========== LOGO ========== */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                {renderLogo()}
              </div>
              <span
                className="text-xl md:text-2xl font-display font-bold tracking-tight"
                style={{ color: logoTextColor }}
              >
                {logoText}
                <span style={{ color: logoAccentColor }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 800 400"
                    width="100%"
                    height="100%"
                  >
                    {/*<!-- Logo Group centered in the viewBox -->*/}
                    <g transform="translate(0, 190)">
                      {/*<!-- The stylized, oversized "I" -->*/}
                      <rect
                        x="0"
                        y="-74"
                        width="18"
                        height="75"
                        fill={logoTextColor}
                      />

                      {/*<!-- The rest of "NDICREED" -->*/}
                      <text
                        x="28"
                        y="0"
                        fill={logoTextColor}
                        font-family="Impact, 'Arial Black', sans-serif"
                        font-weight="900"
                        font-size="72"
                        letter-spacing="1.5"
                      >
                        NDICREED
                      </text>

                      {/*<!-- The "STUDIO" text -->*/}
                      <text
                        x="440"
                        y="-5"
                        fill={logoAccentColor}
                        font-family="Montserrat, 'Segoe UI', Helvetica, Arial, sans-serif"
                        font-weight="400"
                        font-size="48"
                        letter-spacing="7"
                      >
                        STUDIO
                      </text>
                    </g>
                  </svg>
                </span>
              </span>
            </motion.div>
          </Link>

          {/* ========== DESKTOP NAV LINKS ========== */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <MotionLink
                key={link.name}
                to={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/5 transition-all duration-300"
                style={{ color: navLinkColor }}
                onMouseEnter={(e) => (e.target.style.color = navLinkHoverColor)}
                onMouseLeave={(e) => (e.target.style.color = navLinkColor)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                {link.name}
              </MotionLink>
            ))}
          </div>

          {/* ========== DESKTOP RIGHT SECTION ========== */}
          <div className="hidden md:flex items-center gap-3">
            <AnimatePresence mode="wait">
              {isAuthenticated ? (
                <motion.div
                  key="logged-in"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  {/* ===== User Profile ===== */}
                  <motion.div
                    className="flex items-center gap-2.5 px-4 py-1 rounded-xl 
                               bg-white/[0.05] border border-black cursor-pointer
                               hover:bg-white/[0.08] transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Avatar */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center 
                                  text-sm font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${ctaBgColor}, ${ctaBgColor}aa)`,
                      }}
                    >
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    {/* Name */}
                    <span
                      className="text-sm font-medium  max-w-[100px] truncate"
                      style={{ color: ctaTextColor }}
                    >
                      {user?.name || "User"}
                    </span>
                  </motion.div>

                  {/* ===== CTA Button (Contact) ===== */}
                  <motion.button
                    onClick={handleCtaClick}
                    className="px-6 py-2.5 text-sm font-semibold rounded-xl 
                               transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: ctaBgColor,
                      color: ctaTextColor,
                      boxShadow: `0 4px 14px ${ctaBgColor}40`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -1,
                      boxShadow: `0 8px 25px ${ctaBgColor}50`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {ctaLabel}
                  </motion.button>

                  {/* ===== Logout Button ===== */}
                  <motion.button
                    onClick={handleLogout}
                    className="px-4 py-2.5 text-sm font-semibold rounded-xl 
                               text-red-400 hover:text-red-300 
                               hover:bg-red-500/10 border border-transparent
                               hover:border-red-500/20
                               transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="logged-out"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  {/* ===== Login Button ===== */}
                  <Link to="/auth">
                    <motion.button
                      className="px-5 py-2.5 text-sm font-semibold rounded-xl 
                                 transition-all duration-300 cursor-pointer
                                 border border-white/[0.08] hover:border-white/[0.15]
                                 hover:bg-white/[0.05]"
                      style={{
                        backgroundColor: ctaBgColor,
                        color: ctaTextColor,
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = navLinkHoverColor)
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = ctaTextColor)
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.button>
                  </Link>

                  {/* ===== CTA Button (Opens Auth) ===== */}
                  <motion.button
                    onClick={handleCtaClick}
                    className="px-6 py-2.5 text-sm font-semibold rounded-xl 
                               transition-all duration-300 cursor-pointer relative
                               overflow-hidden group"
                    style={{
                      backgroundColor: ctaBgColor,
                      color: ctaTextColor,
                      boxShadow: `0 4px 14px ${ctaBgColor}40`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -1,
                      boxShadow: `0 8px 25px ${ctaBgColor}50`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Shimmer */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent 
                                    via-white/10 to-transparent -translate-x-full 
                                    group-hover:translate-x-full transition-transform 
                                    duration-1000"
                    />

                    <span className="relative z-10 flex items-center gap-2">
                      {ctaLabel}
                      {/* Lock icon when not logged in */}
                      <svg
                        className="w-3.5 h-3.5 opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ========== MOBILE MENU BUTTON ========== */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* ========== MOBILE MENU ========== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-400/95 backdrop-blur-2xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-2">
              {/* ===== User Info (if logged in) ===== */}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 px-4 py-4 mb-3 
                             bg-white/[0.03] rounded-xl border border-black"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center 
                                text-sm font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${ctaBgColor}, ${ctaBgColor}aa)`,
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {user?.name || "User"}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {user?.email || ""}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===== Nav Links ===== */}
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 hover:bg-white/5 rounded-xl 
                             transition-all duration-300 font-medium"
                  style={{ color: navLinkColor }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* ===== Auth/CTA Buttons ===== */}
              <div className="pt-3 space-y-5 border-t border-white/[0.06] mt-3">
                {isAuthenticated ? (
                  <>
                    {/* CTA → Contact */}
                    <motion.button
                      onClick={handleCtaClick}
                      className="block w-full px-4 py-3.5 text-center font-semibold 
                                 rounded-xl cursor-pointer"
                      style={{
                        backgroundColor: ctaBgColor,
                        color: ctaTextColor,
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {ctaLabel}
                    </motion.button>

                    {/* Logout */}
                    <motion.button
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 text-center font-semibold 
                                 rounded-xl text-red-400 bg-red-500/5 
                                 border border-red-500/10 hover:bg-red-500/10
                                 transition-all cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    {/* Login */}
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.div
                        className="block w-full px-4 py-3 mb-2 md:mb-0 text-center font-semibold 
                                   rounded-xl border border-black 
                                   hover:bg-white transition-all"
                        style={{
                          backgroundColor: ctaBgColor,
                          color: ctaTextColor,
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Login / Sign Up
                      </motion.div>
                    </Link>

                    {/* CTA → Auth */}
                    <motion.button
                      onClick={handleCtaClick}
                      className="block w-full px-4 py-3.5 text-center font-semibold 
                                 rounded-xl cursor-pointer relative overflow-hidden"
                      style={{
                        backgroundColor: ctaBgColor,
                        color: ctaTextColor,
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {ctaLabel}
                        <svg
                          className="w-3.5 h-3.5 opacity-60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
