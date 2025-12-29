import { useEffect, useMemo, useState } from "react";
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
  Building2,
  GraduationCap,
} from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [sidebarVisibleDesktop, setSidebarVisibleDesktop] = useState(true); // desktop show/hide
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = {
    name: "bob",
    email: "sdlkfj",
    isOrganization: false,
  };

  const navItems = useMemo(
    () => [
      { id: "overview", label: "Dashboard", icon: Home, path: "/dashboard/overview" },
      { id: "syllabus", label: "Syllabus Reader", icon: FileText, path: "/dashboard/syllabus" },
      { id: "calendar", label: "Calendar", icon: Calendar, path: "/dashboard/calendar" },
      { id: "events", label: "Find Events", icon: MapPin, path: "/dashboard/events" },
      { id: "organizations", label: "Organizations", icon: Users, path: "/dashboard/organizations" },
      ...(user.isOrganization
        ? [
            {
              id: "orgview",
              label: "Your Organization",
              icon: Building2,
              path: "/dashboard/organization-view",
            },
          ]
        : []),
      { id: "grades", label: "Grade Calculator", icon: GraduationCap, path: "/dashboard/grades" },
    ],
    [user.isOrganization]
  );

  const location = useLocation();

  // Close the mobile drawer when route changes (so switching tabs works)
  useEffect(() => {
    setSidebarOpen(false);
    setShowNotifications(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // If switching to desktop, ensure mobile drawer is closed
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => {
      if (e.matches) setSidebarOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const activeId =
    navItems.find((it) => location.pathname.startsWith(it.path))?.id ?? "overview";

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (mobile drawer + desktop show/hide) */}
      <aside
        className={[
          "bg-white shadow-2xl border-r border-gray-200 z-50 flex flex-col overflow-hidden",
          // Mobile: fixed drawer. Desktop: normal flow.
          "fixed md:static inset-y-0 left-0",
          // Base width (mobile drawer)
          "w-72",
          // Desktop width toggles between visible and hidden
          sidebarVisibleDesktop ? "md:w-72" : "md:w-0",
          // Smooth transitions
          "transform transition-all duration-300 ease-in-out",
          // Mobile slide in/out
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#500000] flex items-center gap-2">
              <div className="w-8 h-8 bg-[#500000] rounded-lg flex items-center justify-center text-white text-sm font-bold">
                AA
              </div>
              <span>Aggie Agenda</span>
            </h2>

            {/* Close button visible on mobile */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-1">Beta Version</p>

          {/* Desktop show/hide toggle (optional) */}
          <button
            onClick={() => setSidebarVisibleDesktop((v) => !v)}
            className="hidden md:inline-flex mt-4 text-xs text-gray-600 hover:text-gray-900"
          >
            {sidebarVisibleDesktop ? "Hide Sidebar" : "Show Sidebar"}
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={[
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive ? "bg-[#500000] text-white shadow-md" : "text-gray-700 hover:bg-gray-100",
                  ].join(" ")}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full" />}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-[#500000]/5 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">Need Help?</p>
            <p className="text-xs text-gray-600 mb-3">Check out our guide to get started</p>
            <Link to="/documentation">
              <button className="text-xs text-[#500000] font-semibold hover:underline">
                View Documentation →
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex justify-between items-center px-4 md:px-6 py-4">
            <div className="flex items-center gap-3 md:gap-4">
              {/* Mobile: opens drawer */}
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={24} className="text-gray-700" />
              </button>

              {/* Desktop: show/hide sidebar (disappears, not mini) */}
              <button
                onClick={() => setSidebarVisibleDesktop((v) => !v)}
                className="hidden md:inline-flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
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

              {/* Mobile search icon (optional) */}
              <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Search">
                <Search size={22} className="text-gray-700" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications((v) => !v);
                    setShowUserMenu(false);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <Bell size={22} className="text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
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
                        <div
                          key={i}
                          className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <p className="text-sm font-medium text-gray-800">New assignment added</p>
                          <p className="text-xs text-gray-500 mt-1">CSCE 314 - Due in 3 days</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <Link to= 'settings' >
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings size={22} className="text-gray-700" />
                </button>
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu((v) => !v);
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
                    <Link to="profile">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <User size={16} />
                        <span className="text-sm">Profile</span>
                      </button>
                    </Link>
                    <Link to="settings">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Settings size={16} />
                        <span className="text-sm">Settings</span>
                      </button>
                    </Link>
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <Link to="/">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600">
                          <LogOut size={16} />
                          <span className="text-sm">Logout</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <Outlet  />

            <div className="py-10"></div>
            <div className="bg-[#500000]/5 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">We are in beta testing</p>
              <p className="text-xs text-gray-600 mb-3">Not all functionality may be there yet, if you have any issues feel free to reach out</p>
              <Link to="../contact">
                <button className="text-xs text-[#500000] font-semibold hover:underline">
                  Reach out →
                </button>
              </Link>
            </div>
        
            <div className="bg-[#008000]/5 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">Want to upload events ?</p>
              <p className="text-xs text-gray-600 mb-3">Apply to get an Organization account on the settings page or reach out on instagram or by email</p>
              <Link to="../contact">
                <button className="text-xs text-[#008000] font-semibold hover:underline">
                  Reach out →
                </button>
              </Link>
            </div>
            {/*Add donation link here later */}
          </div>
        </main>
      </div>
    </div>
  );
}
