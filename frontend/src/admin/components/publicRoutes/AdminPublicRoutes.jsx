import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminPublicRoutes({ children }) {
  const isAdmin = useSelector((state) => state.auth.isAdminAuthenticated);
  if (isAdmin) return <Navigate to="/admin" replace />;

  return children;
}

export default AdminPublicRoutes;
