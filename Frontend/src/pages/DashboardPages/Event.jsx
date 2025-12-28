// src/pages/Event.jsx
import { useMemo, useState } from "react";

const MAROON = "#500000";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date, delta) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function ymd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function daysDiff(a, b) {
  // a, b are Date
  const ms = 24 * 60 * 60 * 1000;
  const da = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const db = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.round((db - da) / ms);
}

export default function Event() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("recommended"); // "recommended" | "overall" | "calendar"
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [calendarMonth, setCalendarMonth] = useState(() => startOfMonth(new Date()));

  const events = useMemo(
    () => [
    {
      title: "Midnight Yell",
      date: "2025-02-14",
      image: "/midnight_yell.jpg",
      description:
        "Join fellow Aggies at Kyle Field for the iconic midnight tradition before every home game.",
      tags: ["tradition", "free", "campus"],
    },
    {
      title: "Muster",
      date: "2025-04-21",
      image: "/AggieMuster.jpg",
      description:
        "A cherished ceremony honoring Aggies who have passed, reminding us that once an Aggie, always an Aggie.",
      tags: ["tradition", "campus"],
    },
    {
      title: "Fish Camp",
      date: "2025-08-01",
      image: "/fish_camp_run1.jpg",
      description:
        "Welcome new Aggies to campus life with a week of bonding, laughter, and unforgettable traditions.",
      tags: ["tradition", "freshmen", "campus"],
    },
    {
      title: "Silver Taps",
      date: "2025-03-03",
      image: "/silver_taps_run1.jpg",
      description:
        "A solemn ceremony held to honor the memory of students who have passed away during the year.",
      tags: ["tradition", "campus"],
    },
    {
      title: "Career Fair",
      date: "2025-09-20",
      image: "/career_fair_run1.jpg",
      description:
        "Meet recruiters and explore opportunities with top companies seeking Aggie engineers and leaders.",
      tags: ["career fair", "business", "tech", "computer science"],
    },
    {
      title: "Ring Day",
      date: "2025-04-25",
      image: "/aggie_ringday_run1.jpg",
      description:
        "Celebrate receiving your Aggie Ring — a symbol of hard work, tradition, and achievement.",
      tags: ["tradition", "campus"],
    },
  ],
    []
  );

  // Collect all tags for chips
  const allTags = useMemo(() => {
    const set = new Set();
    for (const e of events) (e.tags || []).forEach((t) => set.add(t));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [events]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  // Search + tag filtering (shared across modes)
  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();

    return events
      .filter((e) => {
        const tags = (e.tags || []).map((t) => t.toLowerCase());
        const matchesSearch =
          !q ||
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          tags.some((t) => t.includes(q));

        const matchesTags =
          selectedTags.size === 0 ||
          (e.tags || []).some((t) => selectedTags.has(t));

        return matchesSearch && matchesTags;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, search, selectedTags]);

  // A simple “recommended” score you can improve later
  // - prefers upcoming within ~45 days
  // - prefers events matching selected tags
  // - slight boost for certain tags
  const recommendedEvents = useMemo(() => {
    const now = new Date();
    const boosts = {
      "free food": 3,
      "career fair": 2,
      tech: 1.5,
      "computer science": 1.5,
      business: 1.2,
    };

    const scoreEvent = (e) => {
      const eventDate = new Date(e.date + "T00:00:00");
      const daysAway = daysDiff(now, eventDate);

      // Past events should drop off
      if (daysAway < 0) return -999;

      // Upcoming boost (peaks around 0-14, fades by 45)
      const soonBoost = Math.max(0, 45 - daysAway) / 10;

      // Tag match boost based on user selection
      const tagMatchBoost =
        selectedTags.size === 0
          ? 0
          : (e.tags || []).reduce((acc, t) => acc + (selectedTags.has(t) ? 1.25 : 0), 0);

      // Global tag boosts
      const tagBoost =
        (e.tags || []).reduce((acc, t) => acc + (boosts[t] || 0), 0) / 2;

      return soonBoost + tagMatchBoost + tagBoost;
    };

    return [...filteredEvents]
      .map((e) => ({ e, score: scoreEvent(e) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.e);
  }, [filteredEvents, selectedTags]);

  // Calendar map: "YYYY-MM-DD" -> events[]
  const calendarEventsByDay = useMemo(() => {
    const map = new Map();
    for (const e of filteredEvents) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date).push(e);
    }
    return map;
  }, [filteredEvents]);

  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const firstDayOfGrid = useMemo(() => {
    // Sunday-start calendar (0 = Sunday)
    const d = new Date(monthStart);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }, [monthStart]);

  const calendarDays = useMemo(() => {
    const days = [];
    const d = new Date(firstDayOfGrid);
    // 6 rows x 7 cols = 42 days grid
    for (let i = 0; i < 42; i++) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return days;
  }, [firstDayOfGrid]);

  return (
    <div className=" flex flex-col items-center ">
      <div className="w-full max-w-6xl px-6 pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Events</h1>
            <p className="text-gray-600">
              Browse what’s happening around campus. Filter by tags and pick a view.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 w-full sm:w-auto">
            {[
              { key: "recommended", label: "Recommended" },
              { key: "overall", label: "Overall" },
              { key: "calendar", label: "Calendar" },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={classNames(
                  "flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition",
                  mode === m.key
                    ? "text-white"
                    : "text-gray-700 hover:bg-white"
                )}
                style={mode === m.key ? { backgroundColor: MAROON } : undefined}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search events, descriptions, or tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
            style={{ outlineColor: MAROON }}
          />
        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedTags(new Set())}
            className={classNames(
              "px-3 py-1.5 rounded-full text-sm border transition",
              selectedTags.size === 0
                ? "text-white"
                : "text-gray-700 border-gray-200 hover:bg-gray-50"
            )}
            style={selectedTags.size === 0 ? { backgroundColor: MAROON, borderColor: MAROON } : undefined}
          >
            All
          </button>

          {allTags.map((tag) => {
            const active = selectedTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={classNames(
                  "px-3 py-1.5 rounded-full text-sm border transition",
                  active
                    ? "text-white"
                    : "text-gray-700 border-gray-200 hover:bg-gray-50"
                )}
                style={active ? { backgroundColor: MAROON, borderColor: MAROON } : undefined}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {mode === "recommended" && (
          <Section
            title="Recommended for you"
            subtitle={
              selectedTags.size
                ? "Based on your selected tags and what’s coming up soon."
                : "Popular + upcoming picks. Select tags to personalize."
            }
          >
            <EventGrid events={recommendedEvents} />
          </Section>
        )}

        {mode === "overall" && (
          <Section
            title="All events"
            subtitle="Scroll through everything that matches your search and tags."
          >
            <EventGrid events={filteredEvents} />
          </Section>
        )}

        {mode === "calendar" && (
          <Section
            title="Calendar view"
            subtitle="Click through months and see events on specific days."
          >
            {/* Calendar controls */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCalendarMonth((d) => addMonths(d, -1))}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                ← Prev
              </button>

              <div className="text-gray-900 font-extrabold">
                {calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>

              <button
                onClick={() => setCalendarMonth((d) => addMonths(d, 1))}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Next →
              </button>
            </div>

            {/* Calendar grid */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="px-3 py-2 text-xs font-bold text-gray-600">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {calendarDays.map((d) => {
                  const inMonth = d >= monthStart && d <= monthEnd;
                  const key = ymd(d);
                  const dayEvents = calendarEventsByDay.get(key) || [];
                  const isToday = ymd(d) === ymd(new Date());

                  return (
                    <div
                      key={key}
                      className={classNames(
                        "min-h-[110px] p-2 border-b border-r border-gray-200",
                        !inMonth && "bg-gray-50/60 text-gray-400"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={classNames(
                            "text-sm font-bold",
                            inMonth ? "text-gray-900" : "text-gray-400"
                          )}
                        >
                          <span
                            className={classNames(
                              "inline-flex items-center justify-center w-7 h-7 rounded-full",
                              isToday && "text-white"
                            )}
                            style={isToday ? { backgroundColor: MAROON } : undefined}
                          >
                            {d.getDate()}
                          </span>
                        </div>

                        {dayEvents.length > 0 && (
                          <span className="text-xs font-semibold text-gray-500">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 space-y-1">
                        {dayEvents.slice(0, 2).map((e, idx) => (
                          <div
                            key={idx}
                            className="text-xs rounded-md px-2 py-1 border truncate"
                            style={{
                              borderColor: `${MAROON}33`,
                              backgroundColor: `${MAROON}0D`,
                              color: MAROON,
                            }}
                            title={e.title}
                          >
                            {e.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* List of events in the selected month */}
            <div className="mt-6">
              <h3 className="text-lg font-extrabold text-gray-900 mb-3">
                Events in {calendarMonth.toLocaleDateString("en-US", { month: "long" })}
              </h3>
              <EventList
                events={filteredEvents.filter((e) => monthKey(new Date(e.date + "T00:00:00")) === monthKey(calendarMonth))}
              />
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function EventGrid({ events }) {
  if (!events.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-gray-700">
        No events match your search/tags.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
      {events.map((event, idx) => (
        <EventCard key={`${event.title}-${event.date}-${idx}`} event={event} />
      ))}
    </div>
  );
}

function EventList({ events }) {
  if (!events.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-gray-700">
        No events this month (based on your filters).
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event, idx) => (
        <div
          key={`${event.title}-${event.date}-${idx}`}
          className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm flex gap-4"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-28 h-20 object-cover rounded-xl border border-gray-200"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="font-extrabold text-gray-900 truncate">{event.title}</div>
              <div className="text-sm text-gray-500">{formatDate(event.date)}</div>
            </div>
            <div className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(event.tags || []).slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-full border"
                  style={{
                    borderColor: `${MAROON}33`,
                    backgroundColor: `${MAROON}0D`,
                    color: MAROON,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EventCard({ event }) {
  const MAROON = "#500000";
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
      <img src={event.image} alt={event.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-extrabold mb-1" style={{ color: MAROON }}>
          {event.title}
        </h3>

        <p className="text-sm text-gray-500 mb-2">{formatDate(event.date)}</p>

        <p className="text-sm text-gray-700 mb-3">{event.description}</p>

        <div className="flex flex-wrap gap-2">
          {(event.tags || []).slice(0, 6).map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-full border"
              style={{
                borderColor: `${MAROON}33`,
                backgroundColor: `${MAROON}0D`,
                color: MAROON,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
