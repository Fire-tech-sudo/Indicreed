import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 px-4 sm:px-6 bg-[#0a0a0a]">
      <div className="container mx-auto text-center text-gray-600">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-4 text-sm">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
          <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link>
          <a href="/#about" className="text-gray-400 hover:text-white transition-colors">About</a>
          <a href="/#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
          <Link to="/web-development" className="text-gray-400 hover:text-white transition-colors">Web Dev</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
          <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Login</Link>
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
          <a
            href="https://www.instagram.com/aryan_indicreed/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors hover:scale-110 transform duration-200"
            title="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>

          <a
            href="https://www.linkedin.com/company/indicreed-studios"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors hover:scale-110 transform duration-200"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>

          <a
            href="https://www.youtube.com/@Indicreed"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-red-600 transition-colors hover:scale-110 transform duration-200"
            title="YouTube"
          >
            <Youtube className="w-6 h-6" />
          </a>

          <Link
            to="/portfolio"
            className="text-gray-400 hover:text-blue-500 transition-colors ml-2 p-2 border border-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:border-blue-500"
            title="Portfolio"
          >
            <span className="text-blue-500 text-base font-extrabold leading-none cinzel-font">A</span>
          </Link>
        </div>

        <p>© 2025 INDICREED STUDIOS. All Rights Reserved. Crafted by Aryan Sharma.</p>
        <p className="text-xs mt-2">Based in MEERUT, Uttar Pradesh, INDIA</p>
      </div>
    </footer>
  )
}
