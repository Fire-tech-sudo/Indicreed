import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaEnvelope, FaVideo, FaCalendarAlt, FaClock, FaTimes } from 'react-icons/fa'
import { useApp } from '../context/AppContext'

const API_BASE = import.meta.env.VITE_BACKEND_URI;

export default function ContactPage() {
  const { addNotification } = useApp()
  const [meetForm, setMeetForm] = useState({ date: '', time: '', topic: '' })
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' })
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleMeetSubmit = async (e) => {
    e.preventDefault()
    if (!meetForm.date || !meetForm.time) {
      addNotification('error', 'Please select a date and time')
      return
    }
    
    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_BASE}/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'meet', data: meetForm })
      })
      const data = await response.json()
      if(data.success) {
        addNotification('success', 'Google Meet request sent! We will confirm shortly.')
        setMeetForm({ date: '', time: '', topic: '' })
      } else {
        addNotification('error', data.message || 'Failed to submit request')
      }
    } catch(err) {
      addNotification('error', 'Server error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!emailForm.name || !emailForm.email || !emailForm.message) {
      addNotification('error', 'Please fill all fields')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_BASE}/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'email', name: emailForm.name, email: emailForm.email, data: { message: emailForm.message } })
      })
      const data = await response.json()
      if(data.success) {
        addNotification('success', 'Email enquiry sent! We will get back to you soon.')
        setEmailForm({ name: '', email: '', message: '' })
        setShowEmailModal(false)
      } else {
        addNotification('error', data.message || 'Failed to send email')
      }
    } catch(err) {
      addNotification('error', 'Server error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsappClick = () => {
    // Optionally log click to backend
    fetch(`${API_BASE}/contact/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'whatsapp', data: { timestamp: new Date().toISOString() } })
    }).catch(console.error)
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Connect With Us</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Let's Discuss Your <span className="text-blue-500">Next Project</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose how you'd like to reach out. Whether it's a quick chat, scheduling a video call, or sending an email enquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* WhatsApp Card */}
          <motion.a
            href="https://wa.me/919897103233" 
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsappClick}
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center group cursor-pointer border border-gray-800 hover:border-green-500/50 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
              <FaWhatsapp className="text-3xl text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp Chat</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Need a quick response? Drop us a message on WhatsApp.
            </p>
            <span className="mt-auto inline-flex items-center text-green-400 font-semibold text-sm group-hover:underline">
              Chat Now &rarr;
            </span>
          </motion.a>

          {/* Email Card */}
          <motion.div
            onClick={() => setShowEmailModal(true)}
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center group cursor-pointer border border-gray-800 hover:border-blue-500/50 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <FaEnvelope className="text-3xl text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Enquiry</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Have a detailed project brief? Send us an email anytime.
            </p>
            <span className="mt-auto inline-flex items-center text-blue-400 font-semibold text-sm group-hover:underline">
              Send Form &rarr;
            </span>
          </motion.div>

          {/* Google Meet Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border border-gray-800 hover:border-purple-500/50 transition-all md:col-span-1 md:row-span-2"
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
              <FaVideo className="text-3xl text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Schedule a Meet</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Book a Google Meet session with our experts.
            </p>
            
            <form onSubmit={handleMeetSubmit} className="w-full flex flex-col gap-4 mt-auto">
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="date" 
                  value={meetForm.date}
                  onChange={(e) => setMeetForm({...meetForm, date: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 text-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  required
                />
              </div>
              <div className="relative">
                <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <select 
                  value={meetForm.time}
                  onChange={(e) => setMeetForm({...meetForm, time: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 text-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  required
                >
                  <option value="" disabled>Select Time Slot</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>
              <input 
                type="text" 
                placeholder="Topic (Optional)"
                value={meetForm.topic}
                onChange={(e) => setMeetForm({...meetForm, topic: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 text-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2"
              >
                {isSubmitting ? 'Sending...' : 'Request Meeting'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Email Enquiry Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-md p-8 rounded-2xl relative border border-gray-800"
            >
              <button 
                onClick={() => setShowEmailModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
              <h3 className="text-2xl font-bold text-white mb-6">Send an Enquiry</h3>
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 text-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Your Email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 text-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  required
                />
                <textarea 
                  placeholder="How can we help you?"
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 text-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-sm min-h-[120px] resize-none"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
