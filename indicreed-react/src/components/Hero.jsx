import { MonitorPlay } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { value: "3+", label: "Years of Craft" },
  { value: "800+", label: "Short Form Edits" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "24H", label: "First Draft Speed" },
];

export default function Hero() {
  return (
    <section className="flex items-center justify-center text-center px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-20 relative overflow-hidden hero-gradient">
      <div className="z-10 max-w-6xl mx-auto">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-blue-400 mb-4">
          INDICREED STUDIOS — THE ART OF THE CUT
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight">
          Where{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Ordinary
          </span>
          <br className="hidden sm:block" />
           Becomes{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            ExtraOrdinary
          </span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-gray-400 mt-4 sm:mt-8 max-w-4xl mx-auto px-2 leading-relaxed">
          We are a dynamic video editing and motion graphics agency specializing
          in transforming raw footage into cinematic, high-impact stories that
          captivate audiences and elevate your brand presence.
        </p>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-2">
          <Link
            to="/portfolio"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg cta-button text-sm sm:text-base"
          >
            <MonitorPlay className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" /> View Our
            Portfolio
          </Link>
          <a
            href="#contact"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors glass-card text-sm sm:text-base"
          >
            Get a Free Quote
          </a>
        </div>

        <motion.div
          className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto border-t border-b border-gray-800 py-4 sm:py-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="text-center"
            >
              <p className="text-2xl sm:text-4xl font-extrabold text-blue-400">
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
