"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppNotifaction from "@/components/AppNotifaction";

interface NotificationContextType {
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 2000); 
  };

  const hideNotification = () => setMessage(null);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AppNotifaction>
             Quizz {message}
            </AppNotifaction>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification debe ser usado dentro de un NotificationProvider");
  }
  return context;
};


