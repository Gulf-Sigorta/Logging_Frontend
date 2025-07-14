import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Sidebar genişlikleri (px)
  const sidebarWidth = sidebarOpen ? 220 : 20;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        style={{
          flexGrow: 1,
          padding: "10px 30px 0 30px",
          backgroundColor: "#fff",
          transition: "margin-left 0.3s",
          marginLeft: sidebarWidth,  // BURASI ÖNEMLİ
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
