import { useEffect, useMemo, useState } from "react";

const MAROON = "#500000";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function Organizations() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("recommended");
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [organizations,setOrganizations] = useState([])
  useEffect(() => {
  let ignore = false; // prevents setting state if component unmounts mid-fetch

  async function loadOrganizations() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/organizations`, {
        headers: { "Accept": "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);

      const data = await res.json();

      // If your backend returns { success, organizations }, pick the right field:
      const orgs = data.organizations ?? data;

      if (!ignore) setOrganizations(orgs);
    } catch (err) {
      console.error("Failed to load organizations:", err);
      // optional: setError(err.message)
    }
  }

  loadOrganizations();

  return () => {
    ignore = true;
  };
}, []);
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
          ? 0.4
          : (o.tags || []).reduce((acc, t) => acc + (selectedTags.has(t) ? 1.25 : 0), 0);

      const tagBoost = (o.tags || []).reduce((acc, t) => acc + (boosts[t] || 0), 0);

      const sizeBoost = Math.min(1.2, (o.members || 0) / 300);

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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Organizations</h1>
            <p className="text-gray-600">
              Discover student orgs. Filter by tags and find your people.
            </p>
          </div>

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

        {mode === "recommended" && (
          <Section
            title="Recommended for you"
            subtitle={
              selectedTags.size
                ? "Based on your selected tags and popular orgs."
                : "Popular picks. Select tags to personalize."
            }
          >
            <OrganizationGrid organizations={recommendedOrganizations} onOrgClick={setSelectedOrg} />
          </Section>
        )}

        {mode === "overall" && (
          <Section title="All organizations" subtitle="Everything that matches your search and tags.">
            <OrganizationGrid organizations={filteredOrganizations} onOrgClick={setSelectedOrg} />
          </Section>
        )}
      </div>

      {selectedOrg && (
        <OrganizationModal org={selectedOrg} onClose={() => setSelectedOrg(null)} />
      )}
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

function OrganizationGrid({ organizations, onOrgClick }) {
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
        <OrganizationCard key={`${org.name}-${idx}`} org={org} onClick={() => onOrgClick(org)} />
      ))}
    </div>
  );
}

function OrganizationCard({ org, onClick }) {
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <img
        src={org.image}
        alt={org.name}
        className="w-full h-44 object-cover"
        onError={(e) => {
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

        <div className="mt-4 text-sm font-semibold" style={{ color: MAROON }}>
          View details →
        </div>
      </div>
    </div>
  );
}

function OrganizationModal({ org, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={org.image}
            alt={org.name}
            className="w-full h-64 object-cover rounded-t-2xl"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-extrabold mb-2" style={{ color: MAROON }}>
            {org.name}
          </h2>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span>👥 <strong>{org.members}</strong> members</span>
            <span>📅 Meets <strong>{org.meetingTime}</strong></span>
            <span>📍 <strong>{org.location}</strong></span>
            {org.founded && <span>🎯 Founded <strong>{org.founded}</strong></span>}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">About</h3>
            <p className="text-gray-700">{org.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {org.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full border text-sm"
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

          <div className="mb-6">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Contact</h3>
            <div className="space-y-2 text-gray-700">
              {org.contact_email && (
                <div>
                  <span className="font-semibold">Email: </span>
                  <a 
                    href={`mailto:${org.contact_email}`}
                    className="hover:underline"
                    style={{ color: MAROON }}
                  >
                    {org.contact_email}
                  </a>
                </div>
              )}
              {org.link && (
                <div>
                  <span className="font-semibold">Website: </span>
                  <a
                    href={org.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: MAROON }}
                  >
                    {org.link}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            {org.link && (
              <a
                href={org.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl text-white font-semibold text-center hover:opacity-90 transition"
                style={{ backgroundColor: MAROON }}
              >
                Visit Website
              </a>
            )}
            {org.contact_email && (
              <a
                href={`mailto:${org.contact_email}`}
                className="flex-1 py-3 rounded-xl border-2 font-semibold text-center hover:bg-gray-50 transition"
                style={{ borderColor: MAROON, color: MAROON }}
              >
                Contact Us
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}