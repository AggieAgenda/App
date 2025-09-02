// src/pages/features.jsx
export default function Features() {
  return (
    <div className=" w-screen h-screen bg-[#121212] text-white flex flex-col items-center">
      <div className="w-full max-w-5xl px-6 pb-12">
        <div className="pb-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-maroon-600 mb-2">Stay On Track</h3>
            <p className="text-gray-300">
              Integrated calendar + class schedule keeps you organized without the stress.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-maroon-600 mb-2">Never Miss a Deadline</h3>
            <p className="text-gray-300">
              Assignments, projects, and exams are tracked with reminders built in.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-maroon-600 mb-2">Find Your Community</h3>
            <p className="text-gray-300">
              Discover clubs, campus events, and career fairs — connect with Aggie life on and off campus.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-maroon-600 mb-2">Aggie Traditions</h3>
            <p className="text-gray-300">
              Track events like Midnight Yell, Muster, and more to stay connected to Aggie culture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
