import ScrollReveal from './ScrollReveal'

const WHATSAPP = 'https://wa.me/917037311229'

const shortFormPackages = [
  {
    name: 'BASIC CUT',
    turnaround: 'Standard Turnaround: 4 Days',
    features: [
      'Basic Cuts & Trims, Silence Removal',
      'Simple Transitions & B-Roll integration',
      'Audio Cleanup & Music Overlay',
      'Basic Color Correction (LUTS)',
    ],
    cta: 'Inquire Now',
    message: "Hi, I'm interested in the Basic Cut Short Form Package.",
  },
  {
    name: 'INTERMEDIATE PRO',
    turnaround: 'Standard Turnaround: 4 Days',
    popular: true,
    features: [
      { text: '✓ All Basic Features', highlight: true },
      'Dynamic Zoom & Advanced Transitions',
      { text: 'Professional Color Grading', highlightWords: 'Color Grading' },
      'Custom Animated Captions & Titles',
      'Basic Motion Graphics (lower thirds)',
    ],
    cta: 'Start This Package',
    message: "Hi, I'm interested in the Intermediate Pro Short Form Package.",
  },
  {
    name: 'CINEMATIC MASTER',
    turnaround: 'Standard Turnaround: 7 Days',
    features: [
      { text: '✓ All Intermediate Features', highlight: true },
      'Complex VFX, Green Screen Keying',
      'Full Sound Design & Mixing',
      { text: 'Script & Story Structure Enhancement', highlightWords: 'Script & Story Structure' },
      'Advanced Motion Tracking & Graphics',
    ],
    cta: 'Inquire Now',
    message: "Hi, I'm interested in the Cinematic Master Short Form Package.",
  },
]

const longFormPackages = [
  {
    name: 'Basic',
    turnaround: '4-Day Turnaround',
    dashed: true,
    features: ['Basic Cuts & Timelines', 'Audio Sync & Noise Reduction', 'Simple Intro/Outro', 'Standard Export'],
    message: "Hi, I'd like a custom quote for Basic Long Form Editing.",
  },
  {
    name: 'Intermediate',
    turnaround: '4-Day Turnaround',
    dashed: true,
    features: ['Advanced Cuts & Pacing', 'Color Grading', 'Text/Subtitle Overlays', 'Basic B-Roll Integration'],
    message: "Hi, I'd like a custom quote for Intermediate Long Form Editing.",
  },
  {
    name: 'Advanced',
    turnaround: '7-Day Turnaround',
    features: ['Cinematic Grading & VFX', 'Full Storytelling Structure', 'Custom Motion Graphics', 'Advanced Sound Mixing'],
    message: "Hi, I'd like a custom quote for Advanced Long Form Editing.",
  },
]

function waLink(message) {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`
}

function FeatureItem({ feature }) {
  if (typeof feature === 'string') return <li>{feature}</li>
  if (feature.highlight) {
    return (
      <li>
        <strong className="text-blue-300">{feature.text}</strong>
      </li>
    )
  }
  const [before, after] = feature.text.split(feature.highlightWords)
  return (
    <li>
      {before}
      <strong className="text-blue-300">{feature.highlightWords}</strong>
      {after}
    </li>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 bg-black">
      <div className="container mx-auto text-center max-w-6xl">
        <ScrollReveal direction="up">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">
            Our Creative Arsenal
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Customized Video Editing Packages
          </h3>
        </ScrollReveal>

        {/* Short Form */}
        <div className="mt-16">
          <ScrollReveal direction="up">
            <h4 className="text-xl sm:text-3xl font-bold text-white mb-10 border-b border-gray-800 pb-4 inline-block">
              Short Form Editing (Reels, Shorts, TikTok)
            </h4>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shortFormPackages.map((pkg, index) => (
              <ScrollReveal key={pkg.name} direction="up" delay={index * 0.1}>
                <div
                  className={`glass-card p-6 sm:p-8 rounded-3xl text-left flex flex-col h-full ${
                    pkg.popular ? 'ring-2 ring-blue-500 relative bg-blue-900/10' : ''
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute top-0 right-8 -mt-4 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg transform rotate-2">
                      MOST POPULAR
                    </span>
                  )}
                  <h5 className="text-2xl font-bold text-white">{pkg.name}</h5>
                  <p className="text-sm text-gray-500 mt-2 mb-6">{pkg.turnaround}</p>
                  <ul className="text-gray-300 flex-grow list-style-check text-sm">
                    {pkg.features.map((feature, i) => (
                      <FeatureItem key={i} feature={feature} />
                    ))}
                  </ul>
                  <a
                    href={waLink(pkg.message)}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-8 text-center w-full px-6 py-3 font-semibold rounded-xl transition-colors ${
                      pkg.popular
                        ? 'bg-blue-600 text-white font-bold hover:bg-blue-500 cta-button'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {pkg.cta}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Long Form */}
        <div className="mt-20">
          <ScrollReveal direction="up">
            <h4 className="text-xl sm:text-3xl font-bold text-white mb-10 border-b border-gray-800 pb-4 inline-block">
              Long Form Editing (YouTube, Corporate, Vlogs)
            </h4>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {longFormPackages.map((pkg, index) => (
              <ScrollReveal key={pkg.name} direction="up" delay={index * 0.1}>
                <div
                  className={`glass-card p-6 sm:p-8 rounded-3xl text-left flex flex-col h-full ${
                    pkg.dashed ? 'border-dashed border-gray-700' : ''
                  }`}
                >
                  <h5 className="text-2xl font-bold text-white">{pkg.name}</h5>
                  <p className="text-sm text-gray-500 mt-2 mb-6">{pkg.turnaround}</p>
                  <ul className="text-gray-300 flex-grow list-style-check text-sm">
                    {pkg.features.map((feature, i) => (
                      <FeatureItem key={i} feature={feature} />
                    ))}
                  </ul>
                  <a
                    href={waLink(pkg.message)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 text-center w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Custom Quote
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-base sm:text-xl font-semibold text-blue-400 mt-10">
            Long Form Editing is currently <span className="underline">Quote-Based Only</span>. Please
            contact us directly for an accurate estimate.
          </p>
        </div>
      </div>
    </section>
  )
}
