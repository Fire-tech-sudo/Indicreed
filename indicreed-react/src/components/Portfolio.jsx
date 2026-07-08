import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "YouTube", "Reels", "Brand", "Podcast"];

  const projects = [
    {
      title: "Brand Story — Altitude Co.",
      category: "Brand",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
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
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      duration: "0:30",
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
      className="relative py-28 overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">
            OUR WORK
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Featured <span className="text-blue-400">Portfolio.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            A glimpse into the projects we've brought to life. Every frame,
            intentional. Every cut, purposeful.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 text-sm font-semibold uppercase tracking-wider border transition-all duration-500 cursor-pointer ${
                activeFilter === filter
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-transparent text-gray-400 border-gray-700 hover:border-blue-500 hover:text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

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
                className="group relative overflow-hidden glass-card rounded-xl cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Play button */}
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

                  {/* Duration badge */}
                  {project.duration && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/80 text-[11px] text-white font-semibold tracking-wider rounded">
                      {project.duration}
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 border border-white/20 text-[11px] text-white font-semibold tracking-wider rounded">
                    {project.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {project.views}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/portfolio">
            <motion.button
              className="px-8 py-3 border border-gray-700 text-white font-semibold uppercase tracking-wider hover:border-blue-500 hover:text-blue-400 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW FULL PORTFOLIO
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
