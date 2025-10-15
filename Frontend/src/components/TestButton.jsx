// Navbar.jsx
import { Link } from "react-router-dom";
const handleClick = () => {
    // This is the core functionality: logging the message
    console.log("hello world");
  };

export default function Navbar() {
  
  return (
    <button
      onClick={handleClick}
      // Tailwind classes for a modern, responsive look
      className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md 
                 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 
                 focus:ring-opacity-50 transition duration-150 ease-in-out transform hover:scale-[1.05] active:scale-[0.95]"
    >
      Console Log "hello world"
    </button>
  );
}
