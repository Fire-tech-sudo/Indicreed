import React, { useEffect } from 'react'

export default function PolicyPage() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Privacy <span className="text-blue-500">Policy</span>
        </h1>
        <p className="text-gray-400 mb-10 text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="glass-card p-8 md:p-12 rounded-2xl space-y-8 text-gray-300 leading-relaxed">
          {/* ========================================================== */}
          {/* ADD YOUR PRIVACY POLICY CONTENT BELOW THIS COMMENT         */}
          {/* ========================================================== */}

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to Indicreed Studios. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you, including:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
              <li>Identity Data (First name, Last name)</li>
              <li>Contact Data (Email address, Phone number)</li>
              <li>Technical Data (IP address, Browser type and version)</li>
              <li>Usage Data (Information about how you use our website)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data 
              in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To monitor the usage of our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at:{' '}
              <a href="mailto:workindicreed@gmail.com" className="text-blue-400 hover:underline">
                workindicreed@gmail.com
              </a>
            </p>
          </section>

          {/* ========================================================== */}
          {/* END OF PRIVACY POLICY CONTENT                              */}
          {/* ========================================================== */}
        </div>
      </div>
    </div>
  )
}
