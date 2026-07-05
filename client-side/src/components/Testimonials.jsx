import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import CinematicOverlay from "./CinematicOverlay";

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "YouTuber • 1.2M Subscribers",
      avatar: "SM",
      content:
        "Indicreed Studio completely transformed my channel. My retention rate jumped by 40% after switching to their editing team. They understand pacing, storytelling, and what keeps viewers hooked.",
      rating: 5,
    },
    {
      name: "Marcus Chen",
      role: "Founder, Altitude Brands",
      avatar: "MC",
      content:
        "We needed a team that could match our brand's premium feel. Indicreed Studio delivered beyond expectations — the color grading alone was worth it. Every video feels cinematic.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Podcast Host • The Daily Grind",
      avatar: "ER",
      content:
        "Quick turnaround, amazing quality, and they actually listen to feedback. I've worked with 4 editing agencies before — Indicreed Studio is the first one I've stuck with for over a year.",
      rating: 5,
    },
    {
      name: "Jake Thomson",
      role: "Content Creator • Travel Niche",
      avatar: "JT",
      content:
        "The motion graphics they added to my travel videos were absolutely stunning. Clean, modern, and not overdone. They have a real eye for what works on social media.",
      rating: 5,
    },
    {
      name: "Diana Park",
      role: "Marketing Director, TechFlow",
      avatar: "DP",
      content:
        "Indicreed Studio handles all our product launch videos and social content. The consistency and quality across dozens of videos is remarkable. True professionals.",
      rating: 5,
    },
    {
      name: "Alex Rivera",
      role: "Fitness Influencer • 800K Followers",
      avatar: "AR",
      content:
        "They turned my simple workout clips into viral-worthy reels. The editing style is fresh, trendy, and exactly what performs well on Instagram. Couldn't be happier.",
      rating: 5,
    },
  ];

  // Duplicated once for a seamless infinite loop — same technique as the
  // TrustedBy marquee.
  const marqueeTestimonials = [...testimonials, ...testimonials];

  const TestimonialCard = ({ testimonial }) => (
    <div className="w-[380px] flex-shrink-0 relative p-7 bg-surface-container border border-outline-variant/40 hover:border-primary/50 transition-all duration-500 flex flex-col">
      {/* Stars */}
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

      <p className="text-on-surface-variant font-body-md leading-relaxed text-sm flex-grow mb-6">
        "{testimonial.content}"
      </p>

      {/* Author — sharp square avatar, single accent color, no gradient */}
      <div className="flex items-center gap-3 pt-5 border-t border-outline-variant/30">
        <div className="w-11 h-11 flex items-center justify-center border border-primary/30 text-primary text-sm font-bold flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-on-surface font-semibold text-sm">
            {testimonial.name}
          </p>
          <p className="text-outline text-xs">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-28 overflow-hidden bg-surface">
      {/* Dark section — full cinematic atmosphere */}
      <CinematicOverlay />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={
            <>
              <span className="px-4 py-1.5 rounded-full  border-b-3 border-white text-white text-3xl md:text-5xl font-semibold uppercase tracking-wider ">
                CLIENT LOVE
              </span>
            </>
          }
          title={
            <>
              Hear it from <span className="text-primary">our clients.</span>
            </>
          }
          subtitle="Don't just take our word for it. Here's what creators and brands say about working with Indicreed Studio."
        />
      </div>

      {/* Marquee row — full-bleed, outside the max-w container so cards can
          scroll edge-to-edge */}
      <div className="relative z-10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {marqueeTestimonials.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
