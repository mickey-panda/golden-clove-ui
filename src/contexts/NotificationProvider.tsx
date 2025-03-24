"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle, AlertTriangle } from "lucide-react";

// Define types for notifications
type NotificationType = "success" | "error" | "info";
type Notification = { id: number; type: NotificationType; message: string };

// Create a context
const NotificationContext = createContext<{
  addNotification: (type: NotificationType, message: string) => void;
} | null>(null);

// Provider component
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Function to add a new notification
  const addNotification = (type: NotificationType, message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}

      {/* Notification Container */}
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50 max-w-sm">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`flex items-center p-3 rounded-lg shadow-lg ${
                notif.type === "success"
                  ? "bg-green-500 text-white"
                  : notif.type === "error"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-500 text-black"
              }`}
            >
              {notif.type === "success" ? (
                <CheckCircle className="w-6 h-6 mr-2" />
              ) : notif.type === "error" ? (
                <XCircle className="w-6 h-6 mr-2" />
              ) : (
                <AlertTriangle className="w-6 h-6 mr-2" />
              )}
              <span className="flex-1">{notif.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

// Custom hook to use notifications
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
