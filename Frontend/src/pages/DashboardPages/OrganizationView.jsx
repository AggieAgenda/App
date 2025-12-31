import { useState, useMemo } from "react";

const MAROON = "#500000";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function formatDate(dateStr) {
  if (!dateStr) return "No date";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return "No date";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function OrganizationView() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingOrg, setIsEditingOrg] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [orgData, setOrgData] = useState({
    id: 12341,
    name: "Aggie Coding Club",
    description: "Build projects, prep for interviews, and meet other Aggie developers. Weekly workshops + hack nights.",
    tags: ["tech", "computer science", "workshops"],
    image: "/org_coding_club.jpg",
    contact_email: "contact@aggiecodingclub.com",
    link: "https://aggiecodingclub.com",
    members: 240,
    meetingTime: "Thurs 7:00 PM",
    location: "Zachry 101",
    founded: "2018"
  });

  const [orgEvents, setOrgEvents] = useState([
    {
      id: 1,
      title: "Hack Night",
      description: "Weekly coding session where members work on projects together",
      date: "2025-02-05",
      startTime: "18:00",
      endTime: "21:00",
      location: "Zachry 101",
      tags: ["tech", "coding", "free food"],
      socialLink: "https://instagram.com/aggiecoding",
      attendees: 45,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Industry Panel",
      description: "Q&A with software engineers from top tech companies",
      date: "2025-02-12",
      startTime: "19:00",
      endTime: "20:30",
      location: "MSC 2400",
      tags: ["career", "tech", "networking"],
      socialLink: "",
      attendees: 120,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Intro to React Workshop",
      description: "Beginner-friendly workshop covering React fundamentals",
      date: "2025-01-20",
      startTime: "17:00",
      endTime: "19:00",
      location: "Zachry 202",
      tags: ["workshop", "coding", "free food"],
      socialLink: "",
      attendees: 67,
      status: "past"
    }
  ]);

  const upcomingEvents = useMemo(() => 
    orgEvents.filter(e => e.status === "upcoming").sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    ), [orgEvents]
  );

  const pastEvents = useMemo(() => 
    orgEvents.filter(e => e.status === "past").sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    ), [orgEvents]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-6">
            <img 
              src={orgData.image} 
              alt={orgData.name}
              className="w-24 h-24 rounded-2xl border-2 object-cover"
              style={{ borderColor: MAROON }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-gray-900">{orgData.name}</h1>
              <p className="text-gray-600 mt-1">{orgData.description}</p>
              <div className="flex gap-4 mt-3 text-sm">
                <span className="text-gray-500">
                  <strong className="text-gray-900">{orgData.members}</strong> members
                </span>
                <span className="text-gray-500">
                  Founded <strong className="text-gray-900">{orgData.founded}</strong>
                </span>
                {orgData.meetingTime && (
                  <span className="text-gray-500">
                    Meets <strong className="text-gray-900">{orgData.meetingTime}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
          {[
            { key: "overview", label: "Overview", icon: "📊" },
            { key: "events", label: "Events", icon: "📅" },
            { key: "settings", label: "Settings", icon: "⚙️" }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={classNames(
                "flex-1 px-6 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2",
                activeTab === tab.key
                  ? "text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-50"
              )}
              style={activeTab === tab.key ? { backgroundColor: MAROON } : undefined}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <OverviewTab 
            orgData={orgData} 
            upcomingEvents={upcomingEvents}
            totalEvents={orgEvents.length}
          />
        )}

        {activeTab === "events" && (
          <EventsTab 
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            showCreateEvent={showCreateEvent}
            setShowCreateEvent={setShowCreateEvent}
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
            setOrgEvents={setOrgEvents}
          />
        )}

        {activeTab === "settings" && (
          <SettingsTab 
            orgData={orgData}
            setOrgData={setOrgData}
            isEditing={isEditingOrg}
            setIsEditing={setIsEditingOrg}
          />
        )}

      </div>
    </div>
  );
}

function OverviewTab({ orgData, upcomingEvents, totalEvents }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="text-4xl font-extrabold" style={{ color: MAROON }}>
          {totalEvents}
        </div>
        <div className="text-gray-600 font-semibold mt-1">Total Events</div>
        <div className="text-sm text-gray-500 mt-2">All time hosted events</div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="text-4xl font-extrabold" style={{ color: MAROON }}>
          {upcomingEvents.length}
        </div>
        <div className="text-gray-600 font-semibold mt-1">Upcoming Events</div>
        <div className="text-sm text-gray-500 mt-2">Events scheduled ahead</div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="text-4xl font-extrabold" style={{ color: MAROON }}>
          {orgData.members}
        </div>
        <div className="text-gray-600 font-semibold mt-1">Members</div>
        <div className="text-sm text-gray-500 mt-2">Active community size</div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-extrabold text-gray-900 mb-4">Organization Info</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-semibold text-gray-600">Contact Email:</span>
            <p className="text-gray-900">{orgData.contact_email}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-600">Location:</span>
            <p className="text-gray-900">{orgData.location}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-600">Meeting Time:</span>
            <p className="text-gray-900">{orgData.meetingTime}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-600">Tags:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {orgData.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full border"
                  style={{
                    borderColor: `${MAROON}33`,
                    backgroundColor: `${MAROON}0D`,
                    color: MAROON,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {orgData.link && (
            <div>
              <span className="text-sm font-semibold text-gray-600">Website:</span>
              <a 
                href={orgData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:underline"
                style={{ color: MAROON }}
              >
                {orgData.link}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-extrabold text-gray-900 mb-4">Next Events</h3>
        <div className="space-y-3">
          {upcomingEvents.slice(0, 3).map(event => (
            <div key={event.id} className="border-l-4 pl-3 py-2" style={{ borderColor: MAROON }}>
              <div className="font-bold text-gray-900 text-sm">{event.title}</div>
              <div className="text-xs text-gray-500">{formatDate(event.date)}</div>
            </div>
          ))}
          {upcomingEvents.length === 0 && (
            <p className="text-gray-500 text-sm">No upcoming events</p>
          )}
        </div>
      </div>

    </div>
  );
}

function EventsTab({ upcomingEvents, pastEvents, showCreateEvent, setShowCreateEvent, editingEvent, setEditingEvent, setOrgEvents }) {
  
  const handleDeleteEvent = (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setOrgEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-gray-900">Manage Events</h2>
        <button
          onClick={() => setShowCreateEvent(true)}
          className="px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition shadow-sm"
          style={{ backgroundColor: MAROON }}
        >
          + Create Event
        </button>
      </div>

      {(showCreateEvent || editingEvent) && (
        <EventForm 
          event={editingEvent}
          onClose={() => {
            setShowCreateEvent(false);
            setEditingEvent(null);
          }}
          onSave={(eventData) => {
            if (editingEvent) {
              setOrgEvents(prev => prev.map(e => 
                e.id === editingEvent.id ? { ...eventData, id: e.id } : e
              ));
            } else {
              setOrgEvents(prev => [...prev, { ...eventData, id: Date.now(), status: "upcoming" }]);
            }
            setShowCreateEvent(false);
            setEditingEvent(null);
          }}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-extrabold text-gray-900 mb-4">Upcoming Events</h3>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onEdit={setEditingEvent}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming events. Create one to get started!</p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-extrabold text-gray-900 mb-4">Past Events</h3>
        {pastEvents.length > 0 ? (
          <div className="space-y-3">
            {pastEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event}
                isPast={true}
                onEdit={setEditingEvent}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No past events yet.</p>
        )}
      </div>

    </div>
  );
}

function EventCard({ event, isPast = false, onEdit, onDelete }) {
  return (
    <div className={classNames(
      "rounded-xl border p-4 transition hover:shadow-md",
      isPast ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
    )}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-extrabold text-gray-900">{event.title}</h4>
            {isPast && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                Past
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span>📅 {formatDate(event.date)}</span>
            <span>🕐 {event.startTime} - {event.endTime}</span>
            <span>📍 {event.location}</span>
            <span>👥 {event.attendees} attendees</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {event.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full border"
                style={{
                  borderColor: `${MAROON}33`,
                  backgroundColor: `${MAROON}0D`,
                  color: MAROON,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(event)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="px-3 py-2 rounded-lg border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function EventForm({ event, onClose, onSave }) {
  const [title, setTitle] = useState(event?.title || "");
  const [desc, setDesc] = useState(event?.description || "");
  const [date, setDate] = useState(event?.date || "");
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const [endTime, setEndTime] = useState(event?.endTime || "");
  const [location, setLocation] = useState(event?.location || "");
  const [tags, setTags] = useState(event?.tags.join(", ") || "");
  const [socialLink, setSocialLink] = useState(event?.socialLink || "");

  const handleSubmit = () => {
    if (!title || !desc || !date || !startTime || !endTime || !location) {
      alert("Please fill in all required fields");
      return;
    }
    
    onSave({
      title,
      description: desc,
      date,
      startTime,
      endTime,
      location,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      socialLink,
      attendees: event?.attendees || 0
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold" style={{ color: MAROON }}>
          {event ? "Edit Event" : "Create New Event"}
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1 text-sm" style={{ color: MAROON }}>
            Event Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Hack Night, General Meeting"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
            style={{ outlineColor: MAROON }}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-sm" style={{ color: MAROON }}>
            Description *
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe the event..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
            style={{ outlineColor: MAROON }}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-sm" style={{ color: MAROON }}>
              Date *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm" style={{ color: MAROON }}>
              Location *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Zachry 101, MSC 2400"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-sm" style={{ color: MAROON }}>
              Start Time *
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm" style={{ color: MAROON }}>
              End Time *
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-sm" style={{ color: MAROON }}>
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Ex: tech, workshop, free food"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
            style={{ outlineColor: MAROON }}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-sm" style={{ color: MAROON }}>
            Social Media Link (optional)
          </label>
          <input
            type="url"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
            placeholder="https://instagram.com/yourorg"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
            style={{ outlineColor: MAROON }}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg border-2 font-semibold hover:bg-gray-50 transition"
            style={{ borderColor: MAROON, color: MAROON }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: MAROON }}
          >
            {event ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ orgData, setOrgData, isEditing, setIsEditing }) {
  const [formData, setFormData] = useState({ ...orgData });

  const handleSave = () => {
    setOrgData(formData);
    setIsEditing(false);
    console.log("Saving org data:", formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Organization Settings</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: MAROON }}
          >
            Edit Info
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFormData({ ...orgData });
                setIsEditing(false);
              }}
              className="px-6 py-3 rounded-xl border-2 font-semibold hover:bg-gray-50 transition"
              style={{ borderColor: MAROON, color: MAROON }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: MAROON }}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
            Organization Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
            />
          ) : (
            <p className="text-gray-900">{orgData.name}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
            Description
          </label>
          {isEditing ? (
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
              rows={3}
            />
          ) : (
            <p className="text-gray-900">{orgData.description}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
            Contact Email
          </label>
          {isEditing ? (
            <input
              type="email"
              value={formData.contact_email}
              onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
            />
          ) : (
            <p className="text-gray-900">{orgData.contact_email}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
            Location
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
              placeholder="Ex: Zachry 101"
            />
          ) : (
            <p className="text-gray-900">{orgData.location}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
            Meeting Time
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.meetingTime}
              onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
              placeholder="Ex: Thurs 7:00 PM"
            />
          ) : (
            <p className="text-gray-900">{orgData.meetingTime}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
            Tags (comma separated)
          </label>
          {isEditing ? (
            <input
              type="text"
              value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
              onChange={(e) => setFormData({ 
                ...formData, 
                tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
              placeholder="Ex: tech, workshops, computer science"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {orgData.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full border"
                  style={{
                    borderColor: `${MAROON}33`,
                    backgroundColor: `${MAROON}0D`,
                    color: MAROON,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
            Website Link
          </label>
          {isEditing ? (
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
              placeholder="https://yourorg.com"
            />
          ) : (
            <p className="text-gray-900">{orgData.link}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm" style={{ color: MAROON }}>
            Organization Image URL
          </label>
          {isEditing ? (
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2"
              style={{ outlineColor: MAROON }}
              placeholder="/org_image.jpg"
            />
          ) : (
            <p className="text-gray-900">{orgData.image}</p>
          )}
        </div>
      </div>
    </div>
  );
}