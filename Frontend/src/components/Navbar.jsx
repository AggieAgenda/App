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
          <a href="/about" className=" hover:text-[black] transition">About</a>
          <a className = "text-[#55000]">Login</a>
        </div>
      </nav>
  );
}
