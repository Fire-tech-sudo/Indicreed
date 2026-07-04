import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import GhostButton from "./GhostButton";
import CinematicOverlay from "./CinematicOverlay";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    console.log("Form:", form);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", type: "", budget: "", message: "" });
    }, 3000);
  };

  // Sharp corners (no rounded-sm), thin border, no glow — matches hero's restrained language
  const inputClass =
    "w-full px-5 py-4 bg-surface border border-outline-variant text-on-surface placeholder-outline focus:outline-none focus:border-primary transition-all duration-300 text-sm";

  const contactInfo = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
      label: "Email",
      value: "hello@indicreed.studio",
      delay: 0.3,
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      label: "Response Time",
      value: "Within 2–4 hours",
      delay: 0.4,
    },
    {
      icon: (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </>
      ),
      label: "Location",
      value: "Working Globally",
      delay: 0.5,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden bg-surface"
    >
      <CinematicOverlay />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/*<SectionHeader eyebrow="GET IN TOUCH" />*/}
        <ScrollReveal>
          <span className="flex max-w-md mx-auto justify-center items-center gap-2 px-4 py-2  text-5xl  border-b-2 text-on-surface rounded-full font-bold uppercase tracking-widest mb-20 backdrop-blur-sm">
            Get In Touch
          </span>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Content */}
          <div className="flex flex-col h-full justify-center">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display-lg text-headline-xl text-on-surface font-bold leading-[1.1] mb-6">
                Let's create something
                <br />
                <span className="text-primary">remarkable together.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-on-surface-variant font-body-lg leading-relaxed mb-12 max-w-lg">
                Ready to elevate your content? Tell us about your project and
                we'll get back within hours with a tailored plan. No commitment
                required.
              </p>
            </ScrollReveal>

            {/* Contact Info — thin border cards, no rounded-2xl/glow */}
            <div className="space-y-4">
              {contactInfo.map((item, idx) => (
                <ScrollReveal key={idx} delay={item.delay}>
                  <div className="group flex items-center gap-5 p-5 bg-surface-container border border-outline-variant hover:border-primary/50 transition-all duration-300 cursor-default">
                    <div className="w-12 h-12 flex items-center justify-center text-primary flex-shrink-0 border border-primary/30 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-outline text-[10px] uppercase tracking-widest font-bold mb-1">
                        {item.label}
                      </p>
                      <p className="text-on-surface font-medium text-base group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <ScrollReveal delay={0.2} direction="right">
            {/* No glow-blur behind the form — sharp border instead, matches hero's flat depth */}
            <form
              onSubmit={submit}
              className="relative p-8 sm:p-10 bg-surface-container border border-outline-variant"
            >
              <div className="space-y-6">
                <div className="pb-5 text-center">
                  <p className="font-label-caps text-label-caps text-primary tracking-[0.4em] font-bold mb-3">
                    PROJECT INQUIRY
                  </p>
                  <h3 className="font-display-lg text-2xl text-on-surface font-bold">
                    Contact Form
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide ml-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={update}
                      placeholder="John Doe"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={update}
                      placeholder="john@example.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative space-y-2">
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide ml-1">
                      Project Type
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={update}
                      className={`${inputClass} appearance-none cursor-pointer pr-10`}
                      required
                    >
                      <option value="" className="bg-surface">
                        Select service
                      </option>
                      <option value="youtube" className="bg-surface">
                        YouTube Editing
                      </option>
                      <option value="reels" className="bg-surface">
                        Reels / Shorts
                      </option>
                      <option value="brand" className="bg-surface">
                        Brand Video
                      </option>
                      <option value="podcast" className="bg-surface">
                        Podcast Editing
                      </option>
                      <option value="motion" className="bg-surface">
                        Motion Graphics
                      </option>
                      <option value="other" className="bg-surface">
                        Other
                      </option>
                    </select>
                    <div className="absolute bottom-4 right-4 pointer-events-none text-outline">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative space-y-2">
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide ml-1">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={update}
                      className={`${inputClass} appearance-none cursor-pointer pr-10`}
                    >
                      <option value="" className="bg-surface">
                        Select budget
                      </option>
                      <option value="500-1000" className="bg-surface">
                        $500 – $1,000
                      </option>
                      <option value="1000-2500" className="bg-surface">
                        $1,000 – $2,500
                      </option>
                      <option value="2500-5000" className="bg-surface">
                        $2,500 – $5,000
                      </option>
                      <option value="5000+" className="bg-surface">
                        $5,000+
                      </option>
                    </select>
                    <div className="absolute bottom-4 right-4 pointer-events-none text-outline">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wide ml-1">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={update}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Filled variant of GhostButton — the one emphasized CTA in this section */}
                <GhostButton
                  as={motion.button}
                  type="submit"
                  filled
                  disabled={submitted}
                  showArrow={false}
                  className="w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Sent Successfully
                    </span>
                  ) : (
                    "Send Inquiry"
                  )}
                </GhostButton>

                <p className="text-center text-outline text-xs mt-2">
                  We'll respond within 2–4 hours. No spam, ever.
                </p>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
