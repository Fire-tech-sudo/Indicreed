import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "YouTuber • 1.2M Subscribers",
      avatar: "SM",
      content:
        "Indicreed Studio completely transformed my channel. My retention rate jumped by 40% after switching to their editing team. They understand pacing, storytelling, and what keeps viewers hooked.",
      rating: 5,
      color: "from-primary to-primary-fixed",
    },
    {
      name: "Marcus Chen",
      role: "Founder, Altitude Brands",
      avatar: "MC",
      content:
        "We needed a team that could match our brand's premium feel. Indicreed Studio delivered beyond expectations — the color grading alone was worth it. Every video feels cinematic.",
      rating: 5,
      color: "from-secondary to-secondary-fixed",
    },
    {
      name: "Emily Rodriguez",
      role: "Podcast Host • The Daily Grind",
      avatar: "ER",
      content:
        "Quick turnaround, amazing quality, and they actually listen to feedback. I've worked with 4 editing agencies before — Indicreed Studio is the first one I've stuck with for over a year.",
      rating: 5,
      color: "from-tertiary to-tertiary-container",
    },
    {
      name: "Jake Thomson",
      role: "Content Creator • Travel Niche",
      avatar: "JT",
      content:
        "The motion graphics they added to my travel videos were absolutely stunning. Clean, modern, and not overdone. They have a real eye for what works on social media.",
      rating: 5,
      color: "from-primary to-primary-fixed",
    },
    {
      name: "Diana Park",
      role: "Marketing Director, TechFlow",
      avatar: "DP",
      content:
        "Indicreed Studio handles all our product launch videos and social content. The consistency and quality across dozens of videos is remarkable. True professionals.",
      rating: 5,
      color: "from-secondary to-secondary-fixed",
    },
    {
      name: "Alex Rivera",
      role: "Fitness Influencer • 800K Followers",
      avatar: "AR",
      content:
        "They turned my simple workout clips into viral-worthy reels. The editing style is fresh, trendy, and exactly what performs well on Instagram. Couldn't be happier.",
      rating: 5,
      color: "from-tertiary to-tertiary-container",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Divider mapped to theme */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-on-surface/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            {/* Badge mapped to primary container */}
            <span className="inline-block px-4 py-1.5 rounded-full  border-b-3 text-white text-5xl font-semibold uppercase tracking-wider mb-15">
              Client Love
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6 text-on-surface">
              Hear it from{" "}
              <span className="text-primary text-gradient">our clients.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            {/* Text mapped to on-surface-variant */}
            <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">
              Don't just take our word for it. Here's what creators and brands
              say about working with Indicreed Studio.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <motion.div
                className="relative p-7 rounded-2xl bg-surface-container border border-outline-variant/30 hover:border-outline transition-all duration-500 h-full flex flex-col"
                whileHover={{ y: -5 }}
              >
                {/* Stars mapped to primary color */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Content mapped to on-surface-variant */}
                <p className="text-on-surface-variant leading-relaxed text-sm flex-grow mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-outline-variant/30">
                  {/* Avatar background dynamically mapped from the array */}
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-on-primary text-sm font-bold shadow-lg shadow-primary/10`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    {/* Text mapped to theme */}
                    <p className="text-on-surface font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-outline text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
