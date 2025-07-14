import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
     className={`fixed top-0 left-0 h-screen bg-blue-50 shadow-lg z-50 transition-[width] duration-300 ${
    isOpen ? "w-[220px]" : "w-5"
  }`}
    >
      <button
        onClick={toggleSidebar}
        aria-label={isOpen ? "Kapat" : "Aç"}
        className="absolute top-4 -right-5 w-10 h-10 bg-indigo-500 text-white rounded-full shadow-md flex items-center justify-center hover:bg-indigo-600 transition-colors z-10"
      >
        <span className={`block transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          &#9776;
        </span>
      </button>

      <nav   className={`mt-16 flex flex-col gap-2 transition-all duration-300 ${
    isOpen ? "block" : "hidden"
  }`}>
        {[
          { to: "/dashboard", label: "Dashboard", icon: "🏠" },
          { to: "/logs", label: "Logs", icon: "📜" },
          { to: "/login", label: "Çıkış", icon: "🚪" },
        ].map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-gray-800 rounded-lg transition-colors ${isActive
                ? "bg-indigo-500 text-white"
                : "hover:bg-blue-100"
              }`
            }
            title={label}
          >
            <span className="text-lg">{icon}</span>
            {isOpen && <span className="whitespace-nowrap font-medium">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
