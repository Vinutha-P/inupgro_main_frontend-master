"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { removeNotification } from "@/features/notification/notificationSlice";
import { createPortal } from "react-dom";

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notification.notifications
  );
  const [hovered, setHovered] = useState(false);
  const timers = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const [hasMounted, setHasMounted] = useState(false);

   // Ensure component only renders after mounting (client side)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // Clear timers for removed notifications
    Object.keys(timers.current).forEach((id) => {
      if (!notifications.find((n) => n.id === id)) {
        clearTimeout(timers.current[id]);
        delete timers.current[id];
      }
    });

    if (!hovered) {
      notifications.forEach((notification) => {
        if (!timers.current[notification.id]) {
          timers.current[notification.id] = setTimeout(() => {
            dispatch(removeNotification(notification.id));
            delete timers.current[notification.id];
          }, 3000);
        }
      });
    } else {
      // Pause timers when hovered
      Object.values(timers.current).forEach(clearTimeout);
      timers.current = {};
    }

    // Cleanup on unmount
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
      timers.current = {};
    };
  }, [notifications, hovered, dispatch]);

   if (!hasMounted) return null;
  // if (typeof document === "undefined") return null;

  return createPortal(
    <div
      style={{ zIndex: "2147483647" }}
      className="fixed top-4 right-4 space-y-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {notifications?.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center justify-between p-4 rounded-md shadow-md ${
            notification.type === "SUCCESS"
              ? "bg-[#53a653] text-white"
              : "bg-red-500 text-white"
          }`}
          role="alert"
          aria-live="assertive"
        >
          <span>{notification.message}</span>
          <button
            onClick={() => dispatch(removeNotification(notification.id))}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default Notification;
