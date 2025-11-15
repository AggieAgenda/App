export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-[1500]
        ${open ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
        ></div>

     
      <div
        className={`fixed top-0 right-0 h-screen w-[80vw] max-w-[280px]
        bg-white text-[#2b2b2b] px-5 py-6 flex flex-col
        transition-transform duration-300 z-[1600]
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="text-3xl text-gray-700 self-end mb-6"
        >
          &times;
        </button>

        <ul className="space-y-6 flex-grow">
          <li>
            <a href="/events" onClick={onClose}  className="block w-full text-left text-lg font-serif text-[#084955] hover:text-[#7aa5a5] transition">
                Events
            </a>
          </li>
          <li>
            <button className="w-full text-left text-lg font-serif text-[#084955] hover:text-[#7aa5a5] transition">
              Tutorial
            </button>
          </li>
          <li>
            <button className="w-full text-left text-lg font-serif text-[#084955] hover:text-[#7aa5a5] transition">
              FAQ
            </button>
          </li>
          <li>
            <button className="w-full text-left text-lg font-serif text-[#084955] hover:text-[#7aa5a5] transition">
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

