// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Download, MapPin, Users, ArrowRight, Menu, X, ChevronUp } from 'lucide-react';

import { Link } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  return (
    <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-100/95 backdrop-blur-md shadow-lg' : 'bg-gray-100'
    } rounded-full px-8 py-4`}>
      <div className="flex justify-between items-center gap-12">
        <Link to='/' className="text-2xl font-extrabold text-[#500000] hover:opacity-90 transition-opacity whitespace-nowrap">
          Aggie Agenda
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-base font-medium">
          <Link to="/documentation/solutions" className="text-gray-700 hover:text-[#500000] transition-colors">
            Solutions
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#500000] transition-colors">
            Contact
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-[#500000] transition-colors">
            About
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-[#500000] transition-colors font-semibold">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-700 hover:text-[#500000] transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-300 mt-4 pt-4">
          <div className="flex flex-col space-y-3">
            <Link to="/documentation/solutions" className="text-gray-700 hover:text-[#500000] transition-colors font-medium">
              Solutions
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#500000] transition-colors font-medium">
              Contact
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#500000] transition-colors font-medium">
              About
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-[#500000] transition-colors font-semibold">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
 {/*text-gray-700 hover:text-[#500000] transition-colors font-medium
        px-6 py-2.5 rounded-lg bg-[#500000] text-white hover:bg-[#700000] transition-all text-center*/}
