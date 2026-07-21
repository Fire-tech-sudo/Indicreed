import { Helmet } from 'react-helmet-async'
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
      <Helmet>
        <title>INDICREED STUDIOS | Cinematic Video Editing & Motion Graphics Agency</title>
        <meta name="description" content="INDICREED STUDIOS is a cinematic video editing and motion graphics agency specializing in high-impact short-form and YouTube content. Based in Meerut, India." />
        <meta name="keywords" content="video editing agency, cinematic video production, motion graphics, short form video editor, YouTube editing services, content creation" />
        <meta property="og:title" content="INDICREED STUDIOS | Cinematic Video Editing & Motion Graphics Agency" />
        <meta property="og:description" content="We transform ordinary footage into extraordinary, high-impact videos for creators and businesses. Specialized in short-form content and YouTube editing." />
        <meta name="twitter:title" content="INDICREED STUDIOS | Cinematic Video & Motion Graphics" />
        <meta name="twitter:description" content="We transform ordinary footage into extraordinary, high-impact videos for creators and businesses. Specialized in short-form content and YouTube editing." />
      </Helmet>
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
