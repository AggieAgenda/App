// src/pages/Home.jsx
import homeImage from '../assets/home_Image.png'
import NavBar from '../components/Navbar.jsx'


const handleGoogleLogin = () => {
  console.log("accessing http")
  window.location.href = 'http//localhost:8000/accounts/google/login/';
}


export default function Home() {
  return (
    <div className=" w-screen max-w-1920 h-screen bg-[#f4d7a9] text-black flex flex-col items-center">
      <div className="w-full max-w-5xl">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
            <a href = "/">
            <h1  className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
          </a>
          <div className="space-x-6">
            <a href="/features" className="hover:text-maroon-400 transition">Features</a>
            <a href="/contact" className="hover:text-maroon-400 transition">Contact</a>
            <a href="/about" className="hover:text-maroon-400 transition">About</a>

            <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
              Coming Soon
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="flex flex-col lg:flex-row items-center gap-8 py-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Organize Your Day 
            </h2>
            <p className="text-lg text-black-300 mb-6">
              Aggie Agenda helps you stay on top of your classes, clubs, and events by putting them in your google calender
            </p>
            <button className="px-6 py-3 bg-maroon-600 hover:bg-maroon-700 rounded-2xl font-semibold transition">
              Coming Soon !
            </button>
          </div>
          <div className="flex-1">
            {/* Placeholder for image or illustration */}
            <div className="w-full h-64 bg-gray-800 rounded-lg" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-12">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-maroon-600">Stay on Track</h3>
            <p className="text-gray-300">Integrated calendar + class schedule keeps you organized without the stress.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-maroon-600">Never Miss a Deadline</h3>
            <p className="text-gray-300">Assignments, projects, and exams are all tracked in your google calender </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-maroon-600">Contact & Collaborate</h3>
            <p className="">Discover clubs, campus events, and career fairs - and connect with opportunities around campus.</p>
          </div>
        </section>

      {/* --- Features Section --- */}
      <section id="features" className="flex flex-col items-center text-center py-16 px-6 bg-[#f0e1c1]/70 w-full backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-[#305d6f] mb-6">
          One shot your calendar
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-10">
          Sync all your academic events from multiple platforms into one clean, unified view. Never miss a deadline again.
        </p>
        <button onClick = {handleGoogleLogin} className="px-8 py-3 bg-[#305d6f] text-white text-lg rounded-lg shadow-md hover:bg-[#3c7289] transition">
          Coming Soon
        </button>
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

      {/* --- Custom Animation Keyframes --- */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(25px) translateX(-30px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(40px); }
        }
      `}</style>
    </div>
  );
}
