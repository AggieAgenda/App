// Navbar.jsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate()
  //const loginWithGoogle = useLogin();
  const toDashboard =()=>{
    navigate('/dashboard/overview')
    //loginWithGoogle()
    console.log("Im being called")
  }
  
  return (
    <nav className="w-full bg-white shadow-md py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8">

        {/* Title */}
        <a
          href="/"
          className="
            text-4xl 
            font-extrabold 
            tracking-tight 
            text-[var(--maroon)] 
           
            bg-clip-text 
             
            hover:opacity-90 
           
          "
        >
          Aggie Agenda
        </a>

        {/* Nav Links */}
        <div className="flex items-center space-x-8 text-lg font-medium">
          <Link to="/features" className="relative group hover:text-[var(--maroon)]">
            Features
            <span className="absolute w-0 left-0 bottom-0 h-[2px] bg-[var(--maroon)] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link to="/contact" className="relative group hover:text-[var(--maroon)]">
            Contact
            <span className="absolute w-0 left-0 bottom-0 h-[2px] bg-[var(--maroon)] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link to="/about" className="relative group hover:text-[var(--maroon)]">
            About
            <span className="absolute w-0 left-0 bottom-0 h-[2px] bg-[var(--maroon)] transition-all duration-300 group-hover:w-full" />
          </Link>

          <button onClick={toDashboard} className="px-4 py-2 rounded-xl bg-[var(--maroon)] text-white ">
            <Link></Link>
            Login
          </button>
        </div>

      </div>
    </nav>
  );
}
