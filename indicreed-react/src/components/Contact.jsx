import { MessageCircle } from 'lucide-react'

const WHATSAPP = 'https://wa.me/917037311229'

const quickStarters = [
  { emoji: '🎬', label: 'Short Form Inquiry', message: "Hi, I'm interested in Short Form Editing." },
  { emoji: '📹', label: 'Long Form Quote', message: 'Hi, I need a quote for Long Form Editing.' },
  { emoji: '✨', label: 'Custom Project', message: 'Hi, I have a custom project in mind.' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="glass-card p-10 md:p-16 rounded-3xl">
          <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to Elevate Your Visuals?
          </h3>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg">
            We're open to long-term collaborations and new, high-impact projects. Reach out today and
            let's craft something truly *extraordinary*.
          </p>

          <div className="mt-10">
            <a
              href={`${WHATSAPP}?text=${encodeURIComponent("Hi Indicreed, I'm ready to elevate my visuals!")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-bold text-xl px-12 py-5 rounded-xl cta-button hover:bg-blue-500 transition-all"
            >
              <MessageCircle className="w-6 h-6 mr-3" /> Chat on WhatsApp
            </a>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
              Quick Starters
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickStarters.map((starter) => (
                <a
                  key={starter.label}
                  href={`${WHATSAPP}?text=${encodeURIComponent(starter.message)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm text-gray-300 transition-colors flex items-center hover:border-blue-500/50"
                >
                  {starter.emoji} {starter.label}
                </a>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Or contact us directly via Phone:{' '}
            <a href="tel:+917037311229" className="text-blue-400 hover:underline">
              +91 7037311229
            </a>
            <span className="mx-2 text-gray-700">|</span>
            Email:{' '}
            <a href="mailto:workindicreed@gmail.com" className="text-blue-400 hover:underline">
              workindicreed@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
