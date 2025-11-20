// Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-[#321212] text-white shadow-md">
        <a href="/" className="text-3xl font-bold tracking-wide hover:text-red-900 transition">
          Aggie Agenda
        </a>
        <div className="space-x-8 text-lg">
          <a href="/about" className="font-bold hover:text-red-900 transition">About</a>
          <a href="/contact" className="font-bold hover:text-red-900 transition">Contact</a>
          <a href="/calendar" className="font-bold hover:text-red-900 transition">Calendar</a>
          <a href="/features" className="font-bold hover:text-red-900 transition">Features</a>
          
          
        </div>
      </nav>
  );
}
