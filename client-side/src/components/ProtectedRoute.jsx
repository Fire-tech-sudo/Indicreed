// src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";
import { FaFilm } from "react-icons/fa";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAuthLoading } = useApp();
  const location = useLocation();

  // Still checking auth status
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-5">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <FaFilm className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-lg" />
        </div>
        <p className="text-on-surface-variant text-lg">Verifying access...</p>
      </div>
    );
  }

  // Not logged in → redirect to auth page
  // Save current location so we can redirect back after login
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // Logged in → show the page
  return children;
};

export default ProtectedRoute;
