export const START_HOUR = 6;
export const END_HOUR = 22;
export const MAROON = "#500000";

export function StartOfWeek(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

export function AddDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function IsSameDay(a, b) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export function GetEventsForDay(events, date) {
  return Object.values(events).filter(evt =>
    IsSameDay(new Date(evt.start), date)
  );
}


export function WeekView({ currentDate, events, onCellClick, onEventClick }) {
  const weekStart = StartOfWeek(currentDate);
  const days = Array.from({ length: 7 }).map((_, i) =>
    AddDays(weekStart, i)
  );

  return (
    <div className="grid grid-cols-8 border-t">
      <div />

      {days.map(d => (
        <div key={d.toISOString()} className="text-center font-bold py-2 border-b">
          {d.toLocaleDateString("default", { weekday: "short", day: "numeric" })}
        </div>
      ))}

      {Array.from({ length: END_HOUR - START_HOUR }).map((_, i) => {
        const hour = START_HOUR + i;
        return (
          <div key={hour} className="contents">
            <div className="text-xs px-2 border-r">
              {hour % 12 || 12}:00
            </div>
            {days.map(d => {
              const dayEvents = GetEventsForDay(events, d).filter(
                e => new Date(e.start).getHours() === hour
              );

              return (
                <div
                  key={`${d.toISOString()}-${hour}`}
                  className="border h-20 relative hover:bg-gray-50 cursor-pointer"
                  onClick={() => onCellClick({ date: d, hour })}
                >
                  {dayEvents.map(evt => (
                    <div
                      key={evt.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(evt);
                      }}
                      className="absolute inset-1 rounded text-xs text-white p-1"
                      style={{ backgroundColor: MAROON }}
                    >
                      {evt.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function EventDrawer({ slot, event, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end">
      <div className="bg-white w-full sm:w-96 h-full p-6">
        <h2 className="text-xl font-bold mb-4">
          {event ? "Edit Event" : "Add Event"}
        </h2>

        <input
          className="w-full border rounded-lg p-2 mb-3"
          defaultValue={event?.title || ""}
          placeholder="Event title"
        />

        <button
          onClick={onClose}
          className="mt-4 w-full text-white py-2 rounded-lg"
          style={{ backgroundColor: MAROON }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
