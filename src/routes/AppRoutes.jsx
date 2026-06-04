import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import MainLayout from "../components/layout/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
      <Route path="/admin/login" element={<MainLayout><AdminLogin /></MainLayout>} />
      <Route path="/admin" element={<MainLayout><AdminDashboard /></MainLayout>} />
    </Routes>
  );
}

export default AppRoutes;
