// src/pages/pricing.jsx
export default function Pricing() {
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
      </div>
    </div>
  );
}
