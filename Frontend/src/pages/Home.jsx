
import homeImage from '../assets/home_Image.png';
// src/pages/home.jsx
export default function Home() {
  return (
    <div className=" w-screen max-w-1920 h-screen bg-[#f4d8aa] text-black flex flex-col items-center">
      <nav className="w-screen justify-between py-6 bg-[#305d6f]">
            <a href = "/">
            <h1  className="text-2xl font-bold text-maroon-600">Aggie Agenda</h1>
          </a>
          <div className="space-x-6">
            <a href="/features" className="hover:text-maroon-400 transition">Features</a>
            <a href="/contact" className="hover:text-maroon-400 transition">Contact</a>
            <a href="/about" className="hover:text-maroon-400 transition">About</a>

            <button className="ml-4 px-5 py-2 bg-maroon-600 hover:bg-maroon-700 rounded-lg transition">
              Coming Soon
            </button>
          </div>
        </nav>
      <div className="flex w-full max-w-1000 items-center ">
        
        {/* Navigation */}
        

        {/*Body*/}
        <div classname = "flex max-w-7xl mx-auto items-center">
          {/* Hero */}
          <section className="flex items-center px-60 ">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="py-4 ">
                Aggie Agenda
              </h1>
              <h3 className="text-lg text-black-300 ">
                The way to synchronize all your acedemic events
              </h3>
            </div>
            <div className='flex-1'>
              {/*Make this image farther to the left of the rest of this*/}
              <img src={homeImage} alt = "Nice Photo"/>
            </div>
          
          </section>

          {/* Get Started Section*/}
          <section id="features" className="flex-1 px-10 items-center">
            <h1>One shot your calendar</h1>
            <button className='bg-[#305d6f]'>Get Started</button> {/*Color this button*/ }
          </section>

        

          {/* Footer 
          <section className="bg-[#305d6f]    items-center text-center ">
            <div className="w-5xl " >
                  <a href="https://www.instagram.com/aggieagenda">Instagram   </a>
                  <a href="https://www.linkedin.com/company/aggie-agenda">LinkedIn</a>
                  

                  
              </div>
            © {new Date().getFullYear()} Aggie Agenda. All rights reserved.
            
          </section> */}
        </div>
      </div>
    </div>
  );
}
