// src/pages/Contact.jsx
import NavBar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Contact() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <NavBar />

      <section className="flex-grow flex flex-col items-center justify-center px-10 py-20">
        <div className="max-w-3xl w-full text-center">
          {/* Header */}
          <h1 className="text-5xl font-extrabold text-red-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Have questions or need help? We're here for you.
          </p>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl shadow-xl p-10 mb-8">
            <div className="space-y-8">
              {/* Email Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  📧 Email Us
                </h2>
                <p className="text-gray-600 mb-3">
                  For support, questions, or feedback:
                </p>
                <a 
                  href="mailto:support@aggieagenda.com"
                  className="text-2xl font-semibold text-red-900 hover:text-red-700 transition-colors"
                >
                  support@aggieagenda.com
                </a>
              </div>

              <div className="border-t border-gray-200"></div>

              {/* Social Media Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Follow Us
                </h2>
                <div className="flex justify-center gap-8">
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/aggieagenda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-red-900 transition-colors">
                      Instagram
                    </span>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/company/aggie-agenda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-red-900 transition-colors">
                      LinkedIn
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time Notice */}
          <p className="text-gray-600">
            We typically respond within 24 hours during business days.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}