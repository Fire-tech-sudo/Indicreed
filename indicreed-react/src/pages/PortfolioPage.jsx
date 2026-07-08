// src/pages/Portfolio.jsx

import React, { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projectData";

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
  { number: "3+", label: "Years Experience" },
  { number: "10+", label: "Technologies" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...new Set(projectsData.map((p) => p.category))];

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <main className="min-h-screen bg-black pb-20 text-white transition-colors duration-300 ">
        {/* ============ Hero Section ============ */}
        <section className="relative overflow-hidden px-5 pt-32 pb-16 text-center section-glow">
          {/* Decorative Glows */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500 opacity-10 blur-[120px]" />
          <div className="absolute -bottom-10 -left-20 h-72 w-72 rounded-full bg-blue-500 opacity-10 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800 opacity-30 blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">
            <h1
              className="mb-10 text-2xl font-bold tracking-tight md:text-6xl border-b-3 rounded-full border-white pb-3 w-[50%] mx-auto
                       text-white"
            >
              Portfolio
            </h1>

            <p
              className="mx-auto max-w-2xl text-base leading-8 md:text-lg
                       text-gray-400"
            >
              Yahan mere kuch selected projects hain jinhe maine design aur
              develop kiya hai. Har project mein maine apni best skills use ki
              hain.
            </p>
          </div>
        </section>

        {/* ============ Filter Section ============ */}
        <section className="my-10 px-5">
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              const isActive = activeFilter === category;

              return (
                <button
                  key={index}
                  onClick={() => setActiveFilter(category)}
                  className={`cursor-pointer rounded-full border px-7 py-2.5 text-sm font-semibold transition-all duration-300
                  ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "border-gray-800 bg-transparent text-gray-400 hover:border-blue-500 hover:bg-gray-900 hover:text-blue-400"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {/* ============ Projects Grid ============ */}
        <section className="px-5">
          <div className="mx-auto max-w-7xl">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div
                className="rounded-[24px] border border-gray-800
                         bg-gray-900/50 py-16 text-center"
              >
                <p className="text-lg text-gray-400">
                  Koi project nahi mila is category mein 😕
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ============ Stats Section ============ */}
        <section className="mt-20 px-5">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group rounded-[24px] border border-gray-800
                         bg-gray-900/50 p-8 text-center
                         transition-all duration-300 hover:-translate-y-2
                         hover:border-blue-500
                         hover:shadow-[0_18px_40px_rgba(51,87,232,0.12)]"
              >
                <h2
                  className="mb-2 text-4xl font-bold text-blue-400 lg:text-5xl"
                >
                  {stat.number}
                </h2>
                <p
                  className="text-sm font-medium text-gray-400"
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Portfolio;
