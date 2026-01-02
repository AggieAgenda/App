import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <Navbar/>
      <h1 className="text-7xl font-extrabold text-[#500000] mb-4">
        404
      </h1>

      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg bg-[#500000] text-white font-medium hover:bg-gray-800 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
