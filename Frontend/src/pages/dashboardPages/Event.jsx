// src/pages/Event.jsx
import { useState, useMemo } from "react";

export default function Event() {
  const [search, setSearch] = useState("");

  const events = [
    {
      title: "Midnight Yell",
      date: "2025-02-14",
      image: "/midnight_yell.jpg",
      description:
        "Join fellow Aggies at Kyle Field for the iconic midnight tradition before every home game.",
    },
    {
      title: "Muster",
      date: "2025-04-21",
      image: "/AggieMuster.jpg",
      description:
        "A cherished ceremony honoring Aggies who have passed, reminding us that once an Aggie, always an Aggie.",
    },
    {
      title: "Fish Camp",
      date: "2025-08-01",
      image: "/fish_camp_run1.jpg",
      description:
        "Welcome new Aggies to campus life with a week of bonding, laughter, and unforgettable traditions.",
    },
    {
      title: "Silver Taps",
      date: "2025-03-03",
      image: "/silver_taps_run1.jpg",
      description:
        "A solemn ceremony held to honor the memory of students who have passed away during the year.",
    },
    {
      title: "Career Fair",
      date: "2025-09-20",
      image: "/career_fair_run1.jpg",
      description:
        "Meet recruiters and explore opportunities with top companies seeking Aggie engineers and leaders.",
    },
    {
      title: "Ring Day",
      date: "2025-04-25",
      image: "/aggie_ringday_run1.jpg",
      description:
        "Celebrate receiving your Aggie Ring — a symbol of hard work, tradition, and achievement.",
    },
    {
      title: "Ring Day",
      date: "2025-04-25",
      image: "/aggie_ringday_run1.jpg",
      description:
        "Celebrate receiving your Aggie Ring — a symbol of hard work, tradition, and achievement.",
    },
  ];

  // SORT + FILTER
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // upcoming first
  }, [search]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center pt-28">
      {/* Search bar */}
      <div className="w-full max-w-3xl px-6 mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#1e1e1e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-maroon-600"
        />
      </div>

      {/* Events Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-20">
        {filteredEvents.map((event, idx) => (
          <div
            key={idx}
            className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg hover:shadow-maroon-700 transition hover:scale-[1.03]"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-maroon-500 mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-300 text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
