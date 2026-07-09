import React from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  { name: "Alex Hormon", role: "Content Creator", text: "Indicreed Studio completely transformed our YouTube channel. The pacing and cinematic cuts are unmatched!" },
  { name: "Michael T.", role: "Marketing Director", text: "Working with them was a breeze. They understood our brand vision perfectly and delivered stunning ad creatives." },
  { name: "Emma R.", role: "Social Media Manager", text: "The short-form reels they edited helped us go viral and increased our engagement by 40%. Highly recommended!" },
  { name: "David L.", role: "Film Director", text: "Professional, creative, and timely. Best video editing agency we've ever worked with. The sound design is crazy." },
  { name: "Olivia W.", role: "Podcast Host", text: "They edited our podcast from scratch, adding brilliant motion graphics that kept viewers hooked. Great team!" },
  { name: "James M.", role: "Indie Artist", text: "Their color grading work gave our music videos the premium cinematic feel we needed. Worth every penny." },
  { name: "Sophia P.", role: "Agency Head", text: "Superb communication and exceptional rendering speed. We will definitely hire them again for our next campaign." },
  { name: "Robert K.", role: "Fitness Influencer", text: "From raw footage to the final polished cut, Indicreed was there at every step. A truly dedicated team of editors." }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 mb-12 text-center relative z-10">
        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Testimonials</h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">
          What Our <span className="text-blue-500">Clients Say</span>
        </h3>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-6">
        {/* Transparent fading edges */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex relative w-[200%] md:w-[150%]">
          <motion.div
            className="flex gap-6 px-3"
            animate={{ x: [0, "-50%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          >
            {/* Duplicated array for seamless infinite scroll */}
            {[...testimonials, ...testimonials].map((t, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl w-[320px] md:w-[400px] flex-shrink-0 border border-gray-800 hover:border-gray-700 transition-colors relative">
                <FaQuoteLeft className="text-4xl text-blue-500/10 absolute top-6 right-6" />
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-sm" />)}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <span className="text-blue-400 text-sm">{t.role}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
