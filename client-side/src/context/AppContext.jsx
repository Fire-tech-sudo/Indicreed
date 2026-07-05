// src/context/AppContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create Context
const AppContext = createContext(null);

// Custom Hook - easy access
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

// Provider Component
export const AppProvider = ({ children }) => {
  // ============ AUTH STATE ============
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Initial check
  const [authError, setAuthError] = useState(null);

  // ============ APP STATE ============
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ============ CHECK EXISTING SESSION ON MOUNT ============
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const savedUser = localStorage.getItem("indicreed_user");
      const savedToken = localStorage.getItem("indicreed_token");

      if (savedUser && savedToken) {
        // Token validity check (basic)
        const tokenData = JSON.parse(atob(savedToken.split(".")[1] || "{}"));
        const isExpired = tokenData.exp && tokenData.exp * 1000 < Date.now();

        if (isExpired) {
          // Token expired - logout
          logout();
        } else {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      // Corrupted data - clean up
      localStorage.removeItem("indicreed_user");
      localStorage.removeItem("indicreed_token");
    } finally {
      setIsAuthLoading(false);
    }
  };

  // ============ LOGIN ============
  const login = async (email, password) => {
    setAuthError(null);
    setIsAuthLoading(true);

    try {
      // 🔄 REPLACE with your actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();

      // ============ DEMO/MOCK LOGIN ============
      // Remove this block when connecting real API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo validation
      if (email === "test@test.com" && password === "password123") {
        throw new Error("Demo: Use any other email to login");
      }

      const mockUser = {
        id: Date.now(),
        name: email.split("@")[0],
        email: email,
        avatar: null,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      // Create a simple mock token (NOT for production!)
      const mockToken = btoa(
        JSON.stringify({
          userId: mockUser.id,
          email: mockUser.email,
          exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
        }),
      );

      const data = { user: mockUser, token: `mock.${mockToken}.signature` };
      // ============ END DEMO BLOCK ============

      // Save to state
      setUser(data.user);
      setIsAuthenticated(true);

      // Save to localStorage
      localStorage.setItem("indicreed_user", JSON.stringify(data.user));
      localStorage.setItem("indicreed_token", data.token);

      addNotification("success", `Welcome back, ${data.user.name}!`);

      return { success: true, user: data.user };
    } catch (error) {
      const errorMsg = error.message || "Login failed. Please try again.";
      setAuthError(errorMsg);
      addNotification("error", errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsAuthLoading(false);
    }
  };

  // ============ SIGNUP ============
  const signup = async (name, email, password) => {
    setAuthError(null);
    setIsAuthLoading(true);

    try {
      // 🔄 REPLACE with your actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // });
      // const data = await response.json();

      // ============ DEMO/MOCK SIGNUP ============
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: null,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      const mockToken = btoa(
        JSON.stringify({
          userId: mockUser.id,
          email: mockUser.email,
          exp: Math.floor(Date.now() / 1000) + 86400,
        }),
      );

      const data = { user: mockUser, token: `mock.${mockToken}.signature` };
      // ============ END DEMO BLOCK ============

      setUser(data.user);
      setIsAuthenticated(true);

      localStorage.setItem("indicreed_user", JSON.stringify(data.user));
      localStorage.setItem("indicreed_token", data.token);

      addNotification(
        "success",
        `Account created! Welcome, ${data.user.name}!`,
      );

      return { success: true, user: data.user };
    } catch (error) {
      const errorMsg = error.message || "Signup failed. Please try again.";
      setAuthError(errorMsg);
      addNotification("error", errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsAuthLoading(false);
    }
  };

  // ============ LOGOUT ============
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);

    localStorage.removeItem("indicreed_user");
    localStorage.removeItem("indicreed_token");

    addNotification("info", "You have been logged out.");
  };

  // ============ UPDATE USER ============
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("indicreed_user", JSON.stringify(updatedUser));
  };

  // ============ NOTIFICATION SYSTEM ============
  const addNotification = (type, message) => {
    const id = Date.now();
    const notification = { id, type, message };
    setNotifications((prev) => [...prev, notification]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // ============ GET AUTH TOKEN (for API calls) ============
  const getToken = () => {
    return localStorage.getItem("indicreed_token");
  };

  // ============ CONTEXT VALUE ============
  const contextValue = {
    // Auth
    user,
    isAuthenticated,
    isAuthLoading,
    authError,
    login,
    signup,
    logout,
    updateUser,
    getToken,

    // App
    theme,
    setTheme,
    notifications,
    addNotification,
    removeNotification,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
