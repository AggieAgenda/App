// src/pages/Privacy.jsx

import React from "react";

export default function Privacy() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#f4d8aa] to-white text-[#1a1a1a] overflow-x-hidden">
      {/* --- Background Animation --- */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-[#305d6f] rounded-full filter blur-3xl opacity-30 animate-float1 top-10 left-20"></div>
        <div className="absolute w-96 h-96 bg-[#f4d8aa] rounded-full filter blur-3xl opacity-40 animate-float2 bottom-20 right-10"></div>
        <div className="absolute w-64 h-64 bg-[#3c7289] rounded-full filter blur-3xl opacity-25 animate-float3 top-1/3 right-1/3"></div>
      </div>

      {/* --- Navbar --- */}
      <nav className="flex justify-between items-center w-full px-10 py-6 bg-[#305d6f] text-white shadow-md">
        <a href="/" className="text-3xl font-bold tracking-wide">
          Aggie Agenda
        </a>
        <div className="space-x-8 text-lg">
          <a href="/features" className="hover:text-[#f4d8aa] transition">Features</a>
          <a href="/contact" className="hover:text-[#f4d8aa] transition">Contact</a>
          <a href="/about" className="hover:text-[#f4d8aa] transition">About</a>
        </div>
      </nav>

      {/* --- Content --- */}
      <main className="flex-1 w-full">
        <section className="px-10 md:px-20 py-16 max-w-5xl mx-auto">
          <div className="bg-[#f0e1c1]/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#305d6f] mb-6 text-center">
              Privacy Policy
            </h1>

            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Your privacy is important to us. This Privacy Policy explains how Aggie Agenda
              collects, uses, and protects your information when you use our website or
              services.
            </p>

            <div className="space-y-8 text-gray-800">
              <section>
                <h2 className="text-2xl font-semibold text-[#305d6f] mb-2">1. Information We Collect</h2>
                <p className="text-gray-700">
                  We may collect personal information such as your name, email, and usage data
                  when you interact with our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#305d6f] mb-2">2. How We Use Information</h2>
                <p className="text-gray-700">
                  Information is used to improve user experience, maintain functionality, and
                  provide personalized content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#305d6f] mb-2">3. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:aggieagenda@gmail.com" className="text-[#3c7289] underline hover:opacity-80">
                    aggieagenda@gmail.com
                  </a>.
                </p>
              </section>
            </div>

            <footer className="text-sm text-center mt-10 text-gray-600">
              © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
            </footer>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="w-full bg-[#305d6f] text-white py-6 text-center mt-auto">
        <div className="space-x-4 mb-2">
          <a href="https://instagram.com/aggieagenda" className="hover:text-[#f4d8aa]">Instagram</a>
          <a href="https://linkedin.com/company/aggie-agenda" className="hover:text-[#f4d8aa]">LinkedIn</a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
        </p>
      </footer>

      {/* --- Custom Animation Keyframes --- */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(25px) translateX(-30px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(40px); }
        }
        .animate-float1 { animation: float1 10s ease-in-out infinite; }
        .animate-float2 { animation: float2 12s ease-in-out infinite; }
        .animate-float3 { animation: float3 14s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
