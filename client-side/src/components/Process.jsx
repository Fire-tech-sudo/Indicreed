import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

function Process() {
  const steps = [
    {
      number: "01",
      title: "Inquiry",
      description:
        "Tell us about your project, goals, and vision. We'll respond within a few hours with a personalized plan.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Footage Review",
      description:
        "Share your raw footage and references. We'll review everything and align on creative direction before we start.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Editing",
      description:
        "Our editors work their magic — cutting, grading, adding effects, and polishing every frame to perfection.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Revisions",
      description:
        "Review the first draft and share feedback. We'll refine until every detail meets your standards.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
    {
      number: "05",
      title: "Final Delivery",
      description:
        "Receive your polished video in your preferred format, optimized for your target platform. Ready to publish.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="process" className="relative py-28 overflow-hidden">
      {/* Subtle divider mapped to on-surface */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-on-surface/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            {/* Badge mapped to primary-container */}
            <span className="inline-block px-4 py-1.5 rounded-full  border-b-3 text-white text-5xl font-semibold uppercase tracking-wider mb-15">
              How It Works
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6 text-on-surface">
              Our <span className="text-primary text-gradient">process.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            {/* Text mapped to on-surface-variant */}
            <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">
              From first message to final delivery — here's how we bring your
              vision to life, step by step.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line mapped to primary */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent hidden md:block" />

          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.15}>
              <div
                className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  {/* Card mapped to surface-container and hover effect to primary */}
                  <motion.div
                    className="p-6 rounded-2xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 transition-all duration-500"
                    whileHover={{ y: -3 }}
                  >
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {/* Number mapped to primary */}
                      <span className="text-primary font-mono text-sm font-bold">
                        {step.number}
                      </span>
                      {/* Title mapped to on-surface */}
                      <h3 className="text-xl font-display font-semibold text-on-surface">
                        {step.title}
                      </h3>
                    </div>
                    {/* Description mapped to on-surface-variant */}
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Node mapped to primary */}
                <div className="relative flex-shrink-0 hidden md:flex">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-on-primary shadow-lg shadow-primary/20 z-10">
                    {step.icon}
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
