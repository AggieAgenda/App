// src/pages/FAQ.jsx
import React, { useState } from "react";
import NavBar from "../components/Navbar.jsx";

export default function FAQ() {
  const faqs = [
    {
      question: "What is Aggie Agenda?",
      answer:
        "Aggie Agenda is a platform designed to help students discover, organize, and manage campus events with ease.",
    },
    {
      question: "Is Aggie Agenda free to use?",
      answer:
        "Yes! Our core features are completely free for students. Additional tools for organizations are coming soon.",
    },
    {
      question: "Can organizations post their own events?",
      answer:
        "Absolutely. Registered organizations can create and advertise events to reach a wider audience of students.",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#f4d8aa] to-white text-[#1a1a1a]">
      {/* --- Background Animation --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 h-72 bg-[#305d6f] rounded-full filter blur-3xl opacity-30 animate-float1 top-10 left-20"></div>
        <div className="absolute w-96 h-96 bg-[#f4d8aa] rounded-full filter blur-3xl opacity-40 animate-float2 bottom-20 right-10"></div>
        <div className="absolute w-64 h-64 bg-[#3c7289] rounded-full filter blur-3xl opacity-25 animate-float3 top-1/3 right-1/3"></div>
      </div>

      {/* --- Navbar --- */}
      <NavBar />

      {/* --- FAQ Content --- */}
      <section className="flex flex-col items-center justify-center px-10 md:px-20 py-20 max-w-7xl mx-auto w-full flex-grow">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-[#305d6f] drop-shadow-md mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Answers to common questions about Aggie Agenda.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="w-full bg-[#305d6f] text-white py-6 text-center mt-auto">
        <div className="space-x-4 mb-2">
          <a href="https://instagram.com/aggieagenda" className="hover:text-[#f4d8aa]">
            Instagram
          </a>
          <a href="https://linkedin.com/company/aggie-agenda" className="hover:text-[#f4d8aa]">
            LinkedIn
          </a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${
        open ? "border-[#305d6f] border" : "border-transparent"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-semibold text-lg text-[#1a1a1a]">{question}</span>
        <span
          className={`transform transition-transform ${open ? "rotate-45" : ""} text-[#305d6f] text-2xl`}
        >
          +
        </span>
      </button>
      {open && <p className="mt-3 text-gray-700">{answer}</p>}
    </div>
  );
}
