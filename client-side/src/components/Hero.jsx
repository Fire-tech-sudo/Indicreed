import React, { useRef, useEffect } from "react";
import heroVideo from "../assets/heroVideo.mp4";
import heroPoster from "../assets/1.png";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // First play: full video from 0 (native autoplay handles this).
    // Every loop after that: skip the first 3 seconds.
    // We can't use the native `loop` attribute for this because looped video
    // fires no "ended" event — so looping is handled manually here instead.
    const handleEnded = () => {
      video.currentTime = 2;
      video.play();
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="theme-hero-nav">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Overlay completely transparent to maintain the video's natural neutral brightness */}
          <div className="absolute inset-0 bg-transparent z-10"></div>

          {/* Background video — loop attribute removed on purpose, see the
              handleEnded logic above: first play runs in full, every replay
              after that starts from the 3-second mark instead of 0. */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={heroVideo}
            poster={heroPoster}
            autoPlay
            muted
            playsInline
          />
        </div>
        <div className="relative z-20 text-center px-6 md:px-margin-desktop max-w-5xl cinematic-reveal reveal-active mt-25">
          {/* Label kept primary (Black in this scope) for brand consistency */}
          <p className="font-label-caps text-[10px] md:text-label-caps text-primary tracking-[0.4em] mb-6 font-bold">
            INDICREED VIDEO PRODUCTION AGENCY
          </p>
          {/* Main Headline */}
          <h1 className="font-display-lg text-4xl md:text-display-lg leading-tight mb-30 text-black font-extrabold tracking-tight">
            CRAFTING VISUAL <br className="hidden md:block" /> LEGACIES.
          </h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
            {/* CTA Button updated to Transparent (Ghost Style) with Fill on Hover */}
            <button className="group flex items-center gap-4 bg-transparent border border-primary text-primary px-8 py-5 font-label-caps text-label-caps transition-all duration-700 hover:scale-[1.02] hover:bg-primary hover:text-on-primary hover:shadow-xl hover:shadow-primary/30">
              VIEW OUR WORK
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>
      </section>
    </div>
  );
};
export default Hero;
