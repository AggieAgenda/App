// Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-maroon-600">
      <h1 className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
      <div className="flex gap-6">
        <Link to="/events" className="hover:text-maroon-400 transition">Events</Link>
        <Link to="/" className="hover:text-maroon-400 transition">Home</Link>
        <Link to="/about" className="hover:text-maroon-400 transition">About</Link>
        <Link to="/contact" className="hover:text-maroon-400 transition">Contact</Link>
      </div>
    </nav>
  );
}
