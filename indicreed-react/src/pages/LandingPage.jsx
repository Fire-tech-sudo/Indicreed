import Hero from '../components/Hero.jsx'
import Portfolio from '../components/Portfolio.jsx'
import Thumbnails from '../components/Thumbnails.jsx'
import Brands from '../components/Brands.jsx'
import About from '../components/About.jsx'
import Services from '../components/Services.jsx'
import WhyUs from '../components/WhyUs.jsx'
import Contact from '../components/Contact.jsx'
import Testimonials from '../components/Testimonials.jsx'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Thumbnails />
      <Brands />
      <About />
      <Services />
      <WhyUs />
      <Testimonials />
      <Contact />
    </main>
  )
}
