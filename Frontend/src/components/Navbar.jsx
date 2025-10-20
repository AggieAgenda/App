// Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full px-10 py-6 bg-[#305d6f] text-white shadow-md">
        <a href="/" className="text-3xl font-bold tracking-wide hover:text-[#800000] transition">
          Aggie Agenda
        </a>
        <div className="space-x-8 text-lg">
          <a href="/features" className="hover:text-[#800000] transition">Features</a>
          <a href="/contact" className="hover:text-[#800000] transition">Contact</a>
          <a href="/about" className="hover:text-[#800000] transition">About</a>
        </div>
      </nav>
  );
}
