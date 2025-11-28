// Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full px-10 py-6 bg-[white] text-black shadow-md">
        <a href="/" className="text-4xl font-bold tracking-wide text-[#550000] hover:text-[#black] transition">
          Aggie Agenda
        </a>
        <div className="space-x-8 text-lg">
          <a href="/features" className=" hover:text-[black] transition">Features</a>
          <a href="/contact" className=" hover:text-[black] transition">Contact</a>
          <Link to="/about" className=" hover:text-[black] transition">About</Link>
          <Link to = "/dashboard">Login</Link>
          
          {/*Need to work on authentication for this to be perfect */}
        </div>
      </nav>
  );
}
