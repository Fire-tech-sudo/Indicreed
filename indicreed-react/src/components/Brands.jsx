import { motion } from 'framer-motion';

// ==========================================
// ADD YOUR NEW BRANDS HERE (FLEXIBLE ARRAY)
// ==========================================
const brands = [
  { id: 1, href: 'https://imgbb.com/', src: '/indicreed_files/logo.png', alt: 'Brand Logo 1' },
  { id: 2, href: 'https://ibb.co/TxVcgcHL', src: '/indicreed_files/Tern-logo-01.png', alt: 'Tern Brand Logo' },
  { id: 3, href: 'https://imgbb.com/', src: '/indicreed_files/Logo-T-3.png', alt: 'Brand Logo 3' },
  { id: 4, href: 'https://ibb.co/9m78kv0M', src: '/indicreed_files/ROTARYLOGOWITH-WHEEL.png', alt: 'Rotary Brand Logo' },
  // Added 5 new generic/placeholder brands for you to replace
  { id: 5, href: '#', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', alt: 'Google' },
  { id: 6, href: '#', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', alt: 'Amazon' },
  { id: 7, href: '#', src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', alt: 'Netflix' },
  { id: 8, href: '#', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg', alt: 'YouTube' },
  { id: 9, href: '#', src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', alt: 'IBM' },
]

export default function Brands() {
  // We duplicate the array to create a seamless infinite marquee effect
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section
      id="brands"
      className="py-24 relative bg-gradient-to-b from-black to-[#0a0a0a] border-t border-gray-900 overflow-hidden"
    >
      <div className="container mx-auto text-center max-w-6xl px-6 mb-12">
        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Trusted Partners</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-white">Brands We Work With</h3>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
          Collaborating with visionary creators and companies to tell their stories.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        {/* Gradient fades on left and right for smooth entry/exit */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-10 whitespace-nowrap px-5"
          // Left to right movement: starts at -50% and moves to 0%
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            ease: 'linear',
            duration: 30, // Adjust this to make it faster/slower
            repeat: Infinity,
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <a
              key={`${brand.id}-${index}`}
              href={brand.href}
              target="_blank"
              rel="noreferrer"
              className="brand-item flex-shrink-0 flex items-center justify-center h-32 w-56 p-6 group cursor-pointer"
            >
              <img 
                loading="lazy" 
                src={brand.src} 
                alt={brand.alt} 
                className="max-h-full max-w-full object-contain" 
              />
            </a>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto text-center max-w-6xl px-6">
        <div className="mt-16 inline-flex items-center space-x-3 p-1 pl-1 pr-4 bg-gray-900/50 rounded-full border border-gray-800 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
          <div className="flex -space-x-2 overflow-hidden pl-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-black" />
            <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black" />
            <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-black" />
          </div>
          <p className="text-gray-400 text-sm font-medium">
            Join <span className="text-white">50+ creators</span> who trust Indicreed.
          </p>
        </div>
      </div>
    </section>
  )
}
