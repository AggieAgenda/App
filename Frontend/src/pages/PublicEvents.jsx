import React, { useState, useEffect } from "react";
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PublicEvents(){
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location_name: "",
        starts_at: "",
        ends_at: "",
        tags: []
    });

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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/find/`);
            console.log(response)
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = await response.json();
            setEvents(Array.isArray(data) ? data : data.events || []);
        } catch (err) {
            setError(err.message);
            console.error("Failed to fetch events:", err);
        } finally {
            setLoading(false);
        }
    };
    const reload = async () =>{
        return fetchEvents();
    }
    const addEvents = async() => {
        if (!formData.title || !formData.starts_at) {
            setError("Title and start time are required");
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            console.log("this is formdata")
            console.log(formData)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/add/   `, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = await response.json();
            setShowAddForm(false);
            setFormData({
                title: "",
                description: "",
                location_name: "",
                starts_at: "",
                ends_at: "",
                tags: []
            });
            // Refresh events list
            await fetchEvents();
        } catch (err) {
            setError(err.message);
            console.error("Failed to create event:", err);
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Events</h1>
          <button
            onClick={() => console.log(reload)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >Reload</button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {showAddForm ? "Cancel" : "Add Event"}
          </button>
        </div>

        {/* Add Event Form */}
        {showAddForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title *"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location_name}
                onChange={(e) => setFormData({...formData, location_name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="datetime-local"
                placeholder="Start Time *"
                value={formData.starts_at}
                onChange={(e) => setFormData({...formData, starts_at: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="datetime-local"
                placeholder="End Time"
                value={formData.ends_at}
                onChange={(e) => setFormData({...formData, ends_at: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addEvents}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
              
            </div>
          </div>
        )}
        
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

