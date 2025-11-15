// src/pages/Event.jsx
import Navbar from '../components/Navbar.jsx'
export default function Event() {
  const events = [
    {
      title: "Midnight Yell",
      image: "/midnight_yell.jpg",
      description: "Join fellow Aggies at Kyle Field for the iconic midnight tradition before every home game.",
    },
    {
      title: "Muster",
      image: "/AggieMuster.jpg",
      description: "A cherished ceremony honoring Aggies who have passed, reminding us that once an Aggie, always an Aggie.",
    },
    {
      title: "Fish Camp",
      image: "/fish_camp_run1.jpg",
      description: "Welcome new Aggies to campus life with a week of bonding, laughter, and unforgettable traditions.",
    },
    {
      title: "Silver Taps",
      image: "/silver_taps_run1.jpg",
      description: "A solemn ceremony held to honor the memory of students who have passed away during the year.",
    },
    {
      title: "Career Fair",
      image: "/career_fair_run1.jpg",
      description: "Meet recruiters and explore opportunities with top companies seeking Aggie engineers and leaders.",
    },
    {
      title: "Ring Day",
      image: "/aggie_ringday_run1.jpg",
      description: "Celebrate receiving your Aggie Ring — a symbol of hard work, tradition, and achievement.",
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-[#321212] text-white flex flex-col items-center">
      <Navbar />

      {/* Main content */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-20 pt-28">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg hover:shadow-maroon-700 transition hover:scale-[1.03]"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-maroon-500 mb-2">{event.title}</h3>
              <p className="text-gray-300 text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-gray-500 pb-8 text-sm text-center">
        © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
      </footer>
    </div>
  );
}
