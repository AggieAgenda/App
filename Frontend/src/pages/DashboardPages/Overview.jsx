// Overview.jsx
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
  X,
  Check
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${API_URL}/api/dashboard/overview/`)
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

    const toggleDeadline = async (deadlineId) => {
        try {
            const response = await fetch(`${API_URL}/api/deadlines/${deadlineId}/toggle/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                setDashboard(prev => ({
                    ...prev,
                    upcoming_deadlines: prev.upcoming_deadlines.map(d =>
                        d.id === deadlineId ? { ...d, completed: data.completed } : d
                    )
                }));
            }
        } catch (error) {
            console.error('Error toggling deadline:', error);
        }
    };

    const toggleSchedule = async (scheduleId) => {
        try {
            const response = await fetch(`${API_URL}/api/schedule/${scheduleId}/toggle/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                setDashboard(prev => ({
                    ...prev,
                    today_schedule: prev.today_schedule.map(s =>
                        s.id === scheduleId ? { ...s, completed: data.completed } : s
                    )
                }));
            }
        } catch (error) {
            console.error('Error toggling schedule:', error);
        }
    };

    const toggleEvent = async (eventId) => {
        try {
            const response = await fetch(`${API_URL}/api/events/${eventId}/toggle/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                setDashboard(prev => ({
                    ...prev,
                    registered_events: prev.registered_events.map(e =>
                        e.id === eventId ? { ...e, completed: data.completed } : e
                    )
                }));
            }
        } catch (error) {
            console.error('Error toggling event:', error);
        }
    };

    // Skeleton Loading
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-9 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                
                {/* Skeleton Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
                                    <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                                </div>
                                <div className="bg-gray-200 p-3 rounded-lg w-12 h-12 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skeleton Sections */}
                {[1, 2, 3].map(section => (
                    <div key={section} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-200">
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                        <div className="space-y-3">
                            {[1, 2].map(item => (
                                <div key={item} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const deadlines = dashboard?.upcoming_deadlines || [];
    const schedule = dashboard?.today_schedule || [];
    const events = dashboard?.registered_events || [];
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#500000]">Welcome to Your Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Stats Cards */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#500000]">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500 text-sm">Upcoming Events</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">0</p>
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
                    <p className="text-3xl font-bold text-gray-800 mt-1">0</p>
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
                    <p className="text-3xl font-bold text-gray-800 mt-1">0</p>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg">
                    <MapPin className="text-green-500" size={24} />
                    </div>
                </div>
                </div>
            </div>

            {/* Today's Schedule with Maroon accent */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-[#500000] mb-4">
                    Today's Schedule
                </h2>

                <div className="space-y-3">
                    {schedule.length === 0 && (
                        <p className="text-sm text-gray-500">No events today</p>
                    )}

                    {schedule.map(item => (
                        <div
                            key={item.id}
                            className="p-3 bg-gray-50 rounded-lg flex items-center justify-between group hover:bg-[#500000]/5 transition-colors"
                        >
                            <div className={item.completed ? 'line-through text-gray-400' : ''}>
                                <p className="font-semibold text-gray-800">{item.title}</p>
                                <p className="text-sm text-gray-500">
                                    {item.time} — {item.end_time}
                                </p>
                                <p className="text-sm text-gray-500">{item.location}</p>
                            </div>
                            
                            <button
                                onClick={() => toggleSchedule(item.id)}
                                className={`p-2 rounded-full transition-all ${
                                    item.completed 
                                        ? 'bg-green-100 text-green-600' 
                                        : 'bg-gray-200 text-gray-400 hover:bg-green-100 hover:text-green-600'
                                }`}
                                title={item.completed ? "Mark as incomplete" : "Mark as complete"}
                            >
                                <Check size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Deadlines with Maroon accent */}
            <div className="bg-white rounded-xl shadow-md p-6 ">
                <h2 className="text-xl font-bold text-[#500000] mb-4">
                    Upcoming Deadlines
                </h2>

                <div className="space-y-4">
                    {deadlines.length === 0 && (
                        <p className="text-sm text-gray-500">No upcoming deadlines</p>
                    )}

                    {deadlines
                        .filter(item => item.days_until_due <= 3)
                        .map(item => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg group hover:bg-[#500000]/5 transition-colors"
                        >
                            <div className={item.completed ? 'line-through text-gray-400' : ''}>
                                <p className="font-semibold text-gray-800">
                                    {item.course} — {item.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Due {item.due_date} at {item.due_time}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span
                                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                                        item.days_until_due <= 3
                                            ? "bg-red-100 text-red-600"
                                            : "bg-[#500000]/10 text-[#500000]"
                                    }`}
                                >
                                    {item.days_until_due} days left
                                </span>
                                
                                <button
                                    onClick={() => toggleDeadline(item.id)}
                                    className={`p-2 rounded-full transition-all ${
                                        item.completed 
                                            ? 'bg-green-100 text-green-600' 
                                            : 'bg-gray-200 text-gray-400 hover:bg-green-100 hover:text-green-600'
                                    }`}
                                    title={item.completed ? "Mark as incomplete" : "Mark as complete"}
                                >
                                    <Check size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Registered Events with Maroon accent */}
            <div className="bg-white rounded-xl shadow-md p-6 ">
                <h2 className="text-xl font-bold text-[#500000] mb-4">
                    Upcoming Events
                </h2>

                <div className="space-y-3">
                    {events.length === 0 && (
                        <p className="text-sm text-gray-500">No registered events</p>
                    )}

                    {events.map(event => (
                        <div
                            key={event.id}
                            className="p-3 bg-gray-50 rounded-lg flex items-center justify-between group hover:bg-[#500000]/5 transition-colors"
                        >
                            <div className={event.completed ? 'line-through text-gray-400' : ''}>
                                <p className="font-semibold text-gray-800">{event.title}</p>
                                <p className="text-sm text-gray-500">
                                    {event.date} at {event.time}
                                </p>
                            </div>
                            
                            <button
                                onClick={() => toggleEvent(event.id)}
                                className={`p-2 rounded-full transition-all ${
                                    event.completed 
                                        ? 'bg-green-100 text-green-600' 
                                        : 'bg-gray-200 text-gray-400 hover:bg-green-100 hover:text-green-600'
                                }`}
                                title={event.completed ? "Mark as incomplete" : "Mark as complete"}
                            >
                                <Check size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}