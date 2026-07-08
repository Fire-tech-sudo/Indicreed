import React from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from "react-icons/fa";

const ProjectCard = ({ project, index = 0 }) => {
  const technologies = project.technologies || [];
  const visibleTechs = technologies.slice(0, 4);
  const extraTechs = technologies.length - visibleTechs.length;

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-[8px] border
                 border-gray-800
                 bg-gray-900/50
                 shadow-[0_10px_30px_rgba(0,0,0,0.28)]
                 transition-all duration-500 ease-out
                 hover:-translate-y-3
                 hover:border-blue-500
                 hover:shadow-[0_24px_60px_rgba(51,87,232,0.18)]"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gray-800">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[12px]
                         bg-blue-600 px-5 py-2.5
                         text-sm font-medium text-white
                         transition-all duration-300 hover:scale-105"
            >
              <FaExternalLinkAlt className="text-xs" />
              Live
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 inline-flex items-center gap-2 rounded-[12px]
                         px-5 py-2.5 text-sm font-medium
                         text-white
                         transition-all duration-300 hover:scale-105"
            >
              <FaGithub />
              Code
            </a>
          )}
        </div>

        {/* Category Badge */}
        <span
          className="absolute top-4 right-4 z-10 rounded-full
                     bg-blue-600 px-3.5 py-1
                     text-[11px] font-semibold uppercase tracking-[0.12em]
                     text-white"
        >
          {project.category}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className="mb-3 text-[24px] leading-[1.2] font-semibold
                     text-white
                     transition-colors duration-300
                     group-hover:text-blue-400"
        >
          {project.title}
        </h3>

        <p
          className="mb-5 flex-1 text-[15px] leading-7
                     text-gray-400"
        >
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="mb-6 flex flex-wrap gap-2">
          {visibleTechs.map((tech, i) => (
            <span
              key={i}
              className="rounded-full border border-gray-800
                         bg-gray-800 px-3 py-1
                         text-[12px] font-semibold text-blue-400"
            >
              {tech}
            </span>
          ))}

          {extraTechs > 0 && (
            <span
              className="rounded-full border border-gray-800
                         bg-gray-800 px-3 py-1
                         text-[12px] font-semibold text-white"
            >
              +{extraTechs}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <Link
          to={`/portfolio/${project.id}`}
          className="group/btn inline-flex items-center justify-center gap-2.5
                     rounded-[14px] bg-blue-600 px-5 py-3
                     text-sm font-semibold text-white
                     transition-all duration-300 hover:scale-[1.02]
                     hover:shadow-[0_14px_30px_rgba(51,87,232,0.28)]"
        >
          View Details
          <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
