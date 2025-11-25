// src/pages/Home.jsx
import { GoogleLogin } from '@react-oauth/google';
import homeImage from '../assets/home_Image.png'
import NavBar from '../components/Navbar.jsx'
import {useLogin} from '../hooks/login.js'



export default function Home() {
  // methods
  const {loginWithGoogle} = useLogin();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[white] to-white text-[#1a1a1a]">

      {/* --- Navbar --- */}
      <NavBar /> 
      {/* --- Hero Section --- */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 max-w-7xl mx-auto w-full">
        <div className="max-w-lg space-y-6 text-center md:text-left">
          <h1 className="text-6xl font-extrabold text-[#550000] drop-shadow-md">
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
      <section id="features" className="flex flex-col items-center text-center py-16 px-6  w-full backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-[#550000] mb-6">
          One shot your calendar
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-10">
          Sync all your academic events from multiple platforms into one clean, unified view. Never miss a deadline again.
        </p>
        <button onClick = {loginWithGoogle} className="px-8 py-3 bg-[#550000] text-white text-lg rounded-lg shadow-md hover:bg-[black] transition">
          Coming Soon
        </button>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </section>

      {/* --- Footer --- */}
      <footer className="w-full bg-[white] text-white py-6 text-center mt-auto">
        <div className="space-x-4 mb-2">
          <a href="https://instagram.com/aggieagenda" className="hover:text-[#f4d8aa]">Instagram</a>
          <a href="https://linkedin.com/company/aggie-agenda" className="hover:text-[#f4d8aa]">LinkedIn</a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
        </p>
      </footer>

      {/* --- Custom Animation Keyframes --- */}
     
    </div>
  );
}
