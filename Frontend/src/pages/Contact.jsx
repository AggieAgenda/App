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
        <div className="w-full max-w-5xl text-center">
          <div className="mb-12">
            <h2 className="text-5xl font-extrabold text-[#305d6f] drop-shadow-md mb-6">
              Contact Us
            </h2>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <p className="text-xl text-gray-700 mb-6">
                Have questions, feedback, or ideas? We'd love to hear from you.
              </p>

              {/* Buttons */}
              <div className="flex flex-col items-center space-y-4">
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/aggieagenda" 
                  className="inline-block px-8 py-3 bg-[#305d6f] text-white text-lg rounded-lg shadow-md hover:bg-[#3c7289] transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DM us on Instagram @aggieagenda
                </a>

                {/* Discord */}
                <a 
                  href="https://discord.com/channels/1419809900594200726/1422241699047931946"
                  className="inline-block px-8 py-3 bg-[#305d6f] text-white text-lg rounded-lg shadow-md hover:bg-[#3c7289] transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask questions on our Discord
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/aggie-agenda" 
                  className="inline-block px-8 py-3 bg-[#305d6f] text-white text-lg rounded-lg shadow-md hover:bg-[#3c7289] transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect with us on LinkedIn
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="mt-175 bg-[#1a1a1a] py-6 text-center rounded-2xl">
        <p className="text-gray-400 text-center mb-4">
          Have questions, feedback, or ideas? We'd love to hear from you. Follow us on our Instagram, Discord, or LinkedIn.
        </p>
        <div className="flex justify-center space-x-6 text-lg">
          <a href="https://www.instagram.com/aggieagenda" className="text-[#f4d8aa] hover:text-white transition">Instagram</a>
          <a href="https://discord.com/channels/1419809900594200726/1422241699047931946" className="text-[#f4d8aa] hover:text-white transition">Discord</a>
          <a href="https://www.linkedin.com/company/aggie-agenda" className="text-[#f4d8aa] hover:text-white transition">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

