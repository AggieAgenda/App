// src/pages/Event2.jsx
export default function Event2() {
  const events = [
    {
      title: "Lunar Festival",
      image: "/lunar_festival.jpg",
      description: "Experience colorful lanterns, traditional dances, and mooncakes during this cultural celebration of the full moon.",
    },
    {
      title: "Tech Innovators Summit",
      image: "/tech_summit.jpg",
      description: "A global conference where engineers, developers, and entrepreneurs showcase groundbreaking technologies.",
    },
    {
      title: "Mountain Marathon",
      image: "/mountain_marathon.jpg",
      description: "Test endurance and determination on a scenic trail marathon across rugged mountain landscapes.",
    },
    {
      title: "Ocean Cleanup Day",
      image: "/ocean_cleanup.jpg",
      description: "Join volunteers worldwide in removing plastic waste and protecting marine life from pollution.",
    },
    {
      title: "Film Noir Festival",
      image: "/film_noir.jpg",
      description: "Celebrate classic and modern noir films with live panels, screenings, and interactive experiences.",
    },
    {
      title: "Art in the Park",
      image: "/art_in_park.jpg",
      description: "A day of creativity featuring local artists, live painting, and community workshops in the open air.",
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-[#321212] text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full max-w-5xl flex items-center justify-between py-6 px-6">
        <a href="/">
          <h1 className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
        </a>
        <div className="space-x-6">
          <a href="/features" className="hover:text-maroon-400 transition">Features</a>
          <a href="/event" className="hover:text-maroon-400 transition">Events</a>
          <a href="/contact" className="hover:text-maroon-400 transition">Contact</a>
          <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
            Coming Soon
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-12 pt-28">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg hover:shadow-maroon-700 transition hover:scale-[1.03]"
          >
            <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-maroon-500 mb-2">{event.title}</h3>
              <p className="text-gray-300 text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex space-x-4 pb-10">
        <a href="/event" className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">1</a>
        <button className="px-4 py-2 bg-maroon-600 rounded-lg hover:bg-maroon-700 transition">2</button>
        <a href="/event3" className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">3</a>
        <a href="/event4" className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">4</a>
      </div>

      {/* Footer */}
      <footer className="text-gray-500 pb-8 text-sm text-center">
        © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
      </footer>
    </div>
  );
}
