import React, { useState, useEffect, useRef } from "react";
import { Calendar, Upload, Download, MapPin, Users, ArrowRight, ChevronUp } from "lucide-react";
import homeImage from "../assets/home_Image.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowDown } from "lucide-react";


/** Hook: tells you when an element enters the viewport */
function useInView({ threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = {}) {
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
        "transition-all duration-700 ease-out will-change-[opacity,transform]",
        "motion-reduce:transition-none motion-reduce:transform-none",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </Tag>
  );
}

// Feature Card Component (two-stage: text first, then image)
function FeatureCard({ Icon, title, description, imageSrc, reverse, index = 0 }) {
  const baseDelay = index * 80;

  return (
    <FadeIn delayMs={baseDelay}>
      <div
        className={[
          "rounded-3xl p-6 md:p-8",
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
          "bg-white/70 backdrop-blur ring-1 ring-black/5",
        ].join(" ")}
      >
        <div
          className={`flex flex-col ${
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          } items-center gap-8 md:gap-12`}
        >
          {/* Stage 1: text */}
          <FadeIn delayMs={baseDelay} className="flex-1 space-y-4">
            <div className="inline-block p-3 bg-[#500000]/10 rounded-lg">
              <Icon className="w-8 h-8 text-[#500000]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#500000]">{title}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
          </FadeIn>

          {/* Stage 2: image */}
          <FadeIn delayMs={baseDelay + 140} className="flex-1 w-full">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#500000]/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none"></div>

              {/* subtle tint overlay for consistency */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#500000]/10 via-transparent to-transparent pointer-events-none"></div>

              <img
                src={imageSrc}
                alt={title}
                className="relative rounded-2xl shadow-xl w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none ring-1 ring-black/5"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="h-8 md:h-10" />
    </FadeIn>
  );
}

export default function AggieAgendaHome() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // hero load-in trigger
  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // scroll listeners: progress bar + scroll-to-top visibility
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

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
        <div
          className="h-full bg-[#500000] origin-left transition-[width] duration-150 ease-out motion-reduce:transition-none"
          style={{ width: `${Math.round(scrollProgress * 1000) / 10}%` }}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left: staggered load-in */}
            <div className="flex-1 space-y-8 text-center md:text-left">
              <div
                className={[
                  "transition-all duration-700 ease-out",
                  "motion-reduce:transition-none motion-reduce:transform-none",
                  pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
              >
                <h1 className="text-5xl md:text-7xl font-extrabold text-[#500000] leading-tight">
                  Aggie Agenda
                </h1>
              </div>

              <div
                className={[
                  "transition-all duration-700 ease-out",
                  "motion-reduce:transition-none motion-reduce:transform-none",
                  pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
                style={{ transitionDelay: "120ms" }}
              >
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                  The smarter way to synchronize all your academic events. Organized, simple, and in sync.
                </p>
              </div>

              <div
                className={[
                  "transition-all duration-700 ease-out",
                  "motion-reduce:transition-none motion-reduce:transform-none",
                  pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
                style={{ transitionDelay: "220ms" }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/signup">
                    <button className="px-8 py-4 bg-[#500000] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#700000] hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#500000]/20">
                      Get Started
                      <ArrowRight size={20} />
                    </button>
                  </Link>

                  

                  <Link to="documentation/learn-more">
                    <button className="px-8 py-4 border-2 border-[#500000] text-[#500000] text-lg font-semibold rounded-lg hover:bg-[#500000] hover:text-white transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#500000]/20">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: image load-in */}
            <div
              className={[
                "flex-1 w-full transition-all duration-700 ease-out",
                "motion-reduce:transition-none motion-reduce:transform-none",
                pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{ transitionDelay: "160ms" }}
            >
              <div className="relative">
                {/* Decorative background elements */}
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#500000]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-[#500000]/5 rounded-full blur-3xl"></div>

                <img
                  src={homeImage}
                  width={50}
                  alt="Aggie Agenda Preview"
                  className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 motion-reduce:transition-none ring-1 ring-black/5"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#500000] mb-4 flex items-center justify-center gap-3">
              Everything You Need
              <ArrowDown className="w-8 h-8 text-[#500000]" />
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make academic life easier for every Aggie
            </p>
            
          </FadeIn>

          <FeatureCard
            index={0}
            Icon={Calendar}
            title="One Shot Your Calendar"
            description="Pull every assignment, exam, and event into a single clean view instantly. No more juggling Canvas, Gmail, clubs, and class reminders. One click, and you're organized for the semester."
            imageSrc="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80"
            reverse={false}
          />

          <FeatureCard
            index={1}
            Icon={Upload}
            title="Reads Your Syllabus"
            description="Stop manually entering dates. Our algorithm instantly processes your syllabus and extracts every deadline, exam, and reading. Whether it's a PDF, DOC, or photo, we find all the key dates so you don't have to."
            imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
            reverse={true}
          />

          <FeatureCard
            index={2}
            Icon={Download}
            title="Export To Google Calendar"
            description="Send your full schedule straight to Google Calendar with zero manual input. Access your day at a glance whether you're on your phone rushing to class or planning out your week."
            imageSrc="https://cdn.dribbble.com/userupload/42320361/file/original-5f30f82a2c4b30bcda8761587f11a40c.gif"
            reverse={false}
          />

          <FeatureCard
            index={3}
            Icon={MapPin}
            title="Find Events on Campus"
            description="Discover everything happening at Texas A&M from career fairs to club meetings to special campus events. Stay involved, stay informed, and never miss what matters."
            imageSrc="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
            reverse={true}
          />

          <FeatureCard
            index={4}
            Icon={Users}
            title="Running a Student Org?"
            description="Promote your organization, reach more Aggies, and boost attendance at your events all in one place. Share your schedule on Aggie Agenda and make it easier than ever for students to get involved."
            imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
            reverse={false}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#500000] to-[#700000] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <FadeIn delayMs={0}>
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Get Organized?</h2>
          </FadeIn>
          <FadeIn delayMs={100}>
            <p className="text-xl md:text-2xl opacity-90">
              Join thousands of Aggies who have simplified their academic life
            </p>
          </FadeIn>
          <FadeIn delayMs={180}>
            <Link to="/dashboard/overview">
              <button className="px-10 py-4 bg-white text-[#500000] text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30">
                Start Free Today
              </button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#500000] text-white rounded-full shadow-lg hover:bg-[#700000] hover:shadow-xl transform hover:-translate-y-1 transition-all z-40 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#500000]/20"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <Footer />
    </div>
  );
}
