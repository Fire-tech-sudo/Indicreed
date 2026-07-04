import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

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
          {/* Logo - Theme applied here */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="196.000000pt"
                height="216.000000pt"
                viewBox="0 0 196.000000 216.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,216.000000) scale(0.100000,-0.100000)"
                  fill="var(--color-primary)"
                  stroke="none"
                >
                  <path
                    d="M817 2028 c-7 -94 -35 -168 -97 -256 -28 -39 -50 -74 -50 -77 0 -2
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
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              INDICREED<span className="text-primary">STUDIO</span>
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Button - Theme applied here */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#contact"
              className="px-6 py-2.5 bg-primary text-on-primary text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Start a Project
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
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

      {/* Mobile Menu */}
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
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              {/* Mobile CTA Button - Theme applied here */}
              <motion.a
                href="#contact"
                className="block px-4 py-3 mt-4 bg-primary text-on-primary text-center font-semibold rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
