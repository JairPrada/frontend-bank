"use client";

import { useState, useCallback, useRef } from "react";
import type { ToastProps, ToastType } from "./toast.types";

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const toastIdRef = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastProps, "id" | "onClose">) => {
      toastIdRef.current += 1;
      const id = `toast-${toastIdRef.current}`;
      setToasts((prev) => [...prev, { ...toast, id, onClose: removeToast }]);
    },
    [removeToast]
  );

  const showToast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      addToast({ type, title, message });
    },
    [addToast]
  );

  const success = (title: string, message?: string) =>
    showToast("success", title, message);

  const error = (title: string, message?: string) =>
    showToast("error", title, message);

  const warning = (title: string, message?: string) =>
    showToast("warning", title, message);

  const info = (title: string, message?: string) =>
    showToast("info", title, message);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
};
