"use client";

import React from "react";
import { createPortal } from "react-dom";
import type { ToastContainerProps, ToastProps } from "./toast.types";
import { ToastItem } from "./toast-item";
import { positionClasses } from "./toast-styles";

export const ToastContainer: React.FC<
  ToastContainerProps & { toasts: ToastProps[] }
> = ({ position = "top-right", toasts }) => {
  if (typeof window === "undefined" || toasts.length === 0) return null;

  return createPortal(
    <div
      className={`fixed z-50 flex flex-col gap-3 w-full max-w-sm ${positionClasses[position]}`}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>,
    document.body
  );
};

export { ToastItem as default } from "./toast-item";
export { useToast } from "./use-toast";
export type { ToastType, ToastProps, ToastPosition, ToastContainerProps } from "./toast.types";
