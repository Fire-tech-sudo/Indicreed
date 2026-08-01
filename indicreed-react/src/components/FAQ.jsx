import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer cinematic video editing, YouTube channel management, motion graphics, color grading, and now premium web development services. Everything you need to elevate your brand visually."
  },
  {
    question: "How long does a video project take?",
    answer: "Turnaround times vary based on complexity. A standard YouTube video typically takes 2-4 days, while a cinematic brand commercial or documentary might take 3-6 weeks from concept to final delivery."
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes! We want you to be 100% satisfied. You get 2 free revisions to ensure the final product perfectly matches your vision. After that, any additional edits will be charged at ₹500 per edit."
  },
  {
    question: "What are your web development packages?",
    answer: "We offer Starter (₹4,999), Professional (₹14,999), and Enterprise (Custom) packages. You can check the Web Dev page for detailed breakdowns of what each package includes."
  },
  {
    question: "How do we get started?",
    answer: "Simply reach out via the contact form below or hit the WhatsApp button! We'll set up a quick discovery call to understand your needs and give you a custom quote."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 mt-8 mb-4 px-4 sm:px-6 relative bg-black border-t border-gray-900">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <MessageCircleQuestion className="w-4 h-4" /> Got Questions?
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-400 mt-4 text-lg mb-4">
            Everything you need to know about working with Indicreed Studios.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.1}>
              <div 
                className={`glass-card rounded-2xl overflow-hidden border transition-colors duration-300 ${
                  openIndex === index ? 'border-blue-500/50 bg-gray-900/80' : 'border-gray-800 hover:border-gray-700 bg-gray-900/30'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <div 
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-900/30 text-blue-400 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 bg-blue-600 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-gray-800/50 mt-2 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
