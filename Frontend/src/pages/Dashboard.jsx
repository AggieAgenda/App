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

// Mock Outlet component for demonstration
function Outlet() {
  return (
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
  );
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: "overview", label: "Dashboard", icon: Home, path: "/dashboard/overview" },
    { id: "syllabus", label: "Syllabus Reader", icon: FileText, path: "/dashboard/syllabus" },
    { id: "calendar", label: "Calendar", icon: Calendar, path: "/dashboard/calendar" },
    { id: "events", label: "Find Events", icon: MapPin, path: "/dashboard/events" },
    { id: "organizations", label: "Organizations", icon: Users, path: "/dashboard/organizations" }
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } bg-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200 overflow-hidden`}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#500000] flex items-center gap-2">
            <div className="w-8 h-8 bg-[#500000] rounded-lg flex items-center justify-center text-white text-sm font-bold">
              AA
            </div>
            Aggie Agenda
          </h2>
          <p className="text-sm text-gray-500 mt-1">Beta Version</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#500000] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-[#500000]/5 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">Need Help?</p>
            <p className="text-xs text-gray-600 mb-3">Check out our guide to get started</p>
            <button className="text-xs text-[#500000] font-semibold hover:underline">
              View Documentation →
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu size={24} className="text-gray-700" />
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search events, courses..."
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowUserMenu(false);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <Bell size={22} className="text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      <button onClick={() => setShowNotifications(false)}>
                        <X size={18} className="text-gray-500" />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-800">New assignment added</p>
                          <p className="text-xs text-gray-500 mt-1">CSCE 314 - Due in 3 days</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings size={22} className="text-gray-700" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#500000] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    JD
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-800">John Doe</p>
                      <p className="text-sm text-gray-500">john.doe@tamu.edu</p>
                    </div>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <User size={16} />
                      <span className="text-sm">Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <Settings size={16} />
                      <span className="text-sm">Settings</span>
                    </button>
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600">
                        <LogOut size={16} />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}