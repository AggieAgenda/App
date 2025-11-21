// src/pages/Home.jsx
import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import homeImage from '../assets/home_Image.png'
import NavBar from '../components/Navbar.jsx'
import {useLogin} from '../hooks/login.js'




export default function Home() {
  // methods
  const loginWithGoogle = useLogin();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#f4d8aa] to-white text-[#1a1a1a]">
      
      {/* --- Background Animation --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating gradient blobs */}
        <div className="absolute w-72 h-72 bg-[#305d6f] rounded-full filter blur-3xl opacity-30 animate-float1 top-10 left-20"></div>
        <div className="absolute w-96 h-96 bg-[#f4d8aa] rounded-full filter blur-3xl opacity-40 animate-float2 bottom-20 right-10"></div>
        <div className="absolute w-64 h-64 bg-[#3c7289] rounded-full filter blur-3xl opacity-25 animate-float3 top-1/3 right-1/3"></div>
      </div>

      {/* --- Navbar --- */}
      <NavBar /> 
      {/* --- Hero Section --- */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 max-w-7xl mx-auto w-full">
        <div className="max-w-lg space-y-6 text-center md:text-left">
          <h1 className="text-6xl font-extrabold text-[#305d6f] drop-shadow-md">
            Aggie Agenda
          </h1>
          <p className="text-xl text-gray-700">
            The smarter way to synchronize all your academic events organized, simple, and in sync.
          </p>
          
        </div>

        <div className="mt-10 md:mt-0 md:ml-10 flex justify-center">
          <img
            src={homeImage}
            alt="Aggie Agenda Preview"
            className="w-[400px] md:w-[500px] rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="flex flex-col items-center text-center py-16 px-6 bg-[#f0e1c1]/70 w-full backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-[#305d6f] mb-6">
          One shot your calendar
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-10">
          Sync all your academic events from multiple platforms into one clean, unified view. Never miss a deadline again.
        </p>
        <button onClick = {loginWithGoogle} className="px-8 py-3 bg-[#305d6f] text-white text-lg rounded-lg shadow-md hover:bg-[#3c7289] transition">
          Coming Soon
        </button>
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
      </section>

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
      `}</style>
    </div>
  );
}
