// src/pages/Features.jsx
import React, { useState, useMemo } from "react";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SearchBar from '../components/SearchBar.jsx';
import { Link } from 'react-router-dom';
// src/pages/Features.jsx (or wherever Documentation lives)


import { Search, X, BookOpen, Calendar, FileText, Users, HelpCircle, Sparkles, ChevronDown } from 'lucide-react';
import Navbar from "../components/Navbar.jsx";

export function Documentation() {
  const content = {
    "getting-started": {
      title: "Getting Started with Aggie Agenda",
      icon: Sparkles,
      color: "emerald",
      sections: [
        {
          heading: "Quick Start",
          body: "Welcome to Aggie Agenda! Get up and running in minutes. Create your account using your Texas A&M email, and you'll instantly have access to all campus events, deadlines, and organizational information.",
        },
        {
          heading: "1. Create Your Account",
          body: "Sign up with your @tamu.edu email address to verify your student status and unlock all features.",
        },
        {
          heading: "2. Import Your Schedule",
          body: "Connect your Howdy portal or manually add your class schedule. Aggie Agenda will automatically create calendar events for all your classes.",
        },
        {
          heading: "3. Upload Your Syllabi",
          body: "Use our Syllabus Reader to automatically extract assignment deadlines, exam dates, and important course information.",
        },
      ],
    },
    calendar: {
      title: "Calendar Integration",
      icon: Calendar,
      color: "blue",
      sections: [
        {
          heading: "Unified Calendar View",
          body: "See all your classes, assignments, events, and personal commitments in one unified calendar. Switch between day, week, and month views.",
        },
        {
          heading: "Google Calendar Sync",
          body: "Export your Aggie Agenda calendar to Google Calendar with one click. Any changes you make will automatically sync across both platforms.",
        },
        {
          heading: "Smart Reminders",
          body: "Set custom reminders for assignments, exams, and events. Never miss a deadline again with intelligent notification timing.",
        },
      ],
    },
    syllabus: {
      title: "Syllabus Reader",
      icon: FileText,
      color: "purple",
      sections: [
        {
          heading: "Automatic Parsing",
          body: "Upload your course syllabi and our AI-powered reader will automatically extract assignment due dates, exam schedules, office hours, and grading policies.",
        },
        {
          heading: "Supported Formats",
          body: "Works with PDF, Word documents, and images. Simply drag and drop your syllabus files into the upload area.",
        },
        {
          heading: "Manual Editing",
          body: "Review and edit any extracted information to ensure accuracy. Add notes or additional details to any assignment or deadline.",
        },
      ],
    },
    events: {
      title: "Campus Events",
      icon: Users,
      color: "amber",
      sections: [
        {
          heading: "Discover Events",
          body: "Browse all Texas A&M campus events, from career fairs to cultural celebrations. Filter by category, date, or location to find what interests you.",
        },
        {
          heading: "Aggie Traditions",
          body: "Never miss iconic Aggie traditions like Midnight Yell, Muster, Ring Day, and Silver Taps. Get automatic reminders for these special occasions.",
        },
        {
          heading: "Save & Share",
          body: "Save events to your calendar and share them with friends. See which events your friends are attending.",
        },
      ],
    },
    organizations: {
      title: "Student Organizations",
      icon: BookOpen,
      color: "rose",
      sections: [
        {
          heading: "Organization Directory",
          body: "Explore over 1,000+ student organizations at Texas A&M. Search by interest, department, or organization type to find your community.",
        },
        {
          heading: "Meeting Times",
          body: "Track meeting times for organizations you're interested in or already a member of. Get reminders before meetings start.",
        },
        {
          heading: "Contact Information",
          body: "Access officer contact information, social media links, and organization websites all in one place.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      icon: HelpCircle,
      color: "indigo",
      sections: [
        { 
          heading: "Is Aggie Agenda free?", 
          body: "Yes! Aggie Agenda is completely free for all Texas A&M students. We're built by Aggies, for Aggies." 
        },
        { 
          heading: "How do I sync with Google Calendar?", 
          body: 'Navigate to Settings > Integrations > Google Calendar and click "Connect". Follow the authorization prompts to enable two-way sync.' 
        },
        { 
          heading: "Can I use Aggie Agenda on mobile?", 
          body: "Absolutely! Aggie Agenda is fully responsive and works great on phones and tablets. We also have native iOS and Android apps coming soon." 
        },
        { 
          heading: "What if my syllabus doesn't parse correctly?", 
          body: "You can manually edit any information extracted by the Syllabus Reader. If you continue to have issues, contact our support team." 
        },
      ],
    },
  };

  // Build searchable list (one "topic" per top-level section)
  const allTopics = useMemo(() => {
    return Object.entries(content).map(([id, value]) => ({
      id,
      title: value.title,
      icon: value.icon,
      color: value.color,
      // searchable text (title + all headings/bodies)
      haystack: [
        value.title,
        ...value.sections.flatMap((s) => [s.heading, s.body]),
      ]
        .join(" ")
        .toLowerCase(),
      value,
    }));
  }, []);

  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState("getting-started");

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allTopics;
    return allTopics.filter((t) => t.haystack.includes(q));
  }, [query, allTopics]);

  const colorClasses = {
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      icon: "text-emerald-600",
      hover: "hover:bg-emerald-100"
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: "text-blue-600",
      hover: "hover:bg-blue-100"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      icon: "text-purple-600",
      hover: "hover:bg-purple-100"
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      icon: "text-amber-600",
      hover: "hover:bg-amber-100"
    },
    rose: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-700",
      icon: "text-rose-600",
      hover: "hover:bg-rose-100"
    },
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-700",
      icon: "text-indigo-600",
      hover: "hover:bg-indigo-100"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="flex-1">
        {/* Header / Search */}
        <div className="py-10">
          <Navbar />
        </div>
        
        <section className="px-6 pt-16 pb-12">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                <BookOpen className="w-8 h-8 text-red-900" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Documentation
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about Aggie Agenda
              </p>
              {/*<button className=""> Go Back</button> make a go back button to get back to home*/}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search documentation...'
                  className="w-full rounded-2xl border-2 border-gray-200 bg-white pl-12 pr-12 py-4 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                />
                {query.length > 0 && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {/* Search hint */}
              {query.length === 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="text-sm text-gray-500">Try:</span>
                  {["Google Calendar", "syllabus", "reminders", "events"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Topic list + expandable content */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            {/* Results count */}
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {query ? (
                  <>
                    Found <span className="font-semibold text-gray-900">{filteredTopics.length}</span>{" "}
                    {filteredTopics.length === 1 ? "result" : "results"}
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-gray-900">{filteredTopics.length}</span>{" "}
                    {filteredTopics.length === 1 ? "topic" : "topics"} available
                  </>
                )}
              </div>
            </div>

            {/* Topics */}
            <div className="space-y-4">
              {filteredTopics.map((topic) => {
                const isOpen = openId === topic.id;
                const Icon = topic.icon;
                const colors = colorClasses[topic.color];
                
                return (
                  <div
                    key={topic.id}
                    className={`bg-white border-2 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden ${
                      isOpen ? 'border-red-900' : 'border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? "" : topic.id)}
                      className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-xl font-bold text-gray-900 mb-1">
                          {topic.value.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {topic.value.sections.length} section{topic.value.sections.length === 1 ? "" : "s"}
                        </div>
                      </div>
                      
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isOpen ? 'bg-red-900 text-white rotate-180' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 bg-gradient-to-b from-gray-50 to-white">
                        <div className="space-y-4 pt-2">
                          {topic.value.sections.map((s, idx) => (
                            <div 
                              key={idx} 
                              className="rounded-xl bg-white border border-gray-200 p-5 hover:border-gray-300 transition-colors shadow-sm"
                            >
                              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                                <span className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold mt-0.5`}>
                                  {idx + 1}
                                </span>
                                <span>{s.heading}</span>
                              </h3>
                              <p className="text-gray-700 leading-relaxed pl-8">
                                {s.body}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Help section */}
                        <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <HelpCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-blue-900 mb-1">
                                Need more help?
                              </h4>
                              <p className="text-blue-800 text-sm mb-3">
                                Can't find what you're looking for? Our support team is here to help.
                              </p>
                              <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-red-900 text-white px-5 py-2.5 rounded-lg hover:bg-red-800 transition-colors font-medium text-sm shadow-md hover:shadow-lg"
                              >
                                Contact Support
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* No results */}
              {filteredTopics.length === 0 && (
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find anything matching{" "}
                    <span className="font-semibold text-gray-900">"{query}"</span>
                  </p>
                  <button
                    onClick={() => setQuery("")}
                    className="text-red-900 hover:text-red-800 font-medium"
                  >
                    Clear search and browse all topics
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ==================== LEARN MORE PAGE ====================
export function LearnMore() {
  const benefits = [
    {
      icon: '⏰',
      title: 'Save Time',
      description: 'Stop juggling multiple calendars and apps. Everything you need is in one place, saving you hours every week.'
    },
    {
      icon: '🎯',
      title: 'Stay Focused',
      description: 'Smart reminders and deadline tracking keep you on top of your coursework without the stress.'
    },
    {
      icon: '🤝',
      title: 'Build Community',
      description: 'Discover events, join organizations, and connect with fellow Aggies who share your interests.'
    },
    {
      icon: '📈',
      title: 'Boost Success',
      description: 'Better organization leads to better grades. Students using Aggie Agenda report higher GPAs and less stress.'
    },
  ];

  const testimonials = [
    {
      quote: "Aggie Agenda completely transformed how I manage my time. I went from constantly stressed to actually having time for friends and organizations.",
      name: "Sarah M.",
      year: "Class of '25",
      major: "Biomedical Engineering"
    },
    {
      quote: "The syllabus reader alone is worth it. No more manually entering every assignment from 5 different syllabi.",
      name: "Marcus T.",
      year: "Class of '26",
      major: "Computer Science"
    },
    {
      quote: "I found my favorite student org through the events feature. Now I'm on the exec board!",
      name: "Emily R.",
      year: "Class of '25",
      major: "Business Administration"
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <NavBar />
      <h1 className="py-15"></h1>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-10 border-b border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Your College Experience, Simplified
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            Aggie Agenda helps Texas A&M students balance academics, social life, and traditions—all in one powerful platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-red-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <Link 
              to="/documentation" 
              className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-md"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-red-900 mb-12">
            How It Works
          </h2>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="bg-red-900 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign Up & Import</h3>
                <p className="text-gray-700">Create your account and import your class schedule from Howdy. Takes less than 2 minutes.</p>
              </div>
              <div className="flex-1">
                <div className="bg-red-900 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Syllabi</h3>
                <p className="text-gray-700">Upload your course syllabi and let our AI extract all deadlines and important dates automatically.</p>
              </div>
              <div className="flex-1">
                <div className="bg-red-900 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Organized</h3>
                <p className="text-gray-700">View your unified calendar, get smart reminders, and discover campus events—all in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-red-900 mb-12">
            What Aggies Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.year}</p>
                  <p className="text-sm text-gray-600">{testimonial.major}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-10 bg-red-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Organized?</h2>
          <p className="text-xl mb-8 text-red-100">
            Join thousands of Aggies who are already using Aggie Agenda to succeed.
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-white text-red-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Start Free Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ==================== SOLUTIONS/FEATURES PAGE ====================
export function Solutions() {
  const solutions = [
    {
      id: 1,
      name: "Syllabus Reader",
      icon: "📚",
      description: "Upload your course syllabi and let AI do the heavy lifting. Our intelligent parser extracts assignment deadlines, exam dates, office hours, and grading policies automatically.",
      features: [
        "Supports PDF, Word, and image formats",
        "Automatic deadline extraction",
        "Manual editing and refinement",
        "Links directly to your calendar"
      ],
      color: "bg-blue-50 border-blue-200"
    },
    {
      id: 2,
      name: "Calendar Integration",
      icon: "📅",
      description: "Sync your entire academic life in one unified calendar. Export to Google Calendar with one click and keep everything in perfect sync across all your devices.",
      features: [
        "Unified view of classes, assignments, and events",
        "Two-way Google Calendar sync",
        "Day, week, and month views",
        "Color-coded categories"
      ],
      color: "bg-green-50 border-green-200"
    },
    {
      id: 3,
      name: "Campus Events Finder",
      icon: "🎉",
      description: "Never miss out on what's happening at Texas A&M. Discover campus events, career fairs, workshops, and Aggie traditions—all filtered to match your interests.",
      features: [
        "Browse 100+ weekly campus events",
        "Filter by category, date, or location",
        "Automatic Aggie tradition reminders",
        "Save and share with friends"
      ],
      color: "bg-purple-50 border-purple-200"
    },
    {
      id: 4,
      name: "Organization Directory",
      icon: "👥",
      description: "Explore over 1,000 student organizations at Texas A&M. Find clubs that match your interests, track meeting times, and connect with officers—all in one searchable directory.",
      features: [
        "Search 1,000+ student organizations",
        "Filter by interest or department",
        "Meeting time tracking and reminders",
        "Direct contact with organization officers"
      ],
      color: "bg-amber-50 border-amber-200"
    },
    {
      id: 5,
      name: "Smart Reminders",
      icon: "⏰",
      description: "Set custom reminders for assignments, exams, and events. Our intelligent notification system learns your preferences and sends timely alerts so you never miss a deadline.",
      features: [
        "Customizable notification timing",
        "Email and push notifications",
        "Priority-based alerts",
        "Snooze and reschedule options"
      ],
      color: "bg-red-50 border-red-200"
    },
    {
      id: 6,
      name: "Grade Tracking",
      icon: "📊",
      description: "Monitor your academic progress throughout the semester. Track assignment grades, calculate your GPA, and see how future assignments will impact your final grade.",
      features: [
        "Real-time GPA calculator",
        "What-if scenario planning",
        "Grade distribution by course",
        "Semester and cumulative tracking"
      ],
      color: "bg-indigo-50 border-indigo-200"
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <NavBar />
      <h1 className="py-10"></h1>
      {/* Hero Section */}
      <section className="py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-red-900 mb-6">
            Powerful Features for Aggies
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Everything you need to succeed at Texas A&M, thoughtfully designed and built specifically for the Aggie experience.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution) => (
              <div 
                key={solution.id}
                className={`${solution.color} border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{solution.icon}</div>
                  <h2 className="text-3xl font-bold text-gray-900">{solution.name}</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {solution.description}
                </p>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-10 bg-red-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
          <p className="text-xl mb-8 text-red-100">
            Get started with Aggie Agenda today—it's completely free for all Texas A&M students.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-red-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </Link>
            <Link 
              to="/documentation" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              View Docs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}