import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";
import Logs from "../pages/Logs";
import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="*" element={<Dashboard />} /> {/* Ya da 404 sayfası */}
        </Route>
      </Routes>
    </Router>
  );
}
