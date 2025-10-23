import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* --- Menu Button --- */}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 bg-[#305d6f] text-white rounded-md shadow-md hover:bg-[#3c7289] transition"
      >
        {/* Hamburger icon */}
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>

      {/* --- Slide-out Menu --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            className="fixed top-0 right-0 h-full w-64 bg-[#305d6f] text-white shadow-2xl z-50 flex flex-col items-center py-20 space-y-8"
          >
            <a href="/" onClick={() => setOpen(false)} className="text-xl hover:text-[#f4d8aa] transition">Home</a>
            <a href="/features" onClick={() => setOpen(false)} className="text-xl hover:text-[#f4d8aa] transition">Features</a>
            <a href="/about" onClick={() => setOpen(false)} className="text-xl hover:text-[#f4d8aa] transition">About</a>
            <a href="/contact" onClick={() => setOpen(false)} className="text-xl hover:text-[#f4d8aa] transition">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
