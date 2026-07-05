import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import CinematicOverlay from "./CinematicOverlay";

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "499",
      period: "/month",
      description:
        "Perfect for solo creators getting started with professional editing.",
      features: [
        "4 edited videos per month",
        "Up to 10 min per video",
        "2 revision rounds",
        "Basic color correction",
        "Royalty-free music",
        "48-hour turnaround",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Growth",
      price: "999",
      period: "/month",
      description:
        "For growing creators and brands who need consistent, high-quality content.",
      features: [
        "8 edited videos per month",
        "Up to 20 min per video",
        "Unlimited revisions",
        "Advanced color grading",
        "Motion graphics & titles",
        "Thumbnail design included",
        "24-hour turnaround",
        "Dedicated editor",
      ],
      cta: "Start Growing",
      popular: true,
    },
    {
      name: "Studio",
      price: "2,499",
      period: "/month",
      description:
        "Full-service editing for agencies, brands, and high-volume creators.",
      features: [
        "Unlimited videos",
        "Unlimited video length",
        "Unlimited revisions",
        "Cinematic color grading",
        "Custom motion graphics",
        "Multi-platform formatting",
        "Same-day turnaround",
        "Dedicated team of 2",
        "Strategy calls included",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      {/* Background mapped to surface variables */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container to-surface" />
      <CinematicOverlay />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-on-surface/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            {/* Badge mapped to primary-container */}
            <span className="inline-block px-4 py-1.5 rounded-full  border-b-3 border-black text-black text-5xl font-semibold uppercase tracking-wider mb-15">
              Pricing
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-display-lg font-bold mb-6 text-on-surface">
              Simple, transparent{" "}
              <span className="text-primary text-gradient">pricing.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            {/* Text mapped to on-surface-variant */}
            <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">
              No hidden fees, no surprise charges. Pick a plan that fits your
              needs and start creating better content today.
            </p>
          </ScrollReveal>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.15}>
              <motion.div
                className={`relative p-8 rounded-2xl h-full flex flex-col ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/10 to-primary/5 border-2 border-primary/30 shadow-2xl shadow-primary/10"
                    : "bg-surface-container border border-outline-variant/30 hover:border-outline"
                } transition-all duration-500`}
                whileHover={{ y: -5 }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-primary/30">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-8">
                  <h3 className="text-xl font-display font-semibold text-on-surface mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-6">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-on-surface-variant">$</span>
                    <span className="text-5xl font-display font-bold text-on-surface">
                      {plan.price}
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.popular ? "text-primary" : "text-outline-variant"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-on-surface-variant text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    plan.popular
                      ? "bg-primary text-on-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                      : "bg-surface-container-high text-on-surface border border-outline-variant/50 hover:bg-surface-bright hover:border-outline"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Custom note */}
        <ScrollReveal delay={0.3}>
          <p className="text-center text-on-surface-variant text-sm mt-12">
            Need a custom plan?{" "}
            <a
              href="#contact"
              className="text-primary hover:opacity-80 font-medium underline underline-offset-4 transition-opacity"
            >
              Let's talk
            </a>{" "}
            — we'll build something tailored for you.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Pricing;
