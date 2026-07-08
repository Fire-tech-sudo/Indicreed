import { ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative section-glow">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
        <ScrollReveal direction="left" width="100%">
          <div className="text-left">
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Our Foundation</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-snug">
              The Vision of Aryan Sharma
            </h3>
            <p className="text-gray-400 mt-6 text-lg leading-relaxed">
              At *Indicreed Studio*, we blend raw creativity with technical expertise to transform your
              vision into stunning visual content. We specialize in cinematic editing, storytelling, and
              high-quality motion design. We work closely with our clients—from content creators to
              businesses—to ensure every project reflects their unique style and exceeds expectations in a
              world flooded with generic edits.
            </p>
            <a
              href="#services"
              className="mt-8 inline-flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              View Editing Expertise <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.2} width="100%">
          <div className="flex justify-center">
            <div className="glass-card p-8 rounded-3xl max-w-sm w-full text-center">
              <img
                loading="lazy"
                src="/indicreed_files/profile-pic-2.png"
                alt="Aryan Sharma"
                className="w-28 h-28 rounded-full mx-auto border-4 border-blue-600 object-cover shadow-lg"
              />
              <h4 className="text-2xl font-bold text-white text-center mt-4">Aryan Sharma</h4>
              <p className="text-blue-400 text-center text-sm">Founder &amp; Lead Editor</p>
              <p className="text-gray-400 text-center mt-4 text-sm italic">
                "We're not just cutting clips; we're crafting brand assets. Our mission is to make your
                content undeniable."
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
