import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target);
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="text-center">
      {/* Added text-primary for theme sync along with text-gradient */}
      <div className="text-4xl sm:text-5xl font-display font-bold text-primary text-gradient mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      {/* Replaced text-gray-400 with text-on-surface-variant */}
      <div className="text-sm text-on-surface-variant font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

function TrustedBy() {
  const brands = [
    "TechFlow",
    "CreatorHub",
    "Vistara",
    "Neonwave",
    "Brightside",
    "CloudNine",
  ];

  const stats = [
    { target: 850, suffix: "+", label: "Projects Delivered" },
    { target: 120, suffix: "+", label: "Happy Clients" },
    { target: 24, suffix: "h", label: "Avg. Turnaround" },
    { target: 98, suffix: "%", label: "Client Retention" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle divider - synced with on-surface color */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-on-surface/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trusted brands label */}
        <ScrollReveal>
          {/* Replaced text-gray-500 with text-on-surface-variant */}
          <p className="text-center text-sm text-on-surface-variant uppercase tracking-[0.2em] font-medium mb-10">
            Trusted by creators & brands worldwide
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-20">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                className="text-xl font-display font-semibold text-on-surface-variant hover:text-primary transition-colors duration-300 cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="relative p-6 rounded-2xl bg-glass card-shine">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  label={stat.label}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;
