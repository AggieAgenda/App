import React, { useState, useEffect } from "react";
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PublicEvents(){
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch events on component mount if empty
    useEffect(() => {
        if (events.length === 0) {
            fetchEvents();
        }
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/events/");
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = await response.json();
            setEvents(Array.isArray(data) ? data : data.results || []);
        } catch (err) {
            setError(err.message);
            console.error("Failed to fetch events:", err);
        } finally {
            setLoading(false);
        }
    };

    // Filter events based on search query
    const filteredEvents = events.filter(event => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (event.title?.toLowerCase().includes(searchLower)) ||
            (event.name?.toLowerCase().includes(searchLower)) ||
            (event.description?.toLowerCase().includes(searchLower)) ||
            (event.course?.toLowerCase().includes(searchLower))
        );
    });

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <NavBar />
      
      <div className="flex-grow max-w-4xl w-full mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Events</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search events by name, course, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center text-gray-500">Loading events...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Events List */}
        {!loading && !error && (
          <div className="space-y-3">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <div
                  key={event.id || index}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h2 className="text-lg font-semibold text-gray-900">
                    {event.title || event.name || "Untitled Event"}
                  </h2>
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  )}
                  {event.course && (
                    <p className="text-xs text-blue-600 mt-2">Course: {event.course}</p>
                  )}
                  {event.start_date && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(event.start_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                {searchQuery ? "No events match your search" : "No events available"}
              </p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

