import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const LINKS = {
  Services: [
    { name: "Video Editing", href: "#services" },
    { name: "YouTube Editing", href: "#services" },
    { name: "Reels & Shorts", href: "#services" },
    { name: "Color Grading", href: "#services" },
    { name: "Motion Graphics", href: "#services" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
  ],
  Support: [
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
  ],
};

const SOCIALS = [
  {
    name: "Twitter",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

function Footer() {
  return (
    <footer className="relative pt-20 pb-3 md:pb-8 overflow-hidden bg-surface">
      {/* Divider mapped to theme */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 ">
            <ScrollReveal>
              <a href="#" className="flex items-center gap-2.5 mb-5 group">
                {/* Logo Background mapped to Primary */}
                <div className="w-9 h-9 rounded-lg flex items-center justify-center  transition-transform group-hover:scale-105">
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
                      fill="#f1f5f9"
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
                {/* Brand Name Corrected to Indicreed Studio */}
                <span className="text-lg font-display font-bold text-primary">
                  INDICREED<span className="text-on-surface">STUDIO</span>
                </span>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              {/* Text mapped to on-surface-variant */}
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 max-w-sm">
                A boutique video production agency crafting cinematic content
                for creators, brands, and businesses worldwide.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-2.5">
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.name}
                    href="#"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={s.path} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links], colIdx) => (
            <ScrollReveal key={category} delay={0.1 + colIdx * 0.08}>
              <div>
                <h4 className="text-on-surface font-display font-semibold mb-4 text-xs uppercase tracking-[0.15em]">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-on-surface-variant text-sm hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Newsletter */}
        <ScrollReveal delay={0.15}>
          {/* Card mapped to surface-container */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container border border-outline-variant mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div>
                <h4 className="text-on-surface font-display font-semibold text-base mb-1">
                  Stay in the loop
                </h4>
                <p className="text-on-surface-variant text-sm">
                  Editing tips, industry insights, and exclusive offers.
                </p>
              </div>
              <div className="flex w-full flex-column md:flex-row md:w-auto gap-2.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 md:w-56 px-4 py-3 bg-surface border border-outline-variant rounded-xl text-on-surface placeholder-outline focus:outline-none focus:border-primary transition-all duration-300 text-sm"
                />
                {/* Button mapped to Primary */}
                <motion.button
                  className="px-5 py-3 bg-primary text-on-primary font-semibold rounded-xl text-sm whitespace-nowrap cursor-pointer shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-outline-variant/50 gap-4">
          <p className="text-outline text-xs">
            © 2026 Indicreed Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Terms", "Privacy", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-outline text-xs hover:text-on-surface-variant transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
