import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

const API_BASE = import.meta.env.VITE_BACKEND_URI; // production me apna deployed backend URL daalna

export const AppProvider = ({ children }) => {
  // ============ AUTH STATE ============
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // ============ APP STATE ============
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ============ CHECK EXISTING SESSION ON MOUNT ============
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("indicreed_token");

    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Session expired");

      const data = await response.json();
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("indicreed_user");
      localStorage.removeItem("indicreed_token");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // ============ SEND OTP (registration step 1) ============
  const register = async (name, email, password, otp) => {
    setAuthError(null);
    setIsAuthLoading(true);

    try {
      const response = await fetch(`${API_BASE}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, otp }),
      });

      const data = await response.json();

      // ✅ FIX: HTTP status + success field dono check karo
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      setUser(data.user);
      setIsAuthenticated(true);

      localStorage.setItem("indicreed_user", JSON.stringify(data.user));
      localStorage.setItem("indicreed_token", data.token);

      addNotification("success", `Welcome, ${data.user.name}!`);
      return { success: true, user: data.user };
    } catch (error) {
      const errorMsg = error.message || "Registration failed";
      setAuthError(errorMsg);
      addNotification("error", errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsAuthLoading(false);
    }
  };

  // ============ LOGIN ============
  const login = async (email, password) => {
    setAuthError(null);
    setIsAuthLoading(true);

    try {
      const response = await fetch(`${API_BASE}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // ✅ FIX: dono check karo
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data.user);
      setIsAuthenticated(true);

      localStorage.setItem("indicreed_user", JSON.stringify(data.user));
      localStorage.setItem("indicreed_token", data.token);

      addNotification("success", `Welcome back, ${data.user.name}!`);
      return { success: true, user: data.user };
    } catch (error) {
      const errorMsg = error.message || "Login failed";
      setAuthError(errorMsg);
      addNotification("error", errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsAuthLoading(false);
    }
  };

  // ============ SEND OTP ============
  const sendOtp = async (name, email, password) => {
    setAuthError(null);
    try {
      const response = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      // ✅ FIX: dono check karo
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send OTP");
      }

      addNotification("success", data.message || "OTP sent to your email!");
      return { success: true };
    } catch (error) {
      const errorMsg = error.message || "Failed to send OTP";
      setAuthError(errorMsg);
      addNotification("error", errorMsg);
      return { success: false, error: errorMsg };
    }
  };
  // ============ LOGOUT ============
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);

    localStorage.removeItem("indicreed_user");
    localStorage.removeItem("indicreed_token");

    addNotification("info", "Aap logout ho gaye hain.");
  };

  // ============ UPDATE USER (local state only) ============
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

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // ============ GET AUTH TOKEN ============
  const getToken = () => {
    return localStorage.getItem("indicreed_token");
  };

  const contextValue = {
    // Auth
    user,
    isAuthenticated,
    isAuthLoading,
    authError,
    sendOtp,
    register,
    login,
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
