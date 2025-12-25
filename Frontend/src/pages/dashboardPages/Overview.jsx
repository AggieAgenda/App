
import { 
  Menu, 
  Settings, 
  User, 
  LogOut, 
  Home,
  FileText,
  Calendar,
  MapPin,
  Users,
  Bell,
  Search,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/overview/")
        .then(res => res.json())
        .then(data => {
        setDashboard(data);
        setLoading(false);
        })
        .catch(err => {
        console.error(err);
        setLoading(false);
        });
    }, []);


    if (loading) {
        return <p className="text-gray-500">Loading dashboard...</p>;
         }
    const deadlines = dashboard?.upcoming_deadlines || [];
    const schedule = dashboard?.today_schedule || [];
    const events = dashboard?.registered_events || [];

    
    return (
        <>  
            
            <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Stats Cards */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#500000]">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500 text-sm">Upcoming Events</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">12</p>
                    </div>
                    <div className="bg-[#500000]/10 p-3 rounded-lg">
                    <Calendar className="text-[#500000]" size={24} />
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500 text-sm">Syllabi Uploaded</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
                    </div>
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                    <FileText className="text-blue-500" size={24} />
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500 text-sm">Campus Events</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">8</p>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg">
                    <MapPin className="text-green-500" size={24} />
                    </div>
                </div>
                </div>
            </div>

            
            </div>


                {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
            Today's Schedule
        </h2>

        <div className="space-y-3">
            {schedule.length === 0 && (
            <p className="text-sm text-gray-500">No events today</p>
            )}

            {schedule.map(item => (
            <div
                key={item.id}
                className="p-3 bg-gray-50 rounded-lg"
            >
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">
                {item.time} – {item.end_time}
                </p>
                <p className="text-sm text-gray-500">{item.location}</p>
            </div>
            ))}
        </div>
        </div>



    {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
            Upcoming Deadlines
        </h2>

        <div className="space-y-4">
            {deadlines.length === 0 && (
            <p className="text-sm text-gray-500">No upcoming deadlines</p>
            )}

            {deadlines.map(item => (
            <div
                key={item.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
                <div>
                <p className="font-semibold text-gray-800">
                    {item.course} — {item.title}
                </p>
                <p className="text-sm text-gray-500">
                    Due {item.due_date} at {item.due_time}
                </p>
                </div>

                <span
                className={`text-sm font-medium px-3 py-1 rounded-full
                ${
                    item.days_until_due <= 3
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
                >
                {item.days_until_due} days left
                </span>
            </div>
            ))}
        </div>
        </div>




    {/* Registered Events */}
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
    <h2 className="text-xl font-bold text-gray-800 mb-4">
        Upcoming Events
    </h2>

    <div className="space-y-3">
        {events.length === 0 && (
        <p className="text-sm text-gray-500">No registered events</p>
        )}

        {events.map(event => (
        <div
            key={event.id}
            className="p-3 bg-gray-50 rounded-lg"
        >
            <p className="font-semibold text-gray-800">{event.title}</p>
            <p className="text-sm text-gray-500">
            {event.date} at {event.time}
            </p>
        </div>
        ))}
    </div>
    </div>

        </>
    );
}
