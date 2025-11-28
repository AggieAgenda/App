// src/pages/Home.jsx
import { GoogleLogin } from '@react-oauth/google';
import homeImage from '../assets/home_Image.png'
import NavBar from '../components/Navbar.jsx'
import {useLogin} from '../hooks/login.js'
import { useNavigate, Link } from 'react-router-dom';



export default function Home() {
  // 
  const navigate = useNavigate()
  const loginWithGoogle = useLogin();
  const Func =()=>{
    navigate('/dashboard')
    loginWithGoogle()
    console.log("Im being called")
  }


  return (
    <div className="relative flex flex-col bg-gradient-to-b from-[white] to-white text-[#1a1a1a]">
      
      <NavBar /> {/* --- Navbar --- */}
     
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 max-w-7xl mx-auto w-full"> {/* --- Hero Section --- */}
        <div className="max-w-lg space-y-6 text-center md:text-left">
          <h1 className="text-center text-6xl font-extrabold text-[#550000] drop-shadow-md">
            Aggie Agenda
          </h1>
          <p className="text-center text-xl text-gray-700">
            The smarter way to synchronize all your academic events organized, simple, and in sync.
          </p>
          
        </div>

        <div className="mt-10 md:mt-0 md:ml-10 flex justify-center mb-5">
          <img
            src={homeImage}
            alt="Aggie Agenda Preview"
            className="w-[400px] md:w-[500px] rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="flex items-center justify-center text-center py-16 px-6  w-full backdrop-blur-sm">
        <div>
          <img src= "https://www.yumpu.com/en/image/facebook/49954993.jpg" width = '250'></img>
        </div>
        <div className=' flex flex-col items-center text-center py-16  backdrop-blur-sm'>
          <h2 className="text-4xl font-bold text-[#550000] mb-6">
            One Shot Your Calendar
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl ">
            Pull every assignment, exam, and event into a single clean view instantly. </p>
          <p className="text-lg text-gray-700 max-w-2xl ">
            No more juggling Canvas, Gmail, clubs, and class reminders. 
          </p> 
          <p className="text-lg text-gray-700 max-w-2xl mb-10">One click, and you’re organized for the semester.</p>
          {/*Maybe put image of one shotting the calender here */}
          <button onClick = {Func} className="px-8 py-3 bg-[#550000] text-white text-lg rounded-lg shadow-md hover:bg-[black] transition">
            Get Started
          </button>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          </div>
      </section>
      
      <section id="features" className="flex flex-col items-center text-center py-16 px-6  w-full backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-[#550000] mb-6">
          Export To Google Calendar 
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl ">
         Send your full schedule straight to Google Calendar with zero manual input. </p>
        <p className="text-lg text-gray-700 max-w-4xl mb-2">
          Access your day at a glance whether you're on your phone rushing to class or planning out your week.
        </p> 
        {/*Maybe put image of one shotting the calender here */}
        <div className="flex">
          <img src = "https://cdn.dribbble.com/userupload/42320361/file/original-5f30f82a2c4b30bcda8761587f11a40c.gif" ></img>
          
        </div>
        
      </section>

      <section id="features" className="flex  justify-center items-center text-center py-16 px-6  w-full backdrop-blur-sm">
        <div>
        <h2 className="text-4xl font-bold text-[#550000] mb-6">
          Find Events on Campus
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl ">
          Discover everything happening at Texas A&M from career fairs to club meetings to special campus events. 
        </p> 
        <p className="text-lg text-gray-700 max-w-2xl mb-10">
        
          Stay involved, stay informed, and never miss what matters.
        </p>
        </div>
        
        {/*Maybe put image of one shotting the calender here */}
        <img src = "data:image/png;base64,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" ></img>
        
      </section>

      <section id="features" className="flex flex-col items-center text-center py-16 px-6  w-full backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-[#550000] mb-6">
          Running a Student Org ?
        </h2>
        <p className="text-lg text-gray-700 max-w-4xl ">
           Promote your organization, reach more Aggies, and boost attendance at your events all in one place.
        </p> 
        <p className="text-lg text-gray-700 max-w-3xl ">
          Share your schedule on Aggie Agenda and make it easier than ever for students to get involved.
        </p>
        <p className="text-lg text-gray-700 max-w-2xl mb-10">
          Reach out on Instagram for more Info
        </p>
        {/*Maybe put image of one shotting the calender here */}
        <div className="flex  ">
          <img src = "https://www.aggiecodingclub.com/static/media/computer.2ac3c0ac6486a16236eb.png" width = "50px"  className=''></img>
          <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXNfsIume0CwfzblyYl8-yap12izmV0nFVQ&s" width="70"></img>
        </div>
        
      </section>


      {/* --- Footer --- */}
      <footer className="w-full bg-[var(--secondary-color)] text-white py-6 text-center mt-auto">
        <p>Started by Fellow Texas A&M Students</p>
        <br></br>
        <div className="space-x-4 mb-2">
          <a href="https://instagram.com/aggieagenda" className="hover:text-[#f4d8aa]">Instagram</a>
          <a href="https://linkedin.com/company/aggie-agenda" className="hover:text-[#f4d8aa]">LinkedIn</a>

          <Link to = "/developers">Developers</Link>
          
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
        </p>
      </footer>

      
     
    </div>
  );
}
