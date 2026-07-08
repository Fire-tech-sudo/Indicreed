import { Camera, Layers, Users, Zap } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const features = [
  {
    icon: Camera,
    title: 'Cinematic Storytelling',
    description:
      "We don't just edit clips; we structure narratives that grab attention and hold viewers until the very end.",
  },
  {
    icon: Layers,
    title: 'Technical Mastery',
    description:
      'From seamless VFX integration to frame-accurate motion graphics, our technical execution is flawless.',
  },
  {
    icon: Users,
    title: 'Client Collaboration',
    description:
      'Your vision guides our blueprint. We maintain transparent and constant communication throughout the process.',
  },
  {
    icon: Zap,
    title: 'Speed & Reliability',
    description:
      'We guarantee on-time delivery without compromising the cinematic quality your content deserves.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 px-6 relative section-glow">
      <div className="container mx-auto text-center max-w-6xl">
        <ScrollReveal direction="up">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">
            Our Competitive Edge
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white">The Indicreed Difference</h3>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }, index) => (
            <ScrollReveal key={title} direction="up" delay={index * 0.1}>
              <div className="glass-card p-8 rounded-3xl text-center h-full">
                <div className="mx-auto bg-blue-900/30 h-16 w-16 rounded-full flex items-center justify-center border border-blue-700/50">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-white mt-6">{title}</h4>
                <p className="text-gray-400 mt-2 text-sm">{description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
