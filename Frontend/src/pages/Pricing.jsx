// src/pages/pricing.jsx
export default function Pricing() {
  return (
    <div className="min-h-screen w-screen bg-[#121212] text-white flex flex-col items-center px-6 pb-12">
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
                <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
                  Coming Soon
                </button>
              </div>
            </nav>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {/* Free Plan */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 text-center">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-gray-400 mb-6">Full access to events, calender builder, and all Aggie Agenda Features</p>
            <p className="text-4xl font-extrabold mb-6">$0</p>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ Google Calendar</li>
              <li>✔ Career Fairs and Events</li>
              <li>✔ Event Reminders</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-maroon-600 hover:bg-maroon-700 transition font-semibold">
              Coming Soon
            </button>
          </div>

          {/* Student Plan */}
          <div className="bg-maroon-600 p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Organization</h3>
            <p className="text-gray-200 mb-6">For everyday Organization who want to advertise their events on Aggie Agenda</p>
            <p className="text-4xl font-extrabold mb-6">$0</p>
            <ul className="space-y-2 text-gray-100 mb-6">
              <li>✔ Create Events</li>
              <li>✔ Track signups</li>
              <li>✔ Get more people</li>

              
              
            </ul>
            <button className="w-full py-3 rounded-lg bg-white text-maroon-600 font-semibold hover:bg-gray-100 transition">
              Coming Soon
            </button>
          </div>

          {/* Premium Plan */}
          
        </div>
      </div>
    </div>
  );
}
