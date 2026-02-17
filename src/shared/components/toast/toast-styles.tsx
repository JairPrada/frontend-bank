import React from "react";
import {
  CheckIcon,
  CloseIcon,
  WarningIcon,
  InfoIcon,
} from "@/shared/components/icons";
import type { ToastType } from "./toast.types";

export const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckIcon className="w-5 h-5" />,
  error: <CloseIcon className="w-5 h-5" />,
  warning: <WarningIcon className="w-5 h-5" />,
  info: <InfoIcon className="w-5 h-5" />,
};

export const toastStyles: Record<ToastType, { bg: string; icon: string; text: string }> = {
  success: {
    bg: "bg-emerald-50 border-emerald-200",
    icon: "bg-emerald-100 text-emerald-600",
    text: "text-emerald-800",
  },
  error: {
    bg: "bg-red-50 border-red-200",
    icon: "bg-red-100 text-red-600",
    text: "text-red-800",
  },
  warning: {
    bg: "bg-amber-50 border-amber-200",
    icon: "bg-amber-100 text-amber-600",
    text: "text-amber-800",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: "bg-blue-100 text-blue-600",
    text: "text-blue-800",
  },
};

export const positionClasses: Record<string, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};
