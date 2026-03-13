import React, { useState, useEffect } from "react";

export interface Notification {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  timestamp: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onDismiss,
}) => {
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        onDismiss(notification.id);
      }, 5000);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [notifications, onDismiss]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-system">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => onDismiss(notification.id)}
        >
          <span className="notification-message">{notification.message}</span>
          <button
            className="notification-close"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(notification.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
