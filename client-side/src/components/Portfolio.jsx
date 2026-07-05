import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import GhostButton from "./GhostButton";
import CinematicOverlay from "./CinematicOverlay";
import productImage from "../assets/productLaunch.png";
import brandImage from "../assets/brandImage.png";

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "YouTube", "Reels", "Brand", "Podcast"];

  const projects = [
    {
      title: "Brand Story — Altitude Co.",
      category: "Brand",
      image: brandImage,
      duration: "3:24",
      views: "2.1M views",
    },
    {
      title: "Day in My Life — Travel Vlog",
      category: "YouTube",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
      duration: "12:08",
      views: "890K views",
    },
    {
      title: "Product Launch Reel",
      category: "Reels",
      image: productImage,
      views: "5.4M views",
    },
    {
      title: "Tech Review — iPhone 16 Pro",
      category: "YouTube",
      image:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
      duration: "15:42",
      views: "1.8M views",
    },
    {
      title: "Founders Podcast — Ep. 47",
      category: "Podcast",
      image:
        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80",
      duration: "48:15",
      views: "340K plays",
    },
    {
      title: "Fitness Transformation",
      category: "Reels",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
      duration: "0:45",
      views: "3.2M views",
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="relative py-28 overflow-hidden bg-surface"
    >
      {/* Dark section — gets the full cinematic atmosphere layer, same as Contact */}
      <CinematicOverlay />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <SectionHeader
          eyebrow={
            <>
              <span className="px-4 py-1.5 rounded-full  border-b-3 border-white text-white text-5xl font-semibold uppercase tracking-wider ">
                OUR WORK
              </span>
            </>
          }
          title={
            <>
              Featured <span className="text-primary">portfolio.</span>
            </>
          }
          subtitle="A glimpse into the projects we've brought to life. Every frame, intentional. Every cut, purposeful."
        />

        {/* Filter Tabs — ghost style, no filled pills */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 font-label-caps text-label-caps border transition-all duration-500 ${
                  activeFilter === filter
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-transparent text-on-surface-variant border-outline-variant hover:border-primary hover:text-on-surface"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden bg-surface-container border border-outline-variant/40 hover:border-primary/60 transition-colors duration-500 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay mapped to surface color */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Play button — ghost circle instead of filled glow */}
                  <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="w-14 h-14 rounded-full border border-white/40 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg
                        className="w-5 h-5 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Duration badge — sharp corners, no rounded-md */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-surface-dim/90 text-[11px] text-on-surface font-label-caps tracking-wider">
                    {project.duration}
                  </div>

                  {/* Category badge — outline style, matches hero's outline buttons */}
                  <div className="absolute top-3 left-3 px-3 py-1 border border-white/20 text-[11px] text-white font-label-caps tracking-wider">
                    {project.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-display-lg text-lg text-on-surface group-hover:text-primary transition-colors duration-300 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant font-body-md">
                    {project.views}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button — same GhostButton used everywhere else */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mt-12">
            <GhostButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW FULL PORTFOLIO
            </GhostButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Portfolio;
