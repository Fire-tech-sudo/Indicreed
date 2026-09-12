import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "YouTube", "Reels", "Podcast"];

  const projects = [
    {
      title: "Founders Podcast - Full Episode",
      category: "Podcast",
      image: "/indicreed_files/full-podcast.jpg",
      duration: "Full Video",
      views: "Watch on YouTube",
      link: "https://youtu.be/OEYGfNPKPdM?si=FkMR0l97_c8b-MDr",
    },
    {
      title: "Viral Podcast Highlight Reel",
      category: "Podcast",
      image: "/indicreed_files/podcast-reel.jpg",
      duration: "0:45",
      views: "YouTube Shorts",
      link: "https://youtube.com/shorts/Uu71r8Plo3c?feature=share",
    },
    {
      title: "YouTube Long form - NewsWorm Germany",
      category: "YouTube",
      image: "/indicreed_files/Newsworm.png",
      duration: "12:08",
      views: "112K Subscribers",
      link: "https://youtu.be/XM-8fOh9o2g",
    },
    {
      title: "Talking Head - Salon Retention",
      category: "Reels",
      image: "/indicreed_files/saloon-retention-talking-head.png",
      duration: "0:58",
      views: "High-Retention Short",
      link: "https://youtube.com/shorts/lq5WzfRShIc?feature=share",
    },
    {
      title: "Commercial Product Video Ad",
      category: "Reels",
      image: "/indicreed_files/ad-reel.jpg",
      duration: "0:30",
      views: "High Converting Ad",
      link: "https://youtube.com/shorts/5Fp4x_iwUAA?feature=share",
    },
    {
      title: "Real Estate Property Showcase",
      category: "Reels",
      image: "/indicreed_files/real-estate-reel.jpg",
      duration: "0:45",
      views: "Luxury Cinematic",
      link: "https://youtube.com/shorts/G5ZB8ZAQRyw?feature=share",
    },
    {
      title: "Gym Transformation - Fitness Edit",
      category: "Reels",
      image: "/indicreed_files/gym-1.jpg",
      duration: "0:45",
      views: "120K Views",
      link: "https://youtube.com/shorts/gLc7RipnZMc?feature=share",
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
            A glimpse into the video projects we've brought to life. Every frame,
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
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden glass-card rounded-xl cursor-pointer block border border-gray-800 hover:border-blue-500/60 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Play button */}
                  <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="w-12 h-12 rounded-full border border-white/40 bg-blue-600/80 backdrop-blur-sm flex items-center justify-center text-white"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg
                        className="w-5 h-5 ml-0.5"
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
                  <div className="absolute top-3 left-3 px-3 py-1 border border-white/20 bg-black/60 text-[11px] text-white font-semibold tracking-wider rounded">
                    {project.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-1 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-blue-400 font-medium">
                    {project.views} &rarr;
                  </p>
                </div>
              </motion.a>
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
