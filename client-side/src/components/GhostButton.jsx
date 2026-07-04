import React from "react";

/**
 * The exact button language from Hero — transparent, bordered, fills on hover.
 * Every CTA on the site (View Full Portfolio, Start Growing, Contact Us, etc.)
 * should use this instead of a filled/glow button, so buttons feel like one family.
 *
 * Usage:
 * <GhostButton onClick={...}>VIEW FULL PORTFOLIO</GhostButton>
 * <GhostButton as="a" href="#contact">CONTACT US</GhostButton>
 * <GhostButton filled>START GROWING</GhostButton>   // for the one CTA per section you want to emphasize
 */
function GhostButton({
  children,
  as = "button",
  filled = false,
  className = "",
  showArrow = true,
  ...props
}) {
  const Component = as;

  const base =
    "group inline-flex items-center gap-4 px-8 py-4 font-label-caps text-label-caps border transition-all duration-700";

  const variant = filled
    ? "bg-primary text-on-primary border-primary hover:opacity-90"
    : "bg-transparent text-primary border-primary hover:bg-primary hover:text-on-primary";

  return (
    <Component className={`${base} ${variant} ${className}`} {...props}>
      {children}
      {showArrow && (
        <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
          arrow_forward
        </span>
      )}
    </Component>
  );
}

export default GhostButton;
