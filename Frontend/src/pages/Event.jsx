import { useState, useEffect } from "react";

export default function Event() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/events/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched events:", data);
        setEvents(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter events based on search input
  const filteredEvents = events.filter((event) =>
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      event.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  return (
    <div className="w-screen min-h-screen bg-red-950 text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between py-6 px-6 bg-gradient-to-t from-red-800 to-red-950">
        <a href="/">
          <h1 className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
        </a>
        <div className="space-x-6">
          <a href="/features" className="hover:text-maroon-400 transition">
            Features
          </a>
          <a href="/event" className="hover:text-maroon-400 transition">
            Events
          </a>
          <a href="/contact" className="hover:text-maroon-400 transition">
            Contact
          </a>
          <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
            Coming Soon
          </button>
        </div>
      </nav>

      {/* Page header */}
      <section className="max-w-3xl pt-16 pb-8 px-6 text-center">
        <h2 className="text-4xl font-bold text-maroon-400 mb-4">
          Aggie Events!
        </h2>
        <p className="text-gray-300 mb-6">
          Discover the heart of the Aggie experience — from cherished traditions
          to exciting campus events.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/*  Search bar */}
          <input
            type="text"
            
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 rounded-lg bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-maroon-500"
          />
          <select
            value = {selectedCategory}
            onChange = {(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-maroon-500"
          >
            <option value="">All Categories</option>
            <option value="tradition">Traditions</option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="meeting">Organizations</option>
          </select>
          <select 
            value = {sortOption}
            onChange = {(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-maroon-500"
          >
            <option value="Date">Sort By Date</option>
            <option value="Title">Sort By Title</option>
          </select>
        </div>
      </section>
      {/* Filters */}
      <section></section>
      {/* Event cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-20 pt-10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <a
              key={event.id}  // use id from backend
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-xl hover:shadow-black transition hover:scale-[1.03] block"
            >
              <img
                src={`http://127.0.0.1:8000/media/${event.image}`} // prepend backend URL
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
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No events found matching your search.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="text-gray-500 pb-8 text-sm text-center">
        © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
      </footer>
    </div>
  );
}
