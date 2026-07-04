import React from "react";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Process from "../components/Process";
import Contact from "../components/Contact";

function Home() {
  return (
    <div>
      {/* Hero — bright/photographic, reads as the "light" anchor */}
      <Hero />

      {/* Dark */}
      <TrustedBy />

      {/* Light */}
      <div className="theme-light">
        <Services />
      </div>

      {/* Dark */}
      <Portfolio />

      {/* Light */}
      <div className="theme-light">
        <WhyChooseUs />
      </div>

      {/* Dark */}
      <Testimonials />

      {/* Light */}
      <div className="theme-light">
        <Pricing />
      </div>

      {/* Dark */}
      <Process />

      {/* Light */}
      <div className="theme-light">
        <Contact />
      </div>
    </div>
  );
}

export default Home;
