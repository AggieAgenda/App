import { useState, useEffect } from "react";

const MAROON = "#500000";
const START_HOUR = 6;
const END_HOUR = 22;
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Central Time utilities
const toCentralTime = (dateString) => {
  // Convert any datetime to Central Time
  const date = new Date(dateString);
  return new Date(date.toLocaleString("en-US", {timeZone: "America/Chicago"}));
};

const fromCentralTime = (localDatetimeString) => {
  // Convert datetime-local input (which is in local time) to Central Time for storage
  // Format: "2026-01-08T14:00" -> Central Time ISO string
  const localDate = new Date(localDatetimeString);
  
  // Create a date object representing the same time but in Central timezone
  const centralDate = new Date(localDate.toLocaleString("en-US", {timeZone: "America/Chicago"}));
  
  // Calculate the offset and adjust
  const offset = localDate.getTime() - centralDate.getTime();
  const adjustedDate = new Date(localDate.getTime() - offset);
  
  return adjustedDate.toISOString();
};

// ==================== IMPORT/EXPORT FUNCTIONS ====================

function handleImportICS(onCreateEvent) {
  // Create a file input element
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.ics';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        const events = parseICS(text);
        
        // Import each event
        let successCount = 0;
        for (const event of events) {
          const success = await onCreateEvent(event);
          if (success) successCount++;
        }
        
        alert(`Successfully imported ${successCount} out of ${events.length} events`);
      } catch (error) {
        console.error('Error importing ICS:', error);
        alert('Error importing ICS file. Please check the file format.');
      }
    }
  };
  input.click();
}

function parseICS(icsText) {
  const events = [];
  const lines = icsText.split('\n').map(line => line.trim());
  
  let currentEvent = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line === 'BEGIN:VEVENT') {
      currentEvent = {
        title: '',
        location_name: '',
        starts_at: '',
        ends_at: '',
        description: ''
      };
    } else if (line === 'END:VEVENT' && currentEvent) {
      if (currentEvent.title && currentEvent.starts_at) {
        events.push(currentEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      if (line.startsWith('SUMMARY:')) {
        currentEvent.title = line.substring(8);
      } else if (line.startsWith('LOCATION:')) {
        currentEvent.location_name = line.substring(9);
      } else if (line.startsWith('DESCRIPTION:')) {
        currentEvent.description = line.substring(12);
      } else if (line.startsWith('DTSTART:')) {
        const dateStr = line.substring(8);
        currentEvent.starts_at = parseICSDate(dateStr);
      } else if (line.startsWith('DTEND:')) {
        const dateStr = line.substring(6);
        currentEvent.ends_at = parseICSDate(dateStr);
      }
    }
  }
  
  return events;
}

function parseICSDate(icsDate) {
  // Handle different ICS date formats
  if (icsDate.includes('T')) {
    // Format: 20260108T140000 or 20260108T140000Z
    const cleanDate = icsDate.replace(/[TZ]/g, '');
    const year = cleanDate.substring(0, 4);
    const month = cleanDate.substring(4, 6);
    const day = cleanDate.substring(6, 8);
    const hour = cleanDate.substring(8, 10) || '00';
    const minute = cleanDate.substring(10, 12) || '00';
    
    // Create the datetime string and treat it as Central Time
    const datetimeString = `${year}-${month}-${day}T${hour}:${minute}`;
    
    // Convert to Central Time for consistent storage
    return fromCentralTime(datetimeString);
  }
  
  return '';
}

function handleExportToGoogle() {
  // TODO: Implement Google Calendar export functionality
  console.log("Export to Google Calendar clicked");
}

// ==================== UTILITY FUNCTIONS ====================

function StartOfWeek(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function AddDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function IsSameDay(a, b) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function GetEventsForDay(eventsObj, date) {
  if (!eventsObj) return [];
  return Object.values(eventsObj).filter(evt =>
    IsSameDay(new Date(evt.start), date)
  );
}

function ExpandRecurringEvents(eventsObj, startDate, endDate) {
  const expanded = [];
  
  Object.values(eventsObj).forEach(evt => {
    const eventStart = toCentralTime(evt.start);
    
    // Non-recurring event
    if (!evt.recurrence) {
      if (eventStart >= startDate && eventStart <= endDate) {
        expanded.push({ ...evt, instanceDate: eventStart });
      }
      return;
    }

    // Recurring event - simplified expansion
    const { freq, byDay, count } = evt.recurrence;
    const dayMap = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
    
    let currentDate = new Date(eventStart);
    let instances = 0;
    const maxInstances = count || 52; // Default to ~1 year

    while (currentDate <= endDate && instances < maxInstances) {
      const isException = evt.exceptions?.some(ex => 
        IsSameDay(new Date(ex), currentDate)
      );

      if (!isException && currentDate >= startDate) {
        if (freq === "DAILY" || 
            (freq === "WEEKLY" && byDay?.includes(Object.keys(dayMap).find(k => dayMap[k] === currentDate.getDay())))) {
          expanded.push({ 
            ...evt, 
            instanceDate: new Date(currentDate),
            start: new Date(currentDate.setHours(eventStart.getHours(), eventStart.getMinutes())).toISOString(),
            end: evt.end ? new Date(currentDate.setHours(new Date(evt.end).getHours(), new Date(evt.end).getMinutes())).toISOString() : null
          });
          instances++;
        }
      }

      currentDate.setDate(currentDate.getDate() + (freq === "DAILY" ? 1 : 1));
    }
  });

  return expanded;
}

// ==================== MAIN COMPONENT ====================

export default function CalendarPage() {
  const [view, setView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch calendar data on component mount
  useEffect(() => {
    fetchCalendarData();
  }, []);

  const fetchCalendarData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch(`${API_URL}/api/calendar`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch calendar: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Convert backend events to frontend format
        const eventsObj = {};
        data.calendar.forEach((event, index) => {
          eventsObj[`evt_${index}`] = {
            id: event.id,
            title: event.title,
            location: event.location_name,
            start: event.starts_at,
            end: event.ends_at,
            description: event.description,
            tags: event.tags,
            user_notes: event.user_notes,
            // For now, no recurrence from backend
            recurrence: null,
            exceptions: []
          };
        });
        
        setEvents(eventsObj);
      } else {
        setError(data.error || 'Failed to load calendar');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching calendar:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return false;
      }
      console.log(JSON.stringify(eventData))
      const response = await fetch(`${API_URL}/api/calendar/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create event: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        // Refresh calendar data
        await fetchCalendarData();
        return true;
      } else {
        setError(data.error || 'Failed to create event');
        return false;
      }
    } catch (err) {
      setError(err.message);
      console.error('Error creating event:', err);
      return false;
    }
  };

  const changeDate = (delta) => {
    const d = new Date(currentDate);
    if (view === "month") d.setMonth(d.getMonth() + delta);
    else d.setDate(d.getDate() + delta * 7);
    setCurrentDate(d);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#500000] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading calendar...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading calendar: {error}</p>
              <button 
                onClick={fetchCalendarData}
                className="px-4 py-2 bg-[#500000] text-white rounded-lg hover:bg-[#700000] transition"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        <CalendarHeader
          view={view}
          setView={setView}
          currentDate={currentDate}
          changeDate={changeDate}
          onImport={() => handleImportICS(handleCreateEvent)} 
          onExport={handleExportToGoogle}
        />

        <div className="p-6">
          {view === "month" ? (
            <MonthView 
              currentDate={currentDate} 
              events={events}
              onEventClick={setSelectedEvent}
            />
          ) : (
            <WeekView
              currentDate={currentDate}
              events={events}
              onCellClick={setSelectedSlot}
              onEventClick={setSelectedEvent}
            />
          )}
        </div>

        <div className="border-t border-gray-200 bg-gray-50">
          <AddEventPanel onCreateEvent={handleCreateEvent} />
        </div>
      </div>

        {(selectedSlot || selectedEvent) && (
        <EventDrawer
          slot={selectedSlot}
          event={selectedEvent}
          onCreateEvent={handleCreateEvent}
          onClose={() => {
            setSelectedSlot(null);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}

// ==================== HEADER COMPONENT ====================

function CalendarHeader({ view, setView, currentDate, changeDate, onImport, onExport }) {
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-gray-200 gap-4">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => changeDate(-1)} 
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          ← Prev
        </button>
        <h2 className="text-xl font-extrabold text-gray-900">
          {monthName} {year}
        </h2>
        <button 
          onClick={() => changeDate(1)} 
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Next →
        </button>
      </div>

      <div>
        <button
            onClick={onImport}
            className="px-4 py-2 border-2 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            style={{ borderColor: MAROON, color: MAROON }}
          >
            Import ICS
          </button>
          <button
            onClick={onExport}
            className="px-4 py-2 text-white rounded-xl font-semibold hover:opacity-90 transition-all"
            style={{ backgroundColor: MAROON }}
          >
            Export to Google
          </button>
      </div>
      <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 w-full sm:w-auto">
        <button
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition ${
            view === "month" ? "text-white" : "text-gray-700 hover:bg-white"
          }`}
          style={view === "month" ? { backgroundColor: MAROON } : undefined}
          onClick={() => setView("month")}
        >
          Month
        </button>
        <button
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition ${
            view === "week" ? "text-white" : "text-gray-700 hover:bg-white"
          }`}
          style={view === "week" ? { backgroundColor: MAROON } : undefined}
          onClick={() => setView("week")}
        >
          Week
        </button>
      </div>
    </div>
  );
}

// ==================== MONTH VIEW ====================

function MonthView({ currentDate, events, onEventClick }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay();

  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  
  const expandedEvents = ExpandRecurringEvents(events, monthStart, monthEnd);

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isToday = (day) => {
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="px-3 py-2 text-xs font-bold text-gray-600">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const cellDate = day ? new Date(year, month, day) : null;
          const dayEvents = cellDate ? expandedEvents.filter(evt => 
            IsSameDay(toCentralTime(evt.start), cellDate)
          ) : [];

          return (
            <div
              key={idx}
              className="min-h-[110px] p-2 border-b border-r border-gray-200 hover:bg-gray-50 cursor-pointer transition"
            >
              {day && (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
                        isToday(day) ? "text-white" : "text-gray-900"
                      }`}
                      style={isToday(day) ? { backgroundColor: MAROON } : undefined}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-xs font-semibold text-gray-500">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((evt, i) => (
                      <div
                        key={`${evt.id}-${i}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(evt);
                        }}
                        className="text-xs rounded-md px-2 py-1 border truncate cursor-pointer hover:opacity-80"
                        style={{
                          borderColor: `${MAROON}33`,
                          backgroundColor: `${MAROON}0D`,
                          color: MAROON,
                        }}
                        title={evt.title}
                      >
                        {evt.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 px-2">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== WEEK VIEW ====================

function WeekView({ currentDate, events, onCellClick, onEventClick }) {
  const weekStart = StartOfWeek(currentDate);
  const weekEnd = AddDays(weekStart, 6);
  const days = Array.from({ length: 7 }).map((_, i) => AddDays(weekStart, i));
  
  const expandedEvents = ExpandRecurringEvents(events, weekStart, weekEnd);
  const today = new Date();

  const isToday = (d) => IsSameDay(d, today);

  return (
    <div className="overflow-x-auto">
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-8 gap-0 min-w-max bg-gray-50 border-b border-gray-200">
          <div className="w-16 px-3 py-2" />
          {days.map(d => (
            <div 
              key={d.toISOString()} 
              className={`text-center font-bold w-28 px-3 py-2 ${
                isToday(d) ? "text-white" : ""
              }`}
              style={isToday(d) ? { backgroundColor: MAROON } : undefined}
            >
              <div className="text-xs">
                {d.toLocaleDateString("default", { weekday: "short" })}
              </div>
              <div className="text-base mt-1">
                {d.getDate()}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8 gap-0 min-w-max">
          {Array.from({ length: END_HOUR - START_HOUR }).map((_, i) => {
            const hour = START_HOUR + i;
            return (
              <div key={hour} className="contents">
                <div className="text-xs text-gray-600 font-bold py-2 px-3 w-16 border-b border-r border-gray-200">
                  {(hour % 12 || 12)}:00 {hour >= 12 ? 'PM' : 'AM'}
                </div>
                {days.map(d => {
                  // Get all events for this day first
                  const allDayEvents = expandedEvents.filter(e => {
                    const eventDate = toCentralTime(e.start);
                    return IsSameDay(eventDate, d);
                  });

                  // Then filter by hour using Central Time
                  const dayEvents = allDayEvents.filter(e => {
                    const eventDate = toCentralTime(e.start);
                    const eventHour = eventDate.getHours();
                    return eventHour === hour;
                  });

                  return (
                    <div
                      key={`${d.toISOString()}-${hour}`}
                      className="border-b border-r border-gray-200 h-12 hover:bg-gray-50 transition cursor-pointer w-28 relative"
                      onClick={() => onCellClick({ date: d, hour })}
                    >
                      {dayEvents.map((evt, idx) => (
                        <div
                          key={`${evt.id}-${idx}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(evt);
                          }}
                          className="absolute inset-1 rounded text-xs text-white p-1 overflow-hidden"
                          style={{ backgroundColor: MAROON }}
                          title={evt.title}
                        >
                          <div className="font-semibold">{evt.title}</div>
                          {evt.location && (
                            <div className="text-[10px] opacity-90">{evt.location}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==================== ADD EVENT PANEL ====================

function AddEventPanel({ onCreateEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    location_name: '',
    starts_at: '',
    ends_at: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.starts_at) {
      alert('Please fill in title and start time');
      return;
    }

    setIsSubmitting(true);
    
    // Convert to Central Time for consistent storage
    const starts_at = fromCentralTime(formData.starts_at);
    const ends_at = formData.ends_at ? fromCentralTime(formData.ends_at) : null;
    
    const success = await onCreateEvent({
      title: formData.title,
      location_name: formData.location_name,
      starts_at,
      ends_at,
      description: formData.description
    });

    if (success) {
      // Reset form
      setFormData({
        title: '',
        location_name: '',
        starts_at: '',
        ends_at: '',
        description: ''
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold text-gray-900">
          Add Event
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-white"
              style={{ outlineColor: MAROON }}
              placeholder="Team meeting..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              name="location_name"
              value={formData.location_name}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-white"
              style={{ outlineColor: MAROON }}
              placeholder="Conference room A..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Time *
            </label>
            <input 
              name="starts_at"
              value={formData.starts_at}
              onChange={handleInputChange}
              type="datetime-local" 
              className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-white"
              style={{ outlineColor: MAROON }}
              required
            />
          </div>
          
          <div className="flex items-end">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white rounded-xl py-3 font-semibold hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
              style={{ backgroundColor: MAROON }}
            >
              {isSubmitting ? 'Adding...' : 'Add Event'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ==================== EVENT DRAWER ====================

function EventDrawer({ slot, event, onCreateEvent, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    location_name: '',
    starts_at: '',
    ends_at: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form when slot is selected (clicking on time slot)
  useEffect(() => {
    if (slot && !event) {
      // Format the date and hour for datetime-local input
      const year = slot.date.getFullYear();
      const month = String(slot.date.getMonth() + 1).padStart(2, '0');
      const day = String(slot.date.getDate()).padStart(2, '0');
      const hour = String(slot.hour).padStart(2, '0');
      const dateTimeString = `${year}-${month}-${day}T${hour}:00`;
      
      setFormData(prev => ({
        ...prev,
        starts_at: dateTimeString
      }));
    }
  }, [slot, event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.starts_at) {
      alert('Please fill in title and start time');
      return;
    }

    setIsSubmitting(true);
    
    // Convert to Central Time for consistent storage
    const starts_at = fromCentralTime(formData.starts_at);
    const ends_at = formData.ends_at ? fromCentralTime(formData.ends_at) : null;
    
    const success = await onCreateEvent({
      title: formData.title,
      location_name: formData.location_name,
      starts_at,
      ends_at,
      description: formData.description
    });

    if (success) {
      // Reset form and close drawer
      setFormData({
        title: '',
        location_name: '',
        starts_at: '',
        ends_at: '',
        description: ''
      });
      onClose();
    }
    
    setIsSubmitting(false);
  };
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-50" onClick={onClose}>
      <div 
        className="bg-white w-full sm:w-96 h-full p-6 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">
            {event ? "Event Details" : "Add Event"}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {event ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Title</label>
              <p className="text-lg font-bold text-gray-900">{event.title}</p>
            </div>
            
            {event.location && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Location</label>
                <p className="text-gray-900">{event.location}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm font-semibold text-gray-600">Start</label>
              <p className="text-gray-900">
                {toCentralTime(event.start).toLocaleString("en-US", {
                  timeZone: "America/Chicago",
                  weekday: "short",
                  month: "short", 
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit"
                })} CST
              </p>
            </div>
            
            {event.end && (
              <div>
                <label className="text-sm font-semibold text-gray-600">End</label>
                <p className="text-gray-900">
                  {toCentralTime(event.end).toLocaleString("en-US", {
                    timeZone: "America/Chicago",
                    weekday: "short",
                    month: "short",
                    day: "numeric", 
                    hour: "numeric",
                    minute: "2-digit"
                  })} CST
                </p>
              </div>
            )}

            {event.recurrence && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Repeats</label>
                <p className="text-gray-900">
                  {event.recurrence.freq} 
                  {event.recurrence.byDay && ` on ${event.recurrence.byDay.join(', ')}`}
                </p>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="mt-6 w-full text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: MAROON }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-xl p-3"
                style={{ outlineColor: MAROON }}
                placeholder="Team meeting..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                name="location_name"
                value={formData.location_name}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-xl p-3"
                style={{ outlineColor: MAROON }}
                placeholder="Location"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-xl p-3 h-20 resize-none"
                style={{ outlineColor: MAROON }}
                placeholder="Event description..."
              />
            </div>

            {slot && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Selected time slot:</strong><br/>
                  {slot.date.toLocaleDateString()} at {slot.hour}:00
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
              style={{ backgroundColor: MAROON }}
            >
              {isSubmitting ? 'Creating Event...' : 'Add Event'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}