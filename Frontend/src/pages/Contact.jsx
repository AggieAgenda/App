// src/pages/Contact.jsx
import NavBar from '../components/Navbar.jsx'

export default function Contact() {
  return (
    <div className="w-screen h-screen bg-[#121212] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-5xl">
        <nav className=" flex items-center justify-between pb-10">
            <a href = "/">
            <h1  className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
            </a>
            <div className="top-0 space-x-6">
              <a href="/features" className="hover:text-maroon-400 transition">Features</a>
              <a href="/pricing" className="hover:text-maroon-400 transition">Pricing</a>
              <a href="/contact" className="hover:text-maroon-400 transition">Contact</a>
              <a href="/FAQ" className="hover:text-maroon-400 transition">FAQ</a>
              <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
                Coming Soon
              </button>
            </div>
        </nav>
        <div classname=" text-gray-400 pb-10 items-center">
          <h2 className="text-4xl font-extrabold text-center  pb-5">Contact Us</h2>
          <a href ="https://www.instagram.com/aggieagenda"className="text-center pb-90" >
            Have questions, feedback, or ideas? We’d love to hear from you. DM us on our instagram @aggieagenda
          </a>
          

          
        </div>
        <div classname></div>
        

          
        
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
              <a 
                href="https://www.instagram.com/aggieagenda" 
                className="inline-block px-8 py-3 bg-[#305d6f] text-white text-lg rounded-lg shadow-md hover:bg-[#3c7289] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                DM us on Instagram @aggieagenda
              </a>
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
