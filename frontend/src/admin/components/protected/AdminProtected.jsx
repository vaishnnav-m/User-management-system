import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtected({ children }) {
  const isAdmin = useSelector((state) => state.auth.isAdminAuthenticated);
  if (isAdmin) return children;

  return <Navigate to="/admin/login" replace />;
}

export default AdminProtected;
