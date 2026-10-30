import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/api";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

export function RequireAuth() {
  if (!getToken()) return <Navigate to="/login" replace />;
  return <AdminLayout />;
}

export function GuestOnly() {
  if (getToken()) return <Navigate to="/" replace />;
  return <Outlet />;
}
