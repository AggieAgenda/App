import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Download, MapPin, Users, ArrowRight, Menu, X, ChevronUp } from 'lucide-react';
import homeImage from '../assets/home_Image.png';
import { Link} from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import GoogleLogin from '../components/GoogleLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
// Navbar Component


// Feature Card Component
function FeatureCard({ icon: Icon, title, description, imageSrc, reverse }) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 mb-20`}>
      <div className="flex-1 space-y-4">
        <div className="inline-block p-3 bg-[#500000]/10 rounded-lg">
          <Icon className="w-8 h-8 text-[#500000]" />
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-[#500000]">{title}</h3>
        <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
      </div>
      <div className="flex-1 w-full">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#500000]/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
          <img 
            src={imageSrc} 
            alt={title}
            className="relative rounded-2xl shadow-xl w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

// Main Homepage Component
export default function AggieAgendaHome() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold text-[#500000] leading-tight">
                Aggie Agenda
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                The smarter way to synchronize all your academic events. Organized, simple, and in sync.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="dashboard\overview">
                  <button className="px-8 py-4 bg-[#500000] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#700000] hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight size={20} />
                    
                  </button>
                </Link>
                <GoogleLoginButton></GoogleLoginButton>
                <Link to= "documentation/learn-more">
                <button className="px-8 py-4 border-2 border-[#500000] text-[#500000] text-lg font-semibold rounded-lg hover:bg-[#500000] hover:text-white transition-all">
                  Learn More
                </button>
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative">
                {/* Decorative background elements */}
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#500000]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-[#500000]/5 rounded-full blur-3xl"></div>
                
                <img
                  src= {homeImage}
                  width = {50}
                  alt="Aggie Agenda Preview"
                  className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#500000] mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make academic life easier for every Aggie
            </p>
          </div>

          <FeatureCard
            icon={Calendar}
            title="One Shot Your Calendar"
            description="Pull every assignment, exam, and event into a single clean view instantly. No more juggling Canvas, Gmail, clubs, and class reminders. One click, and you're organized for the semester."
            imageSrc="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80"
            reverse={false}
          />

          <FeatureCard
            icon={Upload}
            title="Reads Your Syllabus"
            description="Stop manually entering dates. Our algorithm instantly processes your syllabus and extracts every deadline, exam, and reading. Whether it's a PDF, DOC, or photo, we find all the key dates so you don't have to."
            imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
            reverse={true}
          />

          <FeatureCard
            icon={Download}
            title="Export To Google Calendar"
            description="Send your full schedule straight to Google Calendar with zero manual input. Access your day at a glance whether you're on your phone rushing to class or planning out your week."
            imageSrc=" https://cdn.dribbble.com/userupload/42320361/file/original-5f30f82a2c4b30bcda8761587f11a40c.gif"
            reverse={false}
          />

          <FeatureCard
            icon={MapPin}
            title="Find Events on Campus"
            description="Discover everything happening at Texas A&M from career fairs to club meetings to special campus events. Stay involved, stay informed, and never miss what matters."
            imageSrc="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
            reverse={true}
          />

          <FeatureCard
            icon={Users}
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
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Get Organized?
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            Join thousands of Aggies who have simplified their academic life
          </p>
          <Link to="dashboard\overview">
            <button className="px-10 py-4 bg-white text-[#500000] text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              Start Free Today
            </button>
          </Link>
        </div>
      </section>

      

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#500000] text-white rounded-full shadow-lg hover:bg-[#700000] hover:shadow-xl transform hover:-translate-y-1 transition-all z-40"
        >
          <ChevronUp size={24} />
        </button>
      )}
    <Footer/>
    </div>
    
  );
}