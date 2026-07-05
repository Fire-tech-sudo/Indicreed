import React from "react";
import ScrollReveal from "./ScrollReveal";

/**
 * Shared header for every content section — mirrors Hero's typographic voice:
 * thin uppercase tracked eyebrow, large serif headline, muted subtitle.
 * Using this everywhere (instead of each section rolling its own badge/heading)
 * is what makes the whole site read as one design instead of a template.
 *
 * Usage:
 * <SectionHeader
 *   eyebrow="OUR WORK"
 *   title={<>Featured <span className="text-primary">portfolio.</span></>}
 *   subtitle="A glimpse into the projects we've brought to life."
 * />
 */
function SectionHeader({ eyebrow, title, subtitle, align = "center" }) {
  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-2xl mb-16 ${alignClass}`}>
      {eyebrow && (
        <ScrollReveal>
          <p className="font-label-caps text-label-caps text-primary tracking-[0.4em] mb-20 font-bold">
            {eyebrow}
          </p>
        </ScrollReveal>
      )}
      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p className="text-on-surface-variant font-body-lg mt-6">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}

export default SectionHeader;
