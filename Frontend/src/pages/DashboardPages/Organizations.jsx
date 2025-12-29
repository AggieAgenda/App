// src/pages/Organizations.jsx
import { useMemo, useState } from "react";

const MAROON = "#500000";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function Organizations() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("recommended"); // "recommended" | "overall"
  const [selectedTags, setSelectedTags] = useState(new Set());

  // Replace this with your API fetch later
  const organizations = useMemo(
    () => [
      {
        name: "Aggie Coding Club",
        image: "/org_coding_club.jpg",
        description:
          "Build projects, prep for interviews, and meet other Aggie developers. Weekly workshops + hack nights.",
        tags: ["tech", "computer science", "workshops"],
        members: 240,
        meetingTime: "Thurs 7:00 PM",
        location: "Zachry 101",
        link: "https://example.com",
      },
      {
        name: "Aggie Business Society",
        image: "/org_business.jpg",
        description:
          "Professional development, networking, and case competitions for students exploring business careers.",
        tags: ["business", "networking", "career"],
        members: 180,
        meetingTime: "Tues 6:30 PM",
        location: "Wehner 113",
        link: "https://example.com",
      },
      {
        name: "Volunteer Aggies",
        image: "/org_volunteer.jpg",
        description:
          "Community service events around College Station with a social, welcoming vibe. No experience needed.",
        tags: ["service", "community", "free"],
        members: 320,
        meetingTime: "Varies",
        location: "Off-campus",
        link: "https://example.com",
      },
      {
        name: "Aggie Design Team",
        image: "/org_design.jpg",
        description:
          "Work on real product/UI projects, learn Figma, and collaborate with devs to ship polished experiences.",
        tags: ["design", "tech", "projects"],
        members: 95,
        meetingTime: "Mon 7:00 PM",
        location: "MSC 2400",
        link: "https://example.com",
      },
      {
        name: "Pre-Health Aggies",
        image: "/org_prehealth.jpg",
        description:
          "Shadowing tips, exam prep, and mentorship for students pursuing medicine, PA, nursing, and more.",
        tags: ["health", "mentorship", "career"],
        members: 210,
        meetingTime: "Wed 6:00 PM",
        location: "ILCB 110",
        link: "https://example.com",
      },
      {
        name: "Aggie Outdoors",
        image: "/org_outdoors.jpg",
        description:
          "Weekend hikes, camping trips, and outdoor skill workshops. Great way to explore Texas with friends.",
        tags: ["outdoors", "community", "trips"],
        members: 160,
        meetingTime: "Fri evenings",
        location: "Meet-up spots vary",
        link: "https://example.com",
      },
    ],
    []
  );

  // Collect all tags for chips
  const allTags = useMemo(() => {
    const set = new Set();
    for (const o of organizations) (o.tags || []).forEach((t) => set.add(t));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [organizations]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  // Search + tag filtering (shared across modes)
  const filteredOrganizations = useMemo(() => {
    const q = search.trim().toLowerCase();

    return organizations
      .filter((o) => {
        const tags = (o.tags || []).map((t) => t.toLowerCase());
        const matchesSearch =
          !q ||
          o.name.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          (o.location || "").toLowerCase().includes(q) ||
          tags.some((t) => t.includes(q));

        const matchesTags =
          selectedTags.size === 0 || (o.tags || []).some((t) => selectedTags.has(t));

        return matchesSearch && matchesTags;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [organizations, search, selectedTags]);

  // Simple “recommended” scoring:
  // - boosts selected tag matches
  // - boosts org size slightly
  // - boosts certain tags globally
  const recommendedOrganizations = useMemo(() => {
    const boosts = {
      career: 1.4,
      networking: 1.2,
      tech: 1.2,
      "computer science": 1.2,
      service: 1.1,
    };

    const scoreOrg = (o) => {
      const tagMatchBoost =
        selectedTags.size === 0
          ? 0.4 // small baseline so list doesn't feel random
          : (o.tags || []).reduce((acc, t) => acc + (selectedTags.has(t) ? 1.25 : 0), 0);

      const tagBoost = (o.tags || []).reduce((acc, t) => acc + (boosts[t] || 0), 0);

      const sizeBoost = Math.min(1.2, (o.members || 0) / 300); // cap

      return tagMatchBoost + tagBoost + sizeBoost;
    };

    return [...filteredOrganizations]
      .map((o) => ({ o, score: scoreOrg(o) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.o);
  }, [filteredOrganizations, selectedTags]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl px-6 pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Organizations</h1>
            <p className="text-gray-600">
              Discover student orgs. Filter by tags and find your people.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 w-full sm:w-auto">
            {[
              { key: "recommended", label: "Recommended" },
              { key: "overall", label: "All Orgs" },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={classNames(
                  "flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition",
                  mode === m.key ? "text-white" : "text-gray-700 hover:bg-white"
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
            placeholder="Search orgs, descriptions, locations, or tags…"
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
            style={
              selectedTags.size === 0 ? { backgroundColor: MAROON, borderColor: MAROON } : undefined
            }
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
                  active ? "text-white" : "text-gray-700 border-gray-200 hover:bg-gray-50"
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
                ? "Based on your selected tags and popular orgs."
                : "Popular picks. Select tags to personalize."
            }
          >
            <OrganizationGrid organizations={recommendedOrganizations} />
          </Section>
        )}

        {mode === "overall" && (
          <Section title="All organizations" subtitle="Everything that matches your search and tags.">
            <OrganizationGrid organizations={filteredOrganizations} />
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

function OrganizationGrid({ organizations }) {
  if (!organizations.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-gray-700">
        No organizations match your search/tags.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
      {organizations.map((org, idx) => (
        <OrganizationCard key={`${org.name}-${idx}`} org={org} />
      ))}
    </div>
  );
}

function OrganizationCard({ org }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
      <img
        src={org.image}
        alt={org.name}
        className="w-full h-44 object-cover"
        onError={(e) => {
          // optional fallback if you don't have images yet
          e.currentTarget.style.display = "none";
        }}
      />

      <div className="p-4">
        <h3 className="text-xl font-extrabold mb-1" style={{ color: MAROON }}>
          {org.name}
        </h3>

        <div className="text-sm text-gray-500 mb-2 flex flex-wrap gap-x-3 gap-y-1">
          {org.members != null && <span>{org.members} members</span>}
          {org.meetingTime && <span>• {org.meetingTime}</span>}
          {org.location && <span>• {org.location}</span>}
        </div>

        <p className="text-sm text-gray-700 mb-3">{org.description}</p>

        <div className="flex flex-wrap gap-2">
          {(org.tags || []).slice(0, 6).map((t) => (
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

        {org.link && (
          <a
            href={org.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex mt-4 text-sm font-semibold"
            style={{ color: MAROON }}
          >
            View organization →
          </a>
        )}
      </div>
    </div>
  );
}
