// src/pages/About.jsx
import NavBar from '../components/Navbar.jsx'

export default function About() {
  return (
    <div className="min-h-screen w-screen bg-[#121212] text-black flex flex-col items-center px-6 pb-12">
        <div max-w-5xl>
        {/*<h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">Simple Pricing</h2>*/}
        <div className="pb-10 w-5xl">
            <nav className="flex items-center justify-between py-6">
                <a href = "/">
                <h1  className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
              </a>
              <div className="space-x-6">
                <a href="/features" className="hover:text-maroon-400 transition">Features</a>
                <a href="/pricing" className="hover:text-maroon-400 transition">Pricing</a>
                <a href="/contact" className="hover:text-maroon-400 transition">Contact</a>
                <a href="/FAQ" className="hover:text-maroon-400 transition">FAQ</a>
                <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
                  Coming Soon
                </button>
              </div>
            </nav>
          <div>
            {/*About text */}
            <p>
              Aggie Agenda is an web app built to help Texas A&M students with their time management
            </p>
          </div>
            
          
          
        </div>
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#f4d8aa] to-white text-[#1a1a1a]">
      
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
            <h2 className="text-5xl font-extrabold text-[#305d6f] drop-shadow-md mb-6">
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
      <footer className="w-full bg-[#305d6f] text-white py-6 text-center mt-auto">
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
