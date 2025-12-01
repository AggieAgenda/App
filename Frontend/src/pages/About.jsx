// src/pages/About.jsx
import NavBar from '../components/Navbar.jsx'

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[white] to-white text-[#1a1a1a]">
      
      {/* --- Background Animation --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating gradient blobs */}
        <div className="absolute w-72 h-72 bg-[#305d6f] rounded-full filter blur-3xl opacity-30 animate-float1 top-10 left-20"></div>
        <div className="absolute w-96 h-96 bg-[#f4d8aa] rounded-full filter blur-3xl opacity-40 animate-float2 bottom-20 right-10"></div>
        <div className="absolute w-64 h-64 bg-[#3c7289] rounded-full filter blur-3xl opacity-25 animate-float3 top-1/3 right-1/3"></div>
      </div>

      {/* --- Navbar --- */}
      <NavBar />

      {/* --- About Content --- */}
      <section className="flex flex-col items-center justify-center px-10 md:px-20 py-20 max-w-7xl mx-auto w-full flex-grow">
        <div className="w-full max-w-5xl text-center">
          <div className="mb-12">
            <h2 className="text-5xl font-extrabold text-[var(--maroon)] drop-shadow-md mb-6">
              About Us
            </h2>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <p className="text-xl text-gray-700 leading-relaxed">
                Aggie Agenda is a web app built to help Texas A&M students with their time management. 
                We understand the challenges of balancing academics, social life, and campus traditions. 
                Our mission is to provide a unified platform where all your important dates, deadlines, 
                and events come together in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="w-full bg-[var(--secondary-color)] text-white py-6 text-center mt-auto">
        <div className="space-x-4 mb-2">
          <a href="https://instagram.com/aggieagenda" className="hover:text-[#f4d8aa]">Instagram</a>
          <a href="https://linkedin.com/company/aggie-agenda" className="hover:text-[#f4d8aa]">LinkedIn</a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
