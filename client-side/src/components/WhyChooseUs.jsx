import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";

function WhyChooseUs() {
  const reasons = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
      title: "Fast Delivery",
      description:
        "Most projects delivered within 24–48 hours. Rush orders available for time-sensitive content.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828a4 4 0 01-1.414.943l-3.483 1.28a.5.5 0 01-.643-.643l1.28-3.483a4 4 0 01.943-1.414z"
        />
      ),
      title: "Human Creativity",
      description:
        "Real editors, real artistry. We don't rely on templates — every edit is handcrafted with creative intent.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      ),
      title: "Brand-Focused Storytelling",
      description:
        "We learn your brand's voice, aesthetic, and goals to create content that feels authentically yours.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      ),
      title: "Trend-Aware Editing",
      description:
        "We stay on top of platform trends, algorithm changes, and viral formats to maximize your reach.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      ),
      title: "Reliable Communication",
      description:
        "Dedicated project manager, clear timelines, and transparent updates throughout the editing process.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      ),
      title: "Unlimited Revisions",
      description:
        "We don't stop until you're thrilled. Every plan includes revision rounds to get it pixel-perfect.",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-surface">
      {/* Hairline dividers — kept, these already match hero's restraint */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <SectionHeader
              align="left"
              eyebrow="WHY INDICREED STUDIO"
              title={
                <>
                  More than editors.
                  <br />
                  <span className="text-primary">Creative partners.</span>
                </>
              }
            />
            <ScrollReveal delay={0.2}>
              <p className="text-on-surface-variant font-body-lg leading-relaxed mb-8 -mt-10">
                We're not just cutting clips together. We're building
                narratives, amplifying brands, and creating content that people
                actually remember. Here's what sets us apart from the rest.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 border-2 border-surface bg-primary flex items-center justify-center text-on-primary text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-on-surface font-semibold text-sm">
                    Join 120+ happy clients
                  </p>
                  <p className="text-outline text-xs">
                    who trust us with their content
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — Reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((reason, index) => (
              <ScrollReveal key={reason.title} delay={index * 0.1}>
                <motion.div
                  className="group p-6 bg-surface-container border border-outline-variant hover:border-primary/50 transition-all duration-500 h-full"
                  whileHover={{ y: -3 }}
                >
                  <div className="w-11 h-11 flex items-center justify-center border border-primary/30 text-primary mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      {reason.icon}
                    </svg>
                  </div>
                  <h3 className="font-display-lg text-on-surface mb-2 text-lg font-semibold">
                    {reason.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm font-body-md leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
