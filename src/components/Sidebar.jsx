import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { LogOut, Home, FileText, Menu } from "lucide-react";
import logo from "../assets/gig_logo.jpg";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const menuItems = [
    { to: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/logs", label: "Logs", icon: <FileText size={20} /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r shadow-sm z-50 transition-all duration-300 ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        aria-label={isOpen ? "Kapat" : "Aç"}
        className="cursor-pointer absolute top-4 -right-5 w-9 h-9 bg-indigo-900 text-white rounded-full shadow flex items-center justify-center hover:bg-orange-900 transition-colors"
      >
        <Menu
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      {/* Menu */}
      <nav className="mt-16 flex flex-col gap-1 ">
        <img src={logo} alt="Logo" className="" />
        {menuItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2  text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            title={label}
          >
            {icon}
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut size={20} />
          {isOpen && <span>Çıkış</span>}
        </button>
      </nav>
    </aside>
  );
}
