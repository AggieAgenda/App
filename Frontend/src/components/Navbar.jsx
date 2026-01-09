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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
    } py-4`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8">
        <Link to='/' className="text-3xl md:text-4xl font-extrabold text-[#500000] hover:opacity-90 transition-opacity">
          Aggie Agenda
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
          <Link to="/documentation/solutions" className="relative group text-gray-700 hover:text-[#500000] transition-colors">
            Solutions
            <span className="absolute w-0 left-0 -bottom-1 h-[2px] bg-[#500000] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link to="/contact" className="relative group text-gray-700 hover:text-[#500000] transition-colors">
            Contact
            <span className="absolute w-0 left-0 -bottom-1 h-[2px] bg-[#500000] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link to="/about" className="relative group text-gray-700 hover:text-[#500000] transition-colors">
            About
            <span className="absolute w-0 left-0 -bottom-1 h-[2px] bg-[#500000] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link to="/login" className="px-6 py-2.5 rounded-lg bg-[#500000] text-white hover:bg-[#700000] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-700 hover:text-[#500000] transition-colors"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col space-y-4 px-6 py-6">
            <Link to="/documentation/solutions" className="text-gray-700 hover:text-[#500000] transition-colors font-medium">
            Solutions
            <span className="absolute w-0 left-0 -bottom-1 h-[2px] bg-[#500000] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#500000] transition-colors font-medium">
            Contact
            <span className="absolute w-0 left-0 -bottom-1 h-[2px] bg-[#500000] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-[#500000] transition-colors font-medium">
            About
            <span className="absolute w-0 left-0 -bottom-1 h-[2px] bg-[#500000] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link to="/login" className=" px-6 py-2.5 rounded-lg bg-[#500000] text-white hover:bg-[#700000] transition-all text-center*">
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
