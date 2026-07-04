import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import CinematicOverlay from "./CinematicOverlay";

function Services() {
  const services = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      ),
      title: "Video Editing",
      description:
        "Professional editing for long-form content, vlogs, documentaries, and brand films with seamless pacing and storytelling.",
    },
    {
      icon: (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </>
      ),
      title: "YouTube Editing",
      description:
        "Retention-focused editing with dynamic cuts, zooms, sound effects, and graphics that keep viewers watching till the end.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      ),
      title: "Reels & Shorts",
      description:
        "Scroll-stopping short-form content optimized for Instagram Reels, TikTok, and YouTube Shorts with trendy transitions.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      ),
      title: "Color Grading",
      description:
        "Cinematic color correction and grading that sets the mood, enhances visuals, and gives your footage a professional film look.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
      title: "Motion Graphics",
      description:
        "Eye-catching animated titles, lower thirds, transitions, and visual effects that elevate your video production quality.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      ),
      title: "Podcast Editing",
      description:
        "Clean audio editing, visual enhancements, dynamic layouts, and multi-camera sync for engaging podcast episodes.",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-28 overflow-hidden bg-surface"
    >
      <CinematicOverlay />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          eyebrow={
            <>
              <span className="px-4 py-1.5 rounded-full  border-b-3 border-black text-black text-5xl font-semibold uppercase tracking-wider ">
                WHAT WE DO
              </span>
            </>
          }
          title={
            <>
              Editing services that
              <br />
              <span className="text-primary">move the needle.</span>
            </>
          }
          subtitle="From raw footage to polished masterpiece — we handle every aspect of post-production with obsessive attention to detail."
        />

        {/* Services Grid — sharp corners, single accent color, no rounded-2xl/card-shine */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <motion.div
                className="group relative p-8 bg-surface-container cursor-default transition-all duration-500 border border-outline-variant/40 hover:border-primary/50"
                whileHover={{ y: -5 }}
              >
                {/* Icon — single accent, outline box instead of filled colored bg */}
                <div className="w-14 h-14 flex items-center justify-center mb-6 border border-primary/30 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {service.icon}
                  </svg>
                </div>

                {/* Title */}
                <h3 className="font-display-lg text-xl font-semibold mb-3 text-on-surface group-hover:text-primary transition-all duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-on-surface-variant font-body-md leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Learn more link */}
                <div className="mt-6 flex items-center gap-2 text-sm font-label-caps tracking-wide text-on-surface-variant group-hover:text-primary transition-all duration-300">
                  <span>LEARN MORE</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
