// src/pages/Features.jsx
import React, { useMemo, useState } from "react";
import NavBar from "../components/Navbar.jsx";
import SearchBar from '../components/SearchBar.jsx';

const FEATURES = [
  { id: 1, title: "Stay On Track", body: "Integrated calendar + class schedule keeps you organized without the stress." },
  { id: 2, title: "Never Miss a Deadline", body: "Assignments, projects, and exams are tracked with reminders built in." },
  { id: 3, title: "Find Your Community", body: "Discover clubs, campus events, and career fairs — connect with Aggie life on and off campus." },
  { id: 4, title: "Aggie Traditions", body: "Track events like Midnight Yell, Muster, and more to stay connected to Aggie culture." },
];

export default function Features() {
  const [query, setQuery] = useState("");
  const suggestions = FEATURES.map(f => f.title);

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return FEATURES;
    return FEATURES.filter(f =>
      f.title.toLowerCase().includes(q) || f.body.toLowerCase().includes(q)
    );
  }, [query]);

  function handleSearch(value) {
    // Called on Enter or search button
    setQuery(value);
    // Optionally navigate or log analytics here
    console.log("Search triggered for:", value);
  }

  function handleSuggestSelect(suggestion) {
    // Called when user picks a suggestion
    setQuery(suggestion);
    console.log("Suggestion selected:", suggestion);
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[white] to-white text-[#1a1a1a]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 h-72 bg-[#305d6f] rounded-full filter blur-3xl opacity-30 animate-float1 top-10 left-20"></div>
        <div className="absolute w-96 h-96 bg-[#f4d8aa] rounded-full filter blur-3xl opacity-40 animate-float2 bottom-20 right-10"></div>
        <div className="absolute w-64 h-64 bg-[#3c7289] rounded-full filter blur-3xl opacity-25 animate-float3 top-1/3 right-1/3"></div>
      </div>

      <NavBar />

      <section className="flex flex-col items-center justify-center px-10 md:px-20 py-20 max-w-7xl mx-auto w-full flex-grow">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-6">
            <h2 className="text-5xl font-extrabold text-[var(--maroon)] drop-shadow-md mb-4">Features</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">Everything you need to stay organized and connected at Texas A&M</p>
          </div>

          <div className="mb-8 flex justify-center">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
              onSuggestSelect={handleSuggestSelect}
              suggestions={suggestions}
              debounceMs={200}
              placeholder="Search features, events, or keywords..."
              inputClassName="bg-white/80"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filtered.map(f => (
              <div key={f.id} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-[var(--maroon)] mb-3">{f.title}</h3>
                <p className="text-gray-700">{f.body}</p>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-600">No results for <span className="font-medium">{query}</span></div>
            )}
          </div>
        </div>
      </section>

      <footer className="w-full bg-[var(--secondary-color)] text-white py-6 text-center mt-auto">
        <div className="space-x-4 mb-2">
          <a href="https://instagram.com/aggieagenda" className="hover:text-[#f4d8aa]">Instagram</a>
          <a href="https://linkedin.com/company/aggie-agenda" className="hover:text-[#f4d8aa]">LinkedIn</a>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Aggie Agenda. All rights reserved.</p>
      </footer>
    </div>
  );
}