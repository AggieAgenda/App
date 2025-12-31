import { useState } from "react";

const MAROON = "#500000";
const START_HOUR = 6;
const END_HOUR = 22;

// ==================== IMPORT/EXPORT FUNCTIONS ====================

function handleImportICS() {
  // TODO: Implement ICS import functionality
  console.log("Import ICS clicked");
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
    const eventStart = new Date(evt.start);
    
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

  const userCalendar = {
    userId: "user_123",
    timezone: "America/Chicago",
    events: {
      evt_1: {
        id: "evt_1",
        title: "Phys 206",
        location: "Bloc 202",
        start: "2025-02-03T11:00:00-06:00",
        end: "2025-02-03T13:00:00-06:00",
        recurrence: {
          freq: "WEEKLY",
          byDay: ["MO", "WE", "FR"],
          count: 10
        },
        exceptions: []
      },
      evt_2: {
        id: "evt_2",
        title: "ACC Party",
        location: "TBD",
        start: "2025-02-15T12:00:00-06:00",
        end: null,
        recurrence: null,
        exceptions: []
      },
      evt_3: {
        id: "evt_3",
        title: "Part-Time Job",
        location: "Work",
        start: "2025-02-03T15:00:00-06:00",
        end: "2025-02-03T19:00:00-06:00",
        recurrence: {
          freq: "WEEKLY",
          byDay: ["MO", "WE"]
        },
        exceptions: []
      },
      evt_4: {
        id: "evt_4",
        title: "CS 341 Lecture",
        location: "Engineering Hall 101",
        start: "2025-02-04T09:30:00-06:00",
        end: "2025-02-04T10:45:00-06:00",
        recurrence: {
          freq: "WEEKLY",
          byDay: ["TU", "TH"]
        },
        exceptions: []
      },
      evt_5: {
        id: "evt_5",
        title: "Gym",
        location: "Rec Center",
        start: "2025-02-05T18:00:00-06:00",
        end: "2025-02-05T19:00:00-06:00",
        recurrence: {
          freq: "DAILY",
          count: 5
        },
        exceptions: ["2025-02-07T18:00:00-06:00"]
      },
      evt_6: {
        id: "evt_6",
        title: "Midterm Exam",
        location: "Bloc 202",
        start: "2025-02-21T19:00:00-06:00",
        end: "2025-02-21T21:00:00-06:00",
        recurrence: null,
        exceptions: []
      },
      evt_7: {
        id: "evt_7",
        title: "Hackathon",
        location: "Student Union",
        start: "2025-02-08T10:00:00-06:00",
        end: "2025-02-09T10:00:00-06:00",
        recurrence: null,
        exceptions: []
      },
      evt_8: {
        id: "evt_8",
        title: "Team Standup",
        location: "Zoom",
        start: "2025-02-03T10:00:00-06:00",
        end: "2025-02-03T10:15:00-06:00",
        recurrence: {
          freq: "WEEKLY",
          byDay: ["MO", "TU", "WE", "TH", "FR"]
        },
        exceptions: []
      },
      evt_9: {
        id: "evt_9",
        title: "Doctor Appointment",
        location: "Health Center",
        start: "2025-02-12T14:30:00-06:00",
        end: "2025-02-12T15:15:00-06:00",
        recurrence: null,
        exceptions: []
      },
      evt_10: {
        id: "evt_10",
        title: "Study Group",
        location: "Library Room 3",
        start: "2025-02-06T17:00:00-06:00",
        end: "2025-02-06T19:00:00-06:00",
        recurrence: {
          freq: "WEEKLY",
          byDay: ["TH"],
          count: 4
        },
        exceptions: []
      }
    }
  };

  const changeDate = (delta) => {
    const d = new Date(currentDate);
    if (view === "month") d.setMonth(d.getMonth() + delta);
    else d.setDate(d.getDate() + delta * 7);
    setCurrentDate(d);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        <CalendarHeader
          view={view}
          setView={setView}
          currentDate={currentDate}
          changeDate={changeDate}
           onImport={handleImportICS} onExport={handleExportToGoogle}
        />

        <div className="p-6">
          {view === "month" ? (
            <MonthView 
              currentDate={currentDate} 
              events={userCalendar.events}
              onEventClick={setSelectedEvent}
            />
          ) : (
            <WeekView
              currentDate={currentDate}
              events={userCalendar.events}
              onCellClick={setSelectedSlot}
              onEventClick={setSelectedEvent}
            />
          )}
        </div>

        <div className="border-t border-gray-200 bg-gray-50">
          <AddEventPanel />
        </div>
      </div>

      {(selectedSlot || selectedEvent) && (
        <EventDrawer
          slot={selectedSlot}
          event={selectedEvent}
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
            IsSameDay(new Date(evt.start), cellDate)
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
                  const dayEvents = expandedEvents.filter(e => {
                    const eventDate = new Date(e.start);
                    return IsSameDay(eventDate, d) && eventDate.getHours() === hour;
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

function AddEventPanel() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold text-gray-900">
          Add Event
        </h3>
        <div className="flex gap-2">
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Event Title
          </label>
          <input
            className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-white"
            style={{ outlineColor: MAROON }}
            placeholder="Team meeting..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <input
            className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-white"
            style={{ outlineColor: MAROON }}
            placeholder="Conference room A..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Start Time
          </label>
          <input 
            type="datetime-local" 
            className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-white"
            style={{ outlineColor: MAROON }}
          />
        </div>
        
        <div className="flex items-end">
          <button 
            className="w-full text-white rounded-xl py-3 font-semibold hover:opacity-90 transition-all shadow-sm"
            style={{ backgroundColor: MAROON }}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== EVENT DRAWER ====================

function EventDrawer({ slot, event, onClose }) {
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
                {new Date(event.start).toLocaleString()}
              </p>
            </div>
            
            {event.end && (
              <div>
                <label className="text-sm font-semibold text-gray-600">End</label>
                <p className="text-gray-900">
                  {new Date(event.end).toLocaleString()}
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
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl p-3"
                placeholder="Event title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl p-3"
                placeholder="Location"
              />
            </div>

            {slot && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date & Time
                </label>
                <p className="text-gray-900">
                  {slot.date.toLocaleDateString()} at {slot.hour}:00
                </p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: MAROON }}
        >
          {event ? "Close" : "Save Event"}
        </button>
      </div>
    </div>
  );
}