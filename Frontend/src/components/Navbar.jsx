import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center w-full px-10 py-6 bg-[#A83232] text-white shadow-md">
        <a href="/" className="text-3xl font-bold tracking-wide hover:text-[#4B0000] transition">
          Aggie Agenda
        </a>

        <div className="flex items-center space-x-6 text-lg">
          <div className="space-x-8 hidden md:inline-block">
            <a href="/features" className="font-bold hover:text-[#4B0000] transition">Features</a>
            <a href="/contact" className="font-bold hover:text-[#4B0000] transition">Contact</a>
            <a href="/about" className="font-bold hover:text-[#4B0000] transition">About</a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="ml-2 p-2 bg-white text-[#A83232] rounded-md shadow-sm hover:bg-[#f4d8aa] transition flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="6" height="18" rx="1"></rect>
              <line x1="11" y1="7" x2="22" y2="7"></line>
              <line x1="11" y1="12" x2="22" y2="12"></line>
              <line x1="11" y1="17" x2="22" y2="17"></line>
            </svg>
          </button>

        </div>
      </nav>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
