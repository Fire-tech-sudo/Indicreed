// src/components/PublicRoute.jsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FaFilm } from "react-icons/fa";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isAuthLoading } = useApp();
  const location = useLocation();

  // Still checking
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-5">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <FaFilm className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-lg" />
        </div>
        <p className="text-on-surface-variant text-lg">Loading...</p>
      </div>
    );
  }

  // Already logged in → redirect away from auth page
  // Go to where they came from, or home
  if (isAuthenticated) {
    const redirectTo = location.state?.from || "/";
    return <Navigate to={redirectTo} replace />;
  }

  // Not logged in → show auth page
  return children;
};

export default PublicRoute;
