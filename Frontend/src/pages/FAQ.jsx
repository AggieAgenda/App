// src/pages/FAQ.jsx
import { useState } from "react";

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
    <div className="min-h-screen w-screen bg-[#121212] text-white flex flex-col items-center px-6 pb-20">
      {/* Navbar */}
      <div className="pb-10 w-5xl">
        <nav className="flex items-center justify-between py-6">
          <a href="/">
            <h1 className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
          </a>
          <div className="space-x-6">
            <a href="/features" className="hover:text-maroon-400 transition">
              Features
            </a>
            <a href="/pricing" className="hover:text-maroon-400 transition">
              Pricing
            </a>
            <a href="/contact" className="hover:text-maroon-400 transition">
              Contact
            </a>
            <a href="/FAQ" className="hover:text-maroon-400 transition">
              FAQ
            </a>
            <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
              Coming Soon
            </button>
          </div>
        </nav>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-gray-800 rounded-xl p-6 transition-all duration-300 bg-gray-900 ${
        open ? "shadow-lg shadow-maroon-900/20" : ""
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-semibold text-lg">{question}</span>
        <span
          className={`transform transition-transform ${
            open ? "rotate-45" : ""
          } text-maroon-400 text-2xl`}
        >
          +
        </span>
      </button>
      {open && <p className="mt-3 text-gray-400">{answer}</p>}
    </div>
  );
}
