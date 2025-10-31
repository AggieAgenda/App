import NavBar from "../components/Navbar.jsx"
import CalendarNavBar from "../components/calendar/CalendarNavBar.jsx";
import CalendarGrid from "../components/calendar/CalendarGrid.jsx";
import EventList from "../components/calendar/EventList.jsx";
import { useState } from 'react';

export default function Calendar() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  return (
    <>
      <NavBar />
      <main className="bg-gray-100 p-8 overflow-y-auto h-[calc(100vh-4rem)] flex gap-8">
        <div className="bg-white w-250 h-200 rounded-4xl shadow-lg p-4"> {/* card */}
          <CalendarNavBar months={monthNames} setMonth={setCurrentMonth} setYear={setCurrentYear} month={currentMonth} year={currentYear} />
          <CalendarGrid month={currentMonth} year={currentYear}/>
        </div>  
        <div className="flex justify-end">
          <div className="bg-white w-100 h-200 rounded-4xl shadow-lg p-4">
            <EventList />
          </div>
        </div>
      </main>
    </>
  );
}

