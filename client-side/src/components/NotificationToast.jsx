import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { useApp } from "../context/AppContext";

const NotificationToast = () => {
  const { notifications, removeNotification } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-emerald-400 text-lg" />;
      case "error":
        return <FaExclamationCircle className="text-red-400 text-lg" />;
      case "info":
        return <FaInfoCircle className="text-blue-400 text-lg" />;
      default:
        return <FaInfoCircle className="text-blue-400 text-lg" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "success":
        return "border-emerald-500/30";
      case "error":
        return "border-red-500/30";
      case "info":
        return "border-blue-500/30";
      default:
        return "border-white/10";
    }
  };

  return (
    <div className="fixed top-24 right-4 z-[200] flex flex-col gap-3 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`flex items-center gap-3 p-4 bg-surface-bright/90 backdrop-blur-xl 
                       rounded-xl border ${getBorderColor(notification.type)} 
                       shadow-2xl shadow-black/30`}
          >
            {getIcon(notification.type)}
            <p className="text-on-surface text-sm font-medium flex-1">
              {notification.message}
            </p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-on-surface-variant/50 hover:text-on-surface-variant 
                         transition-colors cursor-pointer p-1"
            >
              <FaTimes className="text-xs" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
