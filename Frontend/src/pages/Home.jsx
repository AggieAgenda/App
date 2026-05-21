import React, { useState, useEffect, useRef } from "react";
import { Calendar, Upload, Download, MapPin, Users, ArrowRight, ChevronUp, ArrowDown } from "lucide-react";
import homeImage from "../assets/home_Image.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


/** Hook: tells you when an element enters the viewport */
function useInView({ threshold = 0.12, rootMargin = "0px 0px -8% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);
  return { ref, inView };
}

/** Wrapper: fade + slight slide up */
function FadeIn({ children, className = "", delayMs = 0, as: Tag = "div" }) {
  const { ref, inView } = useInView();
  return (
    <Tag
      ref={ref}
      className={[
        "transition-all duration-600 ease-out will-change-[opacity,transform]",
        "motion-reduce:transition-none motion-reduce:transform-none",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </Tag>
  );
}

// Mobbin-style grid card
function FeatureCard({ Icon, title, description, imageSrc, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delayMs={index * 60}>
      <div
        className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:border-gray-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Card Header */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-gray-50">
          <div className="w-8 h-8 rounded-lg bg-[#500000]/8 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-[#500000]" strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate leading-snug">{title}</p>
          </div>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: "4/3" }}>
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Hover overlay with description */}
          <div
            className={[
              "absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center p-5 transition-all duration-300",
              hovered ? "opacity-100" : "opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <p className="text-sm text-gray-600 leading-relaxed text-center">{description}</p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function AggieAgendaHome() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight || 1;
      const clientHeight = doc.clientHeight || 1;
      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const features = [
    {
      Icon: Calendar,
      title: "One Shot Your Calendar",
      description:
        "Pull every assignment, exam, and event into a single clean view instantly. No more juggling Canvas, Gmail, clubs, and class reminders. One click, and you're organized for the semester.",
      imageSrc: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    },
    {
      Icon: Upload,
      title: "Reads Your Syllabus",
      description:
        "Stop manually entering dates. Our algorithm instantly processes your syllabus and extracts every deadline, exam, and reading. Whether it's a PDF, DOC, or photo, we find all the key dates so you don't have to.",
      imageSrc: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    },
    {
      Icon: Download,
      title: "Export To Google Calendar",
      description:
        "Send your full schedule straight to Google Calendar with zero manual input. Access your day at a glance whether you're on your phone rushing to class or planning out your week.",
      imageSrc: "https://cdn.dribbble.com/userupload/42320361/file/original-5f30f82a2c4b30bcda8761587f11a40c.gif",
    },
    {
      Icon: MapPin,
      title: "Find Events on Campus",
      description:
        "Discover everything happening at Texas A&M from career fairs to club meetings to special campus events. Stay involved, stay informed, and never miss what matters.",
      imageSrc: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    },
    {
      Icon: Users,
      title: "Running a Student Org?",
      description:
        "Promote your organization, reach more Aggies, and boost attendance at your events all in one place. Share your schedule on Aggie Agenda and make it easier than ever for students to get involved.",
      imageSrc: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    },
  ];

  return (
    <div className="relative bg-white min-h-screen">
      <style>{`
        @keyframes rotateGlow {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .animate-border-glow {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        /* The circling gradient light */
        .animate-border-glow::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150%; /* Wider than the button so it covers the corners as it rotates */
          height: 300%; 
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            #ff7b00 25%,   /* Change these colors to match your theme */
            #ffae00 50%,
            transparent 75%,
            transparent 100%
          );
          animation: rotateGlow 4s linear infinite;
          z-index: -2;
        }

        /* The inner mask that matches the button's background */
        .animate-border-glow::after {
          content: '';
          position: absolute;
          inset: 2px; /* This determines the thickness of your border */
          background: #8B5A5A; /* Matches your bg-[#8B5A5A] */
          border-radius: 6px;  /* Slightly smaller than rounded-lg (8px) to look sharp */
          z-index: -1;
          transition: background 0.2s ease;
        }

        /* Update the mask background on hover to match hover:bg-[#6F4747] */
        .animate-border-glow:hover::after {
          background: #6F4747;
        }
      `}</style>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-[#500000] origin-left transition-[width] duration-150 ease-out motion-reduce:transition-none"
          style={{ width: `${Math.round(scrollProgress * 1000) / 10}%` }}
        />
      </div>

      <Navbar />

      {/* Hero Section — Mobbin-style centered, minimal */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className={[
              "transition-all duration-600 ease-out",
              "motion-reduce:transition-none",
              pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            ].join(" ")}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#500000]/6 text-[#500000] text-xs font-medium tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#500000] inline-block" />
              Texas A&amp;M University
            </span>
          </div>

          {/* Headline */}
          <div
            className={[
              "transition-all duration-700 ease-out",
              "motion-reduce:transition-none",
              pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: "80ms" }}
          >
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 leading-[1.1] tracking-tight mb-5">
              Aggie Agenda
            </h1>
          </div>

          {/* Subheadline */}
          <div
            className={[
              "transition-all duration-700 ease-out",
              "motion-reduce:transition-none",
              pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: "160ms" }}
          >
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-8 font-normal">
              The smarter way to synchronize all your academic events.{" "}
              <span className="text-gray-700">Organized, simple, and in sync.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={[
              "transition-all duration-700 ease-out",
              "motion-reduce:transition-none",
              pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: "240ms" }}
          >
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link to="/signup">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#500000] text-white text-sm font-medium rounded-lg hover:bg-[#3d0000] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#500000]/30 focus-visible:ring-offset-2">
                  Get Started
                  <ArrowRight size={15} strokeWidth={2} />
                </button>
              </Link>
              <Link to="documentation/learn-more">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2">
                  Learn More
                </button>
              </Link>
              
            </div>
            <div className="pt-4">
              <Link to="/events">
                  <button className="animate-border-glow inline-flex items-center gap-2 px-6 py-2.5 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5A5A]/30 focus-visible:ring-offset-2">
                     {/* Span ensures text stays perfectly on top of the pseudo-elements */}
                    <span className="relative z-10">
                      See Events Right Now no login needed
                    </span>
                  </button>
                </Link>
            </div>
          </div>

          {/* Hero image */}
          <div
            className={[
              "mt-14 transition-all duration-700 ease-out",
              "motion-reduce:transition-none",
              pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: "320ms" }}
          >
            <div className="relative inline-block w-full max-w-2xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-white/20 pointer-events-none z-10" />
              <img
                src={homeImage}
                alt="Aggie Agenda Preview"
                className="w-full rounded-2xl border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section — Mobbin app gallery style */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-medium text-[#500000] tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-3">
              Everything You Need
            </h2>
            <p className="text-base text-gray-500 max-w-md mx-auto">
              Powerful tools designed to make academic life easier for every Aggie
            </p>
          </FadeIn>

          {/* Filter bar (decorative, Mobbin-style) */}
          <FadeIn delayMs={80}>
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {["All", "Calendar", "Import", "Export", "Campus", "Organizations"].map((tab, i) => (
                <button
                  key={tab}
                  className={[
                    "flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                    i === 0
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700",
                  ].join(" ")}
                >
                  {tab}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Grid — 2 cols mobile, 3 cols md, responsive like Mobbin */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
            {/* Filler CTA card to balance the grid */}
            <FadeIn delayMs={5 * 60}>
              <div className="bg-[#500000] rounded-2xl border border-[#500000] overflow-hidden flex flex-col items-center justify-center p-8 text-center min-h-[200px] gap-4">
                <p className="text-white/90 text-sm font-medium leading-snug">
                  Ready to simplify your semester?
                </p>
                <Link to="/signup">
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#500000] text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Get Started <ArrowRight size={13} />
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Subtle count line */}
          <FadeIn delayMs={400}>
            <p className="text-center text-xs text-gray-400 mt-8">
              Hover any card to learn more &nbsp;·&nbsp; 5 features
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-xl mx-auto text-center">
          <FadeIn>
            <p className="text-xs font-medium text-[#500000] tracking-widest uppercase mb-4">Get Organized</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-4">
              Ready to Get Organized?
            </h2>
            <p className="text-base text-gray-500 mb-8">
              Join thousands of Aggies who have simplified their academic life
            </p>
            <Link to="/dashboard/overview">
              <button className="inline-flex items-center gap-2 px-7 py-3 bg-[#500000] text-white text-sm font-medium rounded-lg hover:bg-[#3d0000] transition-colors duration-200 shadow-[0_2px_12px_rgba(80,0,0,0.25)] hover:shadow-[0_4px_20px_rgba(80,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#500000]/30 focus-visible:ring-offset-2">
                Start Free Today
                <ArrowRight size={15} strokeWidth={2} />
              </button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-2.5 bg-white border border-gray-200 text-gray-500 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 hover:text-gray-700 transition-all duration-200 z-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200"
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} />
        </button>
      )}

      <Footer />
    </div>
  );
}
