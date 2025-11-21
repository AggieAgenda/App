// src/pages/Contact.jsx
import NavBar from '../components/Navbar.jsx'

export default function Contact() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#f4d8aa] to-white text-[#1a1a1a]">
      
      {/* --- Background Animation --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 h-72 bg-[#305d6f] rounded-full filter blur-3xl opacity-30 animate-float1 top-10 left-20"></div>
        <div className="absolute w-96 h-96 bg-[#f4d8aa] rounded-full filter blur-3xl opacity-40 animate-float2 bottom-20 right-10"></div>
        <div className="absolute w-64 h-64 bg-[#3c7289] rounded-full filter blur-3xl opacity-25 animate-float3 top-1/3 right-1/3"></div>
      </div>

      {/* --- Navbar --- */}
      <NavBar />

      {/* --- Contact Content --- */}
      <section className="flex flex-col items-center justify-center px-10 md:px-20 py-20 max-w-7xl mx-auto w-full flex-grow">
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-5xl font-extrabold text-[#305d6f] drop-shadow-md mb-4">
            Contact Us
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#305d6f] to-[#f4d8aa] mx-auto mb-10 rounded-full"></div>

          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-[#f4d8aa]/40 text-center">
            <p className="text-lg text-gray-700 mb-8">
              Have questions, feedback, or ideas? We'd love to hear from you.
            </p>

            <div className="flex flex-col items-center space-y-4">
              
              {/* Instagram Button */}
              <a 
                href="https://www.instagram.com/aggieagenda" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-[#E1306C] text-white text-lg rounded-lg shadow-md hover:bg-[#C13584] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M7.5 2A5.5 5.5 0 002 7.5v9A5.5 5.5 0 007.5 22h9a5.5 5.5 0 005.5-5.5v-9A5.5 5.5 0 0016.5 2h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm6.75-.75a1 1 0 110 2 1 1 0 010-2zM12 9a3 3 0 100 6 3 3 0 000-6z"/>
                </svg>
                DM us on Instagram
              </a>

              {/* Discord Button */}
              <a 
                href="https://discord.com/channels/1419809900594200726/1422241699047931946"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-[#5865F2] text-white text-lg rounded-lg shadow-md hover:bg-[#4752C4] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.317 4.369A19.791 19.791 0 0016.557 3c-.208.369-.443.86-.608 1.25a18.27 18.27 0 00-7.9 0A12.3 12.3 0 007.44 3a19.736 19.736 0 00-3.76 1.37C1.46 9.022.662 13.563 1.11 18.034a19.919 19.919 0 005.963 2.926c.482-.66.91-1.363 1.276-2.104a12.958 12.958 0 01-2.025-.97c.169-.122.335-.247.497-.375 3.935 1.838 8.191 1.838 12.084 0 .162.128.328.253.497.375-.642.379-1.321.703-2.025.97.366.74.794 1.444 1.276 2.104a19.9 19.9 0 005.963-2.926c.49-5.065-.843-9.556-3.299-13.665zM9.5 15.5c-.986 0-1.785-.9-1.785-2s.799-2 1.785-2 1.785.9 1.785 2-.799 2-1.785 2zm5 0c-.986 0-1.785-.9-1.785-2s.799-2 1.785-2 1.785.9 1.785 2-.799 2-1.785 2z"/>
                </svg>
                Ask questions on our Discord
              </a>

              {/* LinkedIn Button */}
              <a 
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-[#0077B5] text-white text-lg rounded-lg shadow-md hover:bg-[#005582] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.24 8h4.52v13.5H.24V8zM8.62 8h4.33v1.84h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 2.97 5.39 6.83v7.17h-4.52v-6.36c0-1.52-.03-3.48-2.12-3.48-2.13 0-2.46 1.66-2.46 3.37v6.47H8.62V8z"/>
                </svg>
                Connect with us on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

