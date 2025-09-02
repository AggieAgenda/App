

// src/pages/home.jsx
export default function Home() {
  return (
    <div className=" w-screen max-w-1920 h-screen bg-[#121212] text-white flex flex-col items-center">
      <div className="w-full max-w-5xl">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
            <a href = "/">
            <h1  className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
          </a>
          <div className="space-x-6">
            <a href="/features" className="hover:text-maroon-400 transition">Features</a>
            <a href="/pricing" className="hover:text-maroon-400 transition">Pricing</a>
            <a href="/contact" className="hover:text-maroon-400 transition">Contact</a>
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
            <p className="text-lg text-gray-300 mb-6">
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
            <p className="text-gray-300">Discover clubs, campus events, and career fairs - and connect with opportunities around campus.</p>
          </div>
        </section>

        {/* Social Proof */}
        <section id="impact" className=" text-center">
          <p className="text-gray-400 ">
            
          </p>
          {/* Add icons or stats as needed */}
        </section>

        {/* Footer */}
        <section className="  bg-[#121212]  items-center text-center ">
           <div className="w-5xl " >
                <a href="https://www.instagram.com/aggieagenda">Instagram   </a>
                <a href="https://www.linkedin.com/company/aggie-agenda">LinkedIn</a>
                

                
            </div>
          © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
           
        </section>

      </div>
    </div>
  );
}
