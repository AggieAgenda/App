import { useState } from "react";
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
export default function DashboardOverview() {
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

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                {[
                    { title: "CSCE 314 Syllabus uploaded", time: "2 hours ago", type: "success" },
                    { title: "Career Fair added to calendar", time: "5 hours ago", type: "info" },
                    { title: "MATH 251 Exam reminder", time: "1 day ago", type: "warning" }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${
                        item.type === 'success' ? 'bg-green-500' : 
                        item.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        

        </>
    );
}
