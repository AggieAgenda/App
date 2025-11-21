const handleClick = () => {
    // This is the core functionality:
}
export default function TestButton(props) {
  
  return (
    <button
      onClick={handleClick}
      // Tailwind classes for a modern, responsive look
      className="w-10 h-10 flex items-center justify-center bg-red-900 text-white text-lg font-semibold shadow-md 
                hover:bg-red-600 focus:outline-none focus:ring-3 focus:ring-red-300 
                focus:ring-opacity-50 transition duration-150 ease-in-out transform hover:scale-[1.05] active:scale-[0.95] rounded-full">
      {props.msg}
    </button>
  );
}
