import { useState, useCallback } from "react";
import type { Notification } from "../components/shared/NotificationSystem";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (type: Notification["type"], message: string) => {
      const notification: Notification = {
        id: `${Date.now()}-${Math.random()}`,
        type,
        message,
        timestamp: Date.now(),
      };

      setNotifications((prev) => [...prev, notification]);
    },
    [],
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message: string) => {
      addNotification("success", message);
    },
    [addNotification],
  );

  const showError = useCallback(
    (message: string) => {
      addNotification("error", message);
    },
    [addNotification],
  );

  const showInfo = useCallback(
    (message: string) => {
      addNotification("info", message);
    },
    [addNotification],
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showSuccess,
    showError,
    showInfo,
    dismissNotification,
    clearAll,
  };
};

export const formatErrorMessage = (error: any): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  return "An unexpected error occurred";
};
