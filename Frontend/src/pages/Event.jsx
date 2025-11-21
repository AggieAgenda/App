import { useState } from "react";

export default function Event() {
  const events = [
    {
      title: "Midnight Yell",
      image: "/midnight_yell.jpg",
      description: "Join fellow Aggies at Kyle Field for the iconic midnight tradition before every home game.",
      category: "Sports",
    },
    {
      title: "Muster",
      image: "/AggieMuster.jpg",
      description: "A cherished ceremony honoring Aggies who have passed, reminding us that once an Aggie, always an Aggie.",
      category: "Tradition",
    },
    {
      title: "Fish Camp",
      image: "/fish_camp_run1.jpg",
      description: "Welcome new Aggies to campus life with a week of bonding, laughter, and unforgettable traditions.",
      category: "Academic",
    },
    {
      title: "Silver Taps",
      image: "/silver_taps_run1.jpg",
      description: "A solemn ceremony held to honor the memory of students who have passed away during the year.",
      category: "Tradition",
    },
    {
      title: "Career Fair",
      image: "/career_fair_run1.jpg",
      description: "Meet recruiters and explore opportunities with top companies seeking Aggie engineers and leaders.",
      category: "Career",
    },
    {
      title: "Ring Day",
      image: "/aggie_ringday_run1.jpg",
      description: "Celebrate receiving your Aggie Ring — a symbol of hard work, tradition, and achievement.",
      category: "Tradition",
    },
    {
      title: "Football Game",
      image: "/aggie_ringday_run1.jpg",
      description: "Experience the 12th Man spirit and excitement at Kyle Field! testing how longer text affects boxes,m m m m m m m m mcd",
      category: "Sports",
    },
    {
      title: "Maroon Out",
      image: "/maroon_out.jpg",
      description: "A day for Aggies to show unity and pride by wearing maroon.",
      category: "Tradition",
    },
    {
      title: "Big Event",
      image: "/big_event.jpg",
      description: "Join the largest one-day student-run service project in the nation!",
      category: "Service",
    },
  ];

  const categories = ["All", "Sports", "Academic", "Career", "Tradition", "Service"];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const eventsPerPage = 6;

  // Filter events by category
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  // Handle category change and reset to page 1
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

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

      {/* Filter Menu */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl px-6 pt-8 pb-4">
        <h2 className="text-2xl font-semibold text-maroon-400 mb-4 sm:mb-0">
          Browse Events
        </h2>

        <div className="flex items-center space-x-4">
          <label className="text-gray-300">Filter by:</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="bg-[#1e1e1e] border border-maroon-600 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-maroon-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-12">
        {currentEvents.length > 0 ? (
          currentEvents.map((event, index) => (
            <div
              key={index}
              className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg hover:shadow-maroon-700 transition hover:scale-[1.03]"
            >
              <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-maroon-500 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm">{event.description}</p>
                <p className="text-xs text-gray-400 mt-2 italic">{event.category}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No events found in this category.</p>
        )}
      </div>

      {/* Pagination */}
        <div className="flex space-x-4 pb-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200
              ${currentPage === 1
                ? "bg-gray-500 text-gray-700 cursor-not-allowed"
                : "bg-maroon-600 text-gray-700 hover:bg-maroon-700"
              }`}
          >
            Previous
          </button>

          <span className="text-gray-300 pt-2">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200
              ${currentPage === totalPages || totalPages === 0
                ? "bg-gray-500 text-gray-700 cursor-not-allowed"
                : "bg-maroon-600 text-gray-700 hover:bg-maroon-700"
              }`}
          >
            Next
          </button>
        </div>



      {/* Footer */}
      <footer className="text-gray-500 pb-8 text-sm text-center">
        © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
      </footer>
    </div>
  );
}
