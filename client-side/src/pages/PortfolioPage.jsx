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
      <main className="min-h-screen bg-[var(--color-surface)] pb-20 text-[var(--color-on-surface)] transition-colors duration-300 ">
        {/* ============ Hero Section ============ */}
        <section className="relative overflow-hidden px-5 pt-32 pb-16 text-center ">
          {/* Cinematic Layer */}
          <div className="cinematic-overlay">
            <div className="cinematic-overlay__vignette" />
            <div className="cinematic-overlay__grain" />
            <div className="cinematic-overlay__glow" />
          </div>

          {/* Decorative Glows */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[color:var(--color-primary)] opacity-20 blur-[120px] animate-float" />
          <div className="absolute -bottom-10 -left-20 h-72 w-72 rounded-full bg-[color:var(--color-primary)] opacity-15 blur-[120px] animate-float-delay" />
          <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-surface-bright)] opacity-30 blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">
            <h1
              className="mb-10 text-5xl font-bold tracking-tight md:text-6xl border-b-3 rounded-full border-white pb-3 w-[50%] mx-auto
                       [font-family:var(--font-headline-xl)] text-[var(--color-on-surface)]"
            >
              My <span className="text-[var(--color-primary)]">Portfolio</span>
            </h1>

            <p
              className="mx-auto max-w-2xl text-base leading-8 md:text-lg
                       [font-family:var(--font-body-md)]
                       text-[var(--color-on-surface-variant)]"
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
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[0_12px_30px_rgba(51,87,232,0.25)]"
                      : "border-[var(--color-outline-variant)] bg-transparent text-[var(--color-on-surface-variant)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-container-low)] hover:text-[var(--color-primary)]"
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
          <div className="mx-auto max-w-[var(--spacing-container-max)]">
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
                className="rounded-[24px] border border-[var(--color-outline-variant)]
                         bg-[var(--color-surface-container-low)] py-16 text-center"
              >
                <p className="text-lg text-[var(--color-on-surface-variant)]">
                  Koi project nahi mila is category mein 😕
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ============ Stats Section ============ */}
        <section className="mt-20 px-5">
          <div className="mx-auto grid max-w-[var(--spacing-container-max)] grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group rounded-[24px] border border-[var(--color-outline-variant)]
                         bg-[var(--color-surface-container-low)] p-8 text-center
                         transition-all duration-300 hover:-translate-y-2
                         hover:border-[var(--color-primary)]
                         hover:shadow-[0_18px_40px_rgba(51,87,232,0.12)]"
              >
                <h2
                  className="mb-2 text-4xl font-bold text-[var(--color-primary)] lg:text-5xl
                           [font-family:var(--font-headline-lg)]"
                >
                  {stat.number}
                </h2>
                <p
                  className="text-sm font-medium text-[var(--color-on-surface-variant)]
                           [font-family:var(--font-body-md)]"
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
