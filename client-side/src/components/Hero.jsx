import React, { useRef, useEffect, useState } from "react";
import heroVideo from "../assets/heroVideo.mp4";
import heroVideoMobile from "../assets/heroVideoVertical.mp4";
import heroPoster from "../assets/1.png";

const Hero = () => {
  const videoRef = useRef(null);

  // Tracks whether we're below the mobile breakpoint, so we know which
  // video source to render. Using matchMedia + a resize/orientation listener
  // (instead of relying on <source media="..."> inside <video>) because
  // browsers don't reliably re-evaluate <source> media queries when the
  // window is resized after load — only matchMedia is guaranteed to update.
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handleChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const activeSrc = isMobile ? heroVideoMobile : heroVideo;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Whenever the source switches (desktop <-> mobile), reload and replay
    // from the start so the new video isn't left paused on its poster frame.
    video.load();
    video.play().catch(() => {});

    // Looping via "ended" causes a visible stop/freeze because the browser
    // fully pauses on end before we seek and resume. Instead, we watch
    // timeupdate and jump back to the 3-second mark slightly BEFORE the video
    // actually reaches its end, so playback never stops — it just seeks
    // forward while still playing, which looks seamless.
    const SEEK_BACK_TO = 3; // seconds
    const END_BUFFER = 0.2; // jump this many seconds before the true end

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      if (video.currentTime >= video.duration - END_BUFFER) {
        video.currentTime = SEEK_BACK_TO;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [activeSrc]);

  return (
    <div className="theme-hero-nav">
      <section className="relative h-screen flex items-center justify-center overflow-hidden ">
        <div className="absolute inset-0 z-0">
          {/* Overlay completely transparent to maintain the video's natural neutral brightness */}
          <div className="absolute inset-0 bg-transparent z-10"></div>

          {/* Background video — src switches between a landscape video (desktop)
              and a vertical video (mobile) based on the isMobile state above.
              object-cover ensures whichever orientation is playing still fills
              the section without distortion. */}
          <video
            ref={videoRef}
            key={activeSrc}
            className="w-full h-full object-cover"
            src={activeSrc}
            poster={heroPoster}
            autoPlay
            muted
            playsInline
          />
        </div>
        <div className="relative z-20 text-center  px-6 md:px-margin-desktop max-w-5xl cinematic-reveal reveal-active md:mt-25">
          {/* Label kept primary (Black in this scope) for brand consistency */}
          <p className="font-label-caps text-[10px] md:text-label-caps text-primary tracking-[0.4em] mb-6 font-bold">
            INDICREED VIDEO PRODUCTION AGENCY
          </p>
          {/* Main Headline */}
          <h1 className="font-display-lg text-4xl md:text-display-lg leading-tight mb-15 md:mb-30 text-gray-800  font-extrabold tracking-widest">
            CRAFTING VISUAL <br className="hidden md:block" /> LEGACIES.
          </h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:mt-12">
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
