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
      <div className="font-display-lg text-4xl sm:text-5xl font-bold text-primary mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-sm text-on-surface-variant font-label-caps uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

function TrustedBy() {
  // Expanded list — more names for a fuller, more convincing marquee
  const brands = [
    "TechFlow",
    "CreatorHub",
    "Vistara",
    "Neonwave",
    "Brightside",
    "CloudNine",
    "Altitude Co.",
    "Northbeam",
    "Pixel & Co.",
    "Riverline",
    "Solstice Media",
    "Fernway Studio",
  ];

  // Duplicate the list once — this is what makes the scroll loop seamless.
  // The track animates from 0% to -50% (exactly one full set of brands),
  // so the moment it resets, the duplicate set is already in the same
  // visual position and the loop is invisible.
  const marqueeBrands = [...brands, ...brands];

  const stats = [
    { target: 850, suffix: "+", label: "Projects Delivered" },
    { target: 120, suffix: "+", label: "Happy Clients" },
    { target: 24, suffix: "h", label: "Avg. Turnaround" },
    { target: 98, suffix: "%", label: "Client Retention" },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-surface">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-on-surface/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center font-label-caps text-on-surface-variant tracking-[0.3em] mb-10">
            TRUSTED BY CREATORS & BRANDS WORLDWIDE
          </p>
        </ScrollReveal>

        {/* Horizontal auto-scrolling brand marquee */}
        <ScrollReveal delay={0.2}>
          <div className="relative mb-20 overflow-hidden">
            {/* Fade edges so logos don't hard-cut at the container border */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-16 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {marqueeBrands.map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  className="text-xl font-display-lg font-semibold text-white hover:text-primary transition-colors duration-300 cursor-default whitespace-nowrap"
                >
                  {brand}
                </div>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="relative p-6 bg-surface-container border border-outline-variant/40">
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
