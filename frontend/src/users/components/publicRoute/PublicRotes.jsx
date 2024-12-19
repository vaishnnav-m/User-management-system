import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRotes({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRotes;
