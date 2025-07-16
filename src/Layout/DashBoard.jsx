import UseAdmin from "../Hooks/UseAdmin";
import useCarts from "../Hooks/useCarts/useCarts";
import UseInstructor from "../Hooks/UseInstuctor";

import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  History,
  Home,
  LayoutDashboard,
  Menu,
  PlusCircle,
  School,
  Settings,
  ShoppingCart,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const DashBoard = () => {
  const [cart] = useCarts();
  const [isAdmin] = UseAdmin();
  const [isInstructor] = UseInstructor();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Define navigation items based on user role
  const adminNavItems = [
    {
      to: "adminDashBoard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Admin Dashboard",
    },
    {
      to: "manageClasses",
      icon: <School className="w-5 h-5" />,
      label: "Manage Classes",
    },
    {
      to: "manageUsers",
      icon: <Users className="w-5 h-5" />,
      label: "Manage Users",
    },
  ];

  const instructorNavItems = [
    {
      to: "instructorDashBoard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Instructor Dashboard",
    },
    {
      to: "addClass",
      icon: <PlusCircle className="w-5 h-5" />,
      label: "Add Class",
    },
    {
      to: "myclasses",
      icon: <BookOpen className="w-5 h-5" />,
      label: "My Classes",
    },
  ];

  const studentNavItems = [
    {
      to: "studentDashBoard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Student Dashboard",
    },
    {
      to: "MySelectedClass",
      icon: <ShoppingCart className="w-5 h-5" />,
      label: "Selected Classes",
      badge: cart?.length || 0,
    },
    {
      to: "MyEnrolledClass",
      icon: <BookOpen className="w-5 h-5" />,
      label: "Enrolled Classes",
    },
    {
      to: "PaymentHistory",
      icon: <History className="w-5 h-5" />,
      label: "Payment History",
    },
  ];

  const commonNavItems = [
    { to: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
    {
      to: "/instuctors",
      icon: <GraduationCap className="w-5 h-5" />,
      label: "Instructors",
    },
    { to: "/classes", icon: <School className="w-5 h-5" />, label: "Classes" },
  ];

  // Determine which nav items to show based on role
  let roleSpecificNavItems = studentNavItems;
  let roleTitle = "Student Portal";
  let roleIcon = <User className="w-6 h-6" />;

  if (isAdmin) {
    roleSpecificNavItems = [
      ...adminNavItems,
      ...instructorNavItems,
      ...studentNavItems,
    ];
    roleTitle = "Admin Portal";
    roleIcon = <Settings className="w-6 h-6" />;
  } else if (isInstructor) {
    roleSpecificNavItems = instructorNavItems;
    roleTitle = "Instructor Portal";
    roleIcon = <GraduationCap className="w-6 h-6" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow-md h-16 flex items-center px-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <div className="ml-4 font-bold text-lg text-gray-800">Dashboard</div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-white shadow-xl transition-all duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-72 overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg text-white">
              {roleIcon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{roleTitle}</h2>
              <p className="text-sm text-gray-500">Welcome back</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {/* Role-specific Navigation */}
          <div className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Dashboard
            </h3>
            <ul className="space-y-1">
              {roleSpecificNavItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={isMobile ? toggleSidebar : undefined}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge ? (
                      <span className="bg-purple-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>

          {/* Common Navigation */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Main Navigation
            </h3>
            <ul className="space-y-1">
              {commonNavItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={isMobile ? toggleSidebar : undefined}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Profile</p>
              <p className="text-xs text-gray-500">Account settings</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-72" : ""
        } pt-16 lg:pt-0 min-h-screen`}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Mobile Toggle Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={toggleSidebar}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Menu className="w-5 h-5" />
              <span>Menu</span>
            </button>
          </div>

          {/* Page Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
