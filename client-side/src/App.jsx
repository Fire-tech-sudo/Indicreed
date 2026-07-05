import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import NotificationToast from "./components/NotificationToast";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Footer from "./components/Footer";
// Pages
import Home from "./pages/Home";
import Portfolio from "./pages/PortfolioPage";
import ProjectDetail from "./pages/ProjectDetails";
import AuthPage from "./pages/AuthPage";

// Paths where the global Navbar should NOT render — Home has its own
// custom navbar placed inside Home.jsx, so it's excluded here. Add more
// paths to this array if other pages later get their own custom navbar.
const HIDE_GLOBAL_NAVBAR_ON = ["/"];

/**
 * Small wrapper rendered INSIDE <Router>, because useLocation only works
 * for components that are descendants of Router — App itself can't call it
 * since App is the component that creates the Router, not a child of it.
 */
function AppLayout() {
  const location = useLocation();
  const showGlobalNavbar = !HIDE_GLOBAL_NAVBAR_ON.includes(location.pathname);

  return (
    <>
      {showGlobalNavbar && (
        <Navbar
          logoColor="#3b82f6"
          logoTextColor="#ffffff"
          logoAccentColor="#3b82f6"
          ctaBgColor="#3b82f6"
          ctaTextColor="#ffffff"
          navLinkColor="#ffffff"
          navLinkHoverColor="#94a3b8"
        />
      )}
      <Routes>
        {/* ============ PUBLIC ROUTES ============ */}
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<ProjectDetail />} />

        {/* ============ AUTH ROUTE (blocked after login) ============ */}
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* ============ PROTECTED ROUTES (login required) ============ */}
        {/* Example: Dashboard page - only accessible after login */}
        {/*
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        */}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        {/* Global Notification Toast */}
        <NotificationToast />
        <AppLayout />
      </AppProvider>
    </Router>
  );
}
export default App;
