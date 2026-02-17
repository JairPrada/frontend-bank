"use client";

import React, { useEffect, useState, useCallback } from "react";
import type { ToastProps } from "./toast.types";
import { toastIcons, toastStyles } from "./toast-styles";

export const ToastItem: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  }, [id, onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const styles = toastStyles[type];

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-xl shadow-lg transition-all duration-300 ${styles.bg} ${
        !isLeaving
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${styles.icon}`}
      >
        {toastIcons[type]}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-medium ${styles.text}`}>{title}</p>
        {message && (
          <p className={`text-sm mt-1 ${styles.text} opacity-80`}>{message}</p>
        )}
      </div>

      <button
        onClick={handleClose}
        className={`shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors ${styles.text}`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
