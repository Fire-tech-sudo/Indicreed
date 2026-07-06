// src/pages/ProjectDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaUserTie,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaPlay,
  FaBehance,
  FaFilm,
  FaPalette,
  FaVideo,
  FaStar,
} from "react-icons/fa";
import projectsData from "../data/projectData";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentImage(0);

    const foundProject = projectsData.find((p) => p.id === parseInt(id));

    const timer = setTimeout(() => {
      setProject(foundProject);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const nextImage = () => {
    if (project) {
      setCurrentImage((prev) =>
        prev === project.screenshots.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (project) {
      setCurrentImage((prev) =>
        prev === 0 ? project.screenshots.length - 1 : prev - 1,
      );
    }
  };

  const currentIndex = projectsData.findIndex((p) => p.id === parseInt(id));
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsData.length - 1
      ? projectsData[currentIndex + 1]
      : null;

  // ============ Category Icons ============
  const getCategoryIcon = (category) => {
    const icons = {
      Commercial: <FaFilm />,
      YouTube: <FaPlay />,
      "Wedding Film": <FaVideo />,
      "Social Media": <FaStar />,
      Documentary: <FaFilm />,
      "Music Video": <FaPalette />,
      "Real Estate": <FaVideo />,
      Podcast: <FaPlay />,
    };
    return icons[category] || <FaFilm />;
  };

  // ============ Category Colors ============
  const getCategoryGradient = (category) => {
    const gradients = {
      Commercial: "from-amber-500 to-orange-600",
      YouTube: "from-red-500 to-rose-600",
      "Wedding Film": "from-pink-500 to-rose-500",
      "Social Media": "from-purple-500 to-indigo-600",
      Documentary: "from-emerald-500 to-teal-600",
      "Music Video": "from-violet-500 to-purple-600",
      "Real Estate": "from-blue-500 to-cyan-600",
      Podcast: "from-orange-500 to-amber-600",
    };
    return gradients[category] || "from-indigo-500 to-pink-500";
  };

  // ============ Loading State ============
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex flex-col items-center justify-center gap-5">
        {/* Film Reel Loading Animation */}
        <div className="relative w-16 h-16">
          <div
            className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 
                          rounded-full animate-spin"
          />
          <FaFilm className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400 text-lg" />
        </div>
        <p className="text-gray-400 text-lg">Loading Project...</p>
      </div>
    );
  }

  // ============ Not Found State ============
  if (!project) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex flex-col items-center justify-center text-center px-5">
        <FaFilm className="text-6xl text-indigo-500/30 mb-6" />
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent mb-3">
          404
        </h1>
        <h2 className="text-3xl font-bold text-white mb-4">
          Project Not Found! 😕
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          This project doesn't exist or has been removed.
        </p>
        <Link
          to="/portfolio"
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 
                     text-white rounded-xl font-semibold transition-all hover:scale-105 
                     hover:shadow-xl hover:shadow-indigo-500/30"
        >
          <FaArrowLeft /> Back to Portfolio
        </Link>
      </div>
    );
  }

  // ============ Extract features from description ============
  const descriptionParts = project.fullDescription.split("\n").filter(Boolean);
  const mainDescription = descriptionParts
    .filter((line) => !line.trim().startsWith("-"))
    .join(" ");
  const features = descriptionParts
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.trim().replace("- ", ""));

  // ============ Project Info Items ============
  const infoItems = [
    {
      icon: <FaCalendarAlt />,
      label: "Delivery Date",
      value: new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    { icon: <FaUserTie />, label: "Client", value: project.client },
    { icon: <FaClock />, label: "Project Duration", value: project.duration },
    { icon: <FaUser />, label: "Role", value: project.role },
  ];

  const categoryGradient = getCategoryGradient(project.category);

  return (
    <div className="min-h-screen  bg-[#0f0f23]">
      <div className="max-w-7xl mx-auto px-10  pb-20">
        {/* ============ Back Button ============ */}
        <div className="pt-24 pb-8 ">
          <button
            onClick={() => navigate("/portfolio")}
            className="inline-flex items-center gap-3 px-6 py-3 
                       text-indigo-400 border-x-2 rounded-full 
                       font-semibold text-sm transition-all duration-300 
                       hover:bg-indigo-500/20 hover:-translate-x-1 cursor-pointer"
          >
            <FaArrowLeft /> Back to Portfolio
          </button>
        </div>

        {/* ============ Project Header ============ */}
        <header className="text-center mb-12 animate-fade-in-up">
          {/* Category Badge */}
          <span
            className={`inline-flex items-center gap-2 px-5 py-1.5 bg-gradient-to-r ${categoryGradient}
                          text-white text-xs font-semibold tracking-widest uppercase rounded-full mb-5`}
          >
            {getCategoryIcon(project.category)}
            {project.category}
          </span>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white 
                          mb-4 tracking-tight leading-tight"
          >
            {project.title}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {project.shortDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            {/* Watch Video Button */}
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-8 py-4 
                         bg-gradient-to-r ${categoryGradient} text-white 
                         rounded-xl font-semibold transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30`}
            >
              <FaPlay /> Watch Video
            </a>

            {/* Behance Button */}
            {project.behanceLink && (
              <a
                href={project.behanceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 
                           bg-white/5 text-white border-2 border-white/10 
                           rounded-xl font-semibold transition-all duration-300
                           hover:bg-white/10 hover:-translate-y-1"
              >
                <FaBehance /> View on Behance
              </a>
            )}
          </div>
        </header>

        {/* ============ Image/Screenshot Carousel ============ */}
        <section
          className="mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative flex items-center gap-4">
            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="w-12 h-12 bg-indigo-500/20 border-2 border-indigo-500/30 
                         text-indigo-400 rounded-full flex items-center justify-center 
                         transition-all hover:bg-indigo-500 hover:text-white 
                         hover:scale-110 flex-shrink-0 cursor-pointer"
            >
              <FaChevronLeft />
            </button>

            {/* Main Image with Play Overlay */}
            <div
              className="flex-1 h-64 sm:h-80 md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden 
                            border border-white/5 shadow-2xl shadow-black/30 relative group"
            >
              <img
                src={project.screenshots[currentImage]}
                alt={`${project.title} screenshot ${currentImage + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Play Button Overlay */}
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center 
                           bg-black/30 opacity-0 group-hover:opacity-100 
                           transition-all duration-300"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${categoryGradient} 
                                rounded-full flex items-center justify-center 
                                shadow-2xl transform group-hover:scale-110 
                                transition-transform duration-300`}
                >
                  <FaPlay className="text-white text-2xl ml-1" />
                </div>
              </a>
            </div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="w-12 h-12 bg-indigo-500/20 border-2 border-indigo-500/30 
                         text-indigo-400 rounded-full flex items-center justify-center 
                         transition-all hover:bg-indigo-500 hover:text-white 
                         hover:scale-110 flex-shrink-0 cursor-pointer"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-5">
            {project.screenshots.map((screenshot, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-20 h-14 rounded-xl overflow-hidden border-[3px] transition-all 
                           duration-300 hover:scale-105 cursor-pointer ${
                             currentImage === index
                               ? "border-indigo-500 shadow-lg shadow-indigo-500/30"
                               : "border-transparent opacity-60 hover:opacity-100"
                           }`}
              >
                <img
                  src={screenshot}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* ============ Content Grid ============ */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Left Side - Description & Features (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                <FaFilm className="text-indigo-400" /> Project Overview
              </h2>
              <p className="text-gray-400 leading-[1.9] text-base">
                {mainDescription}
              </p>
            </div>

            {/* Project Highlights */}
            {features.length > 0 && (
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                  <FaStar className="text-amber-400" /> Project Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl 
                                 hover:bg-indigo-500/5 transition-colors group"
                    >
                      <div
                        className={`w-6 h-6 bg-gradient-to-r ${categoryGradient}
                                      rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        <FaCheck className="text-white text-[10px]" />
                      </div>
                      <span className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools & Software Used */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                <FaPalette className="text-purple-400" /> Tools & Software Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-5 py-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl 
                               text-sm font-semibold border border-indigo-500/20 
                               transition-all duration-300 hover:bg-indigo-500/20 
                               hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10
                               cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Info Card (1 column) */}
          <div className="lg:col-span-1">
            <div
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 
                            sticky top-28"
            >
              <h3
                className="flex items-center gap-3 text-xl font-bold text-white mb-8 pb-4 
                              border-b border-white/5"
              >
                <FaVideo className="text-indigo-400" /> Project Details
              </h3>

              <div className="space-y-6">
                {infoItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div
                      className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center 
                                    justify-center text-indigo-400 flex-shrink-0 
                                    group-hover:bg-indigo-500/20 transition-colors"
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-white text-sm font-medium mt-0.5">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links in Sidebar */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                {/* Watch Video */}
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 
                             bg-gradient-to-r ${categoryGradient} text-white 
                             rounded-xl font-semibold text-sm transition-all 
                             hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02]`}
                >
                  <FaPlay className="text-xs" /> Watch Full Video
                </a>

                {/* Behance */}
                {project.behanceLink && (
                  <a
                    href={project.behanceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 
                               bg-white/5 text-white border border-white/10 
                               rounded-xl font-semibold text-sm transition-all 
                               hover:bg-white/10 hover:scale-[1.02]"
                  >
                    <FaBehance /> View on Behance
                  </a>
                )}

                {/* Request Similar Project */}
                <a
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 
                             bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 
                             rounded-xl font-semibold text-sm transition-all 
                             hover:bg-emerald-500/20 hover:scale-[1.02]"
                >
                  <FaExternalLinkAlt className="text-xs" /> Request Similar
                  Project
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============ Next/Previous Navigation ============ */}
        <section
          className="border-t border-white/5 pt-12 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-center text-2xl font-bold text-white mb-8">
            More Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Previous */}
            {prevProject ? (
              <Link
                to={`/portfolio/${prevProject.id}`}
                className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 
                           transition-all duration-300 hover:bg-indigo-500/5 
                           hover:border-indigo-500/20 hover:-translate-y-2"
              >
                <span className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
                  <FaChevronLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                  Previous Project
                </span>
                <span className="text-white text-lg font-bold block">
                  {prevProject.title}
                </span>
                <span className="text-gray-500 text-xs mt-1 block">
                  {prevProject.category}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {/* Next */}
            {nextProject ? (
              <Link
                to={`/portfolio/${nextProject.id}`}
                className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 
                           text-right transition-all duration-300 hover:bg-indigo-500/5 
                           hover:border-indigo-500/20 hover:-translate-y-2"
              >
                <span className="flex items-center justify-end gap-2 text-indigo-400 text-sm font-semibold mb-2">
                  Next Project
                  <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-white text-lg font-bold block">
                  {nextProject.title}
                </span>
                <span className="text-gray-500 text-xs mt-1 block">
                  {nextProject.category}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
