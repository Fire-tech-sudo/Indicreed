import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Globe, ShoppingCart, Rocket, Layout, Briefcase, Code2,
  Zap, Smartphone, Search, Headphones, FileCode, IndianRupee,
  MessageCircle, Lightbulb, Palette, Wrench, Send,
  ChevronRight, CheckCircle2, ArrowRight
} from 'lucide-react'

const WHATSAPP = 'https://wa.me/917037311229'
function waLink(message) {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`
}

// ── Services Data ──
const webServices = [
  { icon: Globe, title: 'Custom Websites', desc: 'Bespoke, hand-crafted websites tailored to your brand identity with pixel-perfect precision.' },
  { icon: ShoppingCart, title: 'E-Commerce Stores', desc: 'Shopify, WooCommerce & custom stores with seamless checkout and inventory management.' },
  { icon: Rocket, title: 'Landing Pages', desc: 'High-converting, fast-loading landing pages designed to maximize your campaign ROI.' },
  { icon: Layout, title: 'Web Applications', desc: 'Full-stack SaaS platforms, dashboards & custom web apps with modern architecture.' },
  { icon: Briefcase, title: 'Portfolio Sites', desc: 'Stunning portfolio websites that showcase your work and attract premium clients.' },
  { icon: Code2, title: 'WordPress Development', desc: 'Custom themes, plugins & headless WordPress solutions for content-driven sites.' },
]

// ── Tech Stack Data ──
const techStack = [
  { category: 'Frontend', techs: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'TypeScript'] },
  { category: 'Backend', techs: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs'] },
  { category: 'Database', techs: ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis'] },
  { category: 'CMS', techs: ['WordPress', 'Shopify', 'Strapi', 'Sanity'] },
  { category: 'DevOps', techs: ['Vercel', 'AWS', 'Docker', 'GitHub Actions'] },
]

// ── Pricing Data ──
const pricingPlans = [
  {
    name: 'Starter',
    subtitle: 'For personal & small business sites',
    price: '₹4,999',
    priceNote: 'Starting from',
    turnaround: '5-7 Days',
    features: [
      'Single Page / Landing Page',
      'Mobile Responsive Design',
      'Basic SEO Setup',
      'Contact Form Integration',
      '1 Round of Revision',
    ],
    message: "Hi, I'm interested in the Starter Web Development Package.",
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    subtitle: 'For growing businesses',
    price: '₹14,999',
    priceNote: 'Starting from',
    turnaround: '10-14 Days',
    popular: true,
    features: [
      'Up to 5 Pages',
      'Custom UI/UX Design',
      'Advanced SEO & Analytics',
      'CMS Integration',
      'Social Media Integration',
      '3 Rounds of Revisions',
    ],
    message: "Hi, I'm interested in the Professional Web Development Package.",
    cta: 'Start This Package',
  },
  {
    name: 'Enterprise',
    subtitle: 'For businesses & startups',
    price: 'Custom',
    priceNote: 'Quote-based',
    turnaround: '3-4 Weeks',
    features: [
      'Unlimited Pages',
      'Custom Web Application',
      'E-Commerce Integration',
      'Payment Gateway Setup',
      'Admin Dashboard',
      'Priority Support & Maintenance',
    ],
    message: "Hi, I'm interested in the Enterprise Web Development Package.",
    cta: 'Get Custom Quote',
  },
]

// ── Process Steps ──
const processSteps = [
  { icon: Lightbulb, title: 'Discovery & Planning', desc: 'We dive deep into your requirements, target audience, and business goals to create a solid blueprint.' },
  { icon: Palette, title: 'Design & Prototype', desc: 'Wireframes and high-fidelity UI mockups crafted to perfection before a single line of code is written.' },
  { icon: Wrench, title: 'Development & Testing', desc: 'Clean, modular code with rigorous QA testing across devices and browsers for flawless execution.' },
  { icon: Send, title: 'Launch & Support', desc: 'Smooth deployment with ongoing maintenance, updates, and priority support post-launch.' },
]

// ── Why Choose Us ──
const whyUs = [
  { icon: Zap, title: 'Fast Delivery', desc: 'Lightning-fast turnaround without compromising on quality or attention to detail.' },
  { icon: Smartphone, title: '100% Responsive', desc: 'Every pixel adapts perfectly across mobile, tablet, and desktop screens.' },
  { icon: Search, title: 'SEO Optimized', desc: 'Built-in SEO best practices to help your site rank higher on Google from day one.' },
  { icon: Headphones, title: 'Post-Launch Support', desc: 'Dedicated support and maintenance to keep your site running smoothly after launch.' },
  { icon: FileCode, title: 'Clean Code', desc: 'Well-structured, documented, and scalable codebase you can build upon.' },
  { icon: IndianRupee, title: 'Affordable Pricing', desc: 'Premium quality web development at prices that won\'t break the bank.' },
]

// ── Animation Variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function WebDevPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <main className="overflow-x-hidden">
      <Helmet>
        <title>Web Development Services | INDICREED STUDIOS</title>
        <meta name="description" content="Custom website development, e-commerce stores, and high-converting landing pages by INDICREED STUDIOS. Affordable pricing, fast delivery, and premium design." />
        <meta name="keywords" content="web development, website design, e-commerce development, landing pages, custom websites, INDICREED STUDIOS" />
      </Helmet>
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[200px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-blue-400 mb-4"
          >
            INDICREED STUDIOS — WEB DEVELOPMENT
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight"
          >
            We Build Websites{' '}
            <br className="hidden sm:block" />
            That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              Convert
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-lg md:text-xl text-gray-400 mt-6 sm:mt-8 max-w-3xl mx-auto px-2 leading-relaxed"
          >
            From stunning landing pages to full-scale web applications — we craft
            high-performance, responsive digital experiences that drive results
            and elevate your brand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
          >
            <a
              href={waLink("Hi, I'm interested in Web Development services from Indicreed Studios.")}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg cta-button text-sm sm:text-base inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Get a Free Quote
            </a>
            <Link
              to="/portfolio?filter=Web%20Development"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors glass-card text-sm sm:text-base inline-flex items-center justify-center gap-2"
            >
              View Portfolio <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto border-t border-b border-gray-800 py-4 sm:py-6"
          >
            {[
              { value: '50+', label: 'Websites Delivered' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: '48H', label: 'First Draft Speed' },
              { value: '24/7', label: 'Support Available' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={cardVariant} className="text-center">
                <p className="text-2xl sm:text-4xl font-extrabold text-blue-400">{stat.value}</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES GRID
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative section-glow">
        <div className="container mx-auto text-center max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">What We Build</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Web Development Services
            </h3>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-lg">
              End-to-end web solutions crafted with modern technologies and a keen eye for design.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {webServices.map((service) => (
              <motion.div
                key={service.title}
                variants={cardVariant}
                className="glass-card p-6 sm:p-8 rounded-3xl text-left group"
              >
                <div className="bg-blue-900/30 h-14 w-14 rounded-2xl flex items-center justify-center border border-blue-700/50 group-hover:bg-blue-800/40 transition-colors">
                  <service.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-white mt-5">{service.title}</h4>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TECH STACK
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black">
        <div className="container mx-auto text-center max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Our Arsenal</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Technologies We Use
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            variants={stagger}
            className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {techStack.map((stack) => (
              <motion.div
                key={stack.category}
                variants={cardVariant}
                className="glass-card p-6 rounded-2xl text-left"
              >
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {stack.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {stack.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-blue-950/50 text-blue-300 border border-blue-800/40 rounded-lg hover:border-blue-500/60 hover:bg-blue-900/40 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING PACKAGES
      ═══════════════════════════════════════════ */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 relative section-glow">
        <div className="container mx-auto text-center max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Transparent Pricing</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Web Development Packages
            </h3>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-lg">
              Choose the plan that fits your project. Every package includes responsive design & clean code.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={cardVariant}
                className={`glass-card p-6 sm:p-8 rounded-3xl text-left flex flex-col h-full relative ${
                  plan.popular ? 'ring-2 ring-blue-500 bg-blue-900/10' : ''
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-6 sm:right-8 -mt-4 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                )}

                <h4 className="text-2xl font-bold text-white">{plan.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{plan.subtitle}</p>

                <div className="mt-5 mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{plan.priceNote}</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-blue-400 mt-1">{plan.price}</p>
                  <p className="text-sm text-gray-500 mt-1">Turnaround: {plan.turnaround}</p>
                </div>

                <ul className="flex-grow space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(plan.message)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-auto text-center w-full px-6 py-3 font-semibold rounded-xl transition-colors block ${
                    plan.popular
                      ? 'bg-blue-600 text-white font-bold hover:bg-blue-500 cta-button'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR PROCESS
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">How We Work</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Our Development Process
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="mt-12 sm:mt-16 relative"
          >
            {/* Vertical connector line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 via-blue-500/20 to-transparent -translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={cardVariant}
                  className={`flex flex-col md:flex-row items-center gap-4 sm:gap-6 ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}>
                    <div className={`glass-card p-6 sm:p-8 rounded-2xl inline-block text-left w-full`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-600/20 h-10 w-10 rounded-xl flex items-center justify-center border border-blue-600/40">
                          <step.icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Step {index + 1}</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white">{step.title}</h4>
                      <p className="text-gray-400 mt-2 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 border-4 border-black shadow-lg shadow-blue-600/20 flex-shrink-0 z-10">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY CHOOSE US
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative section-glow">
        <div className="container mx-auto text-center max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Why Indicreed</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              The Indicreed Advantage
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {whyUs.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariant}
                className="glass-card p-6 sm:p-8 rounded-3xl text-center"
              >
                <div className="mx-auto bg-blue-900/30 h-14 w-14 rounded-full flex items-center justify-center border border-blue-700/50">
                  <item.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-white mt-5">{item.title}</h4>
                <p className="text-gray-400 mt-2 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA / CONTACT
      ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card p-6 sm:p-10 md:p-16 rounded-3xl"
          >
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Ready to Build Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Dream Website
              </span>
              ?
            </h3>
            <p className="text-gray-400 mt-6 max-w-xl mx-auto text-sm sm:text-lg">
              Let's turn your vision into a stunning, high-performance website.
              Get in touch today for a free consultation and quote.
            </p>

            <div className="mt-8 sm:mt-10">
              <a
                href={waLink("Hi Indicreed, I want to build a website! Let's discuss.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 text-white font-bold text-base sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-xl cta-button hover:bg-blue-500 transition-all gap-3"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500">
              <a href="tel:+917037311229" className="text-blue-400 hover:underline flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> +91 7037311229
              </a>
              <a href="mailto:workindicreed@gmail.com" className="text-blue-400 hover:underline flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> workindicreed@gmail.com
              </a>
            </div>

            <p className="mt-6 text-xs text-gray-600">
              Also check out our{' '}
              <Link to="/" className="text-blue-400 hover:underline">
                Video Editing Services
              </Link>{' '}
              — cinematic edits that captivate.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
