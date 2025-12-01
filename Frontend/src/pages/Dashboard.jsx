import { useState } from "react";
import { Menu, Settings, User, Undo2 } from "lucide-react";
import { motion as _motion } from "framer-motion";
import {Link , Outlet } from "react-router-dom";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100 text-gray-900">
        {/* Sidebar */}
        <_motion.aside
            initial={{ x: -200 }}
            animate={{ x: sidebarOpen ? 0 : -200 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white shadow-xl p-4 flex flex-col"
        >
            <h2 className="text-2xl font-bold mb-6">Aggie Agenda Beta</h2>
            <nav className="flex flex-col gap-4 text-lg">
            
            <Link to = 'overview'>Dashboard</Link>
            <Link to = 'syllabus' >Syllabus Reader</Link>
            <Link to = 'calendar'>Calendar</Link>
            <Link to = 'events'>Find Events</Link>
            <Link>Organizations</Link> {/*Make this page special for organization accounts or maybe go in myself and give organization accounts a special tag that allows them to adjust their thing through the profile file */}
            
            
            
            </nav>
        </_motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <header className="flex justify-between items-center p-4 bg-white shadow-md">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-200 transition"
                >
                    <Menu />
                </button>

                <div className="flex items-center gap-4">
                    <Link>
                        <Settings className="cursor-pointer" /> {/*Have to add settings and profile.jsx under dashboard so it shows up in the outlet */}
                    </Link>
                    <User className="cursor-pointer" />
                    <Link to = "/">
                        <Undo2 className="cursor-pointer" />
                    </Link>
                </div>
            </header>

            {/* Content Slot */}
            <div className="p-6">
            {/* The child components will appear here when used with React Router */}
            <div className="flex flex-col items-center text-center">
                <div classname= "flex flex-col mb-10">
                    
                    <Outlet/>

                </div>
            </div>


            
            </div>
        </div>
        </div>
    );
}
/*
<h1>Syllabus Reader</h1>
            <input type='file'></input>
            <button onClick={ReadSyllabus}>Run</button> */


/* <h1 className = "text-lg">We are still in Devlopment</h1>
                    <h1 className="text-lg mb-5">Coming Soon!</h1>
                    <a href = "https://docs.google.com/forms/d/e/1FAIpQLSdP_FFSPaQBSOKEcKfck4MV3cRNBoOQuUhnYCSfy9hUHTeZwQ/viewform">
                        <button className="px-8 py-3 bg-[#550000] text-white text-lg rounded-lg shadow-md hover:bg-[black] transition">Get on the waitlist</button>
                    </a> */

 
/*
const ReadSyllabus = async (file) =>{ // fix this part so the file is taken in and calls the api then print out the recieved json
    console.log("Running syllabus Reader")
    const url = 'http://127.0.0.1:8000/api/syllabus'
    const respose = await fetch(url, {
        method: 'GET',
    })
    console.log(respose.json.toString)
}*/