import React from "react";

/**
 * Drops the same atmospheric depth Hero gets from its photo — vignette,
 * subtle film grain, and a slow ambient glow drift — onto sections that
 * don't have a background image. Place it as the FIRST child inside any
 * section that has `relative` and `overflow-hidden` on it; it sits behind
 * your content automatically (z-index: 0), so just give your content
 * wrapper `relative z-10`.
 *
 * Usage:
 * <section className="relative overflow-hidden bg-surface py-28">
 *   <CinematicOverlay />
 *   <div className="relative z-10 max-w-7xl mx-auto ...">
 *     ...actual section content...
 *   </div>
 * </section>
 *
 * Props:
 * - glow: show the soft ambient primary-color glow drifting at the top (default true)
 * - grain: show the film-grain texture (default true)
 * - vignette: darken the edges like a lens vignette (default true)
 */
function CinematicOverlay({ glow = true, grain = true, vignette = true }) {
  return (
    <div className="cinematic-overlay">
      {glow && <div className="cinematic-overlay__glow" />}
      {vignette && <div className="cinematic-overlay__vignette" />}
      {grain && <div className="cinematic-overlay__grain" />}
    </div>
  );
}

export default CinematicOverlay;
