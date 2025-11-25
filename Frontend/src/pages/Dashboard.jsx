import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: sidebarOpen ? 0 : -200 }}
        transition={{ duration: 0.3 }}
        className="w-64 bg-white shadow-xl p-4 flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4 text-lg">
          <a href="/dashboard" className="hover:text-blue-600">Overview</a>
          <a href="/dashboard/analytics" className="hover:text-blue-600">Analytics</a>
          <a href="/dashboard/calendar" className="hover:text-blue-600">Calendar</a>
          <a href="/dashboard/settings" className="hover:text-blue-600">Settings</a>
        </nav>
      </motion.aside>

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
            <Bell className="cursor-pointer" />
            <User className="cursor-pointer" />
          </div>
        </header>

        {/* Content Slot */}
        <div className="p-6">
          {/* The child components will appear here when used with React Router */}
          <h1>This is still in Devlopment</h1>
          <h1>Coming Soon!</h1>
        </div>
      </div>
    </div>
  );
}
