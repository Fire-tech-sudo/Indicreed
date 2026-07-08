import { Eye, TrendingUp, MousePointerClick } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

function Badge({ icon: Icon, iconClass, label }) {
  return (
    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
      <Icon className={`w-3 h-3 ${iconClass}`} />
      <span>{label}</span>
    </div>
  )
}

export default function Thumbnails() {
  return (
    <section id="thumbnails" className="py-24 px-6 relative bg-black">
      <div className="container mx-auto text-center max-w-6xl">
        <ScrollReveal direction="up">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Our Work</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white">
            Crafted for Clicks &amp; Engagement
          </h3>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            We design compelling thumbnails and edit videos that don't just get seen—they get clicked.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Wide Thumbnail */}
          <div className="md:col-span-2 w-full h-full">
            <ScrollReveal direction="up" delay={0.1} width="100%">
              <div className="glass-card p-0 rounded-xl aspect-video overflow-hidden relative group h-full">
                <img
                  loading="lazy"
                  src="/indicreed_files/vibrane.jpg"
                  alt="vibrane thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <Badge icon={Eye} iconClass="text-blue-500" label="250K+ Views" />
              </div>
            </ScrollReveal>
          </div>

          {/* Tall Thumbnail 1 */}
          <ScrollReveal direction="up" delay={0.2} width="100%">
            <div className="glass-card p-0 rounded-xl aspect-[9/16] overflow-hidden relative h-full">
              <img
                loading="lazy"
                src="/indicreed_files/Gemini-Generated-Image-c4gbyfc4gbyfc4gb.jpg"
                alt="Sample Thumbnail 1 - AI Generated"
                className="w-full h-full object-cover"
              />
              <Badge icon={TrendingUp} iconClass="text-green-500" label="1.5M+ Clicks" />
            </div>
          </ScrollReveal>

          {/* Tall Thumbnail 2 */}
          <ScrollReveal direction="up" delay={0.3} width="100%">
            <div className="glass-card p-0 rounded-xl aspect-[9/16] overflow-hidden relative h-full">
              <img
                loading="lazy"
                src="/indicreed_files/FACELESS.jpg"
                alt="Sample Thumbnail 2 - Faceless Channel"
                className="w-full h-full object-cover"
              />
              <Badge icon={MousePointerClick} iconClass="text-purple-500" label="14% CTR" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
