// src/pages/Event.jsx
export default function Event() {
  const events = [
    {
      title: "Midnight Yell",
      image: "/midnight_yell.jpg",
      description: "Join fellow Aggies at Kyle Field for the iconic midnight tradition before every home game.",
      link: "https://www.tamu.edu/campus-community/traditions/gameday/midnight-yell.html",
    },
    {
      title: "Muster",
      image: "/AggieMuster.jpg",
      description: "A cherished ceremony honoring Aggies who have passed, reminding us that once an Aggie, always an Aggie.",
      link: "https://www.tamu.edu/campus-community/traditions/gameday/midnight-yell.html",
    },
    {
      title: "Fish Camp",
      image: "/fish_camp_run1.jpg",
      description: "Welcome new Aggies to campus life with a week of bonding, laughter, and unforgettable traditions.",
      link: "https://www.tamu.edu/campus-community/traditions/gameday/midnight-yell.html",
    },
    {
      title: "Silver Taps",
      image: "/silver_taps_run1.jpg",
      description: "A solemn ceremony held to honor the memory of students who have passed away during the year.",
      link: "https://www.tamu.edu/campus-community/traditions/gameday/midnight-yell.html",
    },
    {
      title: "Career Fair",
      image: "/career_fair_run1.jpg",
      description: "Meet recruiters and explore opportunities with top companies seeking Aggie engineers and leaders.",
      link: "https://www.tamu.edu/campus-community/traditions/gameday/midnight-yell.html",
    },
    {
      title: "Ring Day",
      image: "/aggie_ringday_run1.jpg",
      description: "Celebrate receiving your Aggie Ring — a symbol of hard work, tradition, and achievement.",
      link: "https://www.tamu.edu/campus-community/traditions/gameday/midnight-yell.html",
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-red-950 text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between py-6 px-6 bg-gradient-to-t from-red-800 to-red-950">
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

      <section className = "max-w-3xl pt-16 pb-8 px-6 text-center">
          <h2 className = "text-4xl font-bold text-maroon-400 mb-4">Aggie Events!</h2>
          <p className = "text-gray-300">Discover the heart of the Aggie experience — from cherished traditions to exciting campus events</p>
      </section>
      {/* Main content */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-20 pt-28">
        {events.map((event, index) => (
          <a
            key={index}
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-xl hover:shadow-black transition hover:scale-[1.03] block"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-maroon-500 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-300 text-sm">{event.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-gray-500 pb-8 text-sm text-center">
        © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
      </footer>
    </div>
  );
}
