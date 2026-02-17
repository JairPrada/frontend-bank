"use client";

import React, { forwardRef } from "react";
import { CheckIcon, ErrorIcon } from "../icons";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", disabled, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300">
          <div className="relative shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              disabled={disabled}
              className={`peer sr-only ${className}`}
              {...props}
            />
            <div
              className={`w-5 h-5 border-2 rounded-md transition-all duration-300 
              ${hasError ? "border-red-400" : "border-gray-300 group-hover:border-emerald-400"}
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              peer-checked:bg-emerald-500 peer-checked:border-emerald-500 peer-checked:shadow-[0_0_12px_rgba(16,185,129,0.4)]`}
            >
              <CheckIcon className="w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <div className="absolute inset-0 w-5 h-5 peer-checked:block hidden">
              <div className="w-full h-full bg-emerald-500 rounded-md flex items-center justify-center shadow-lg">
                <CheckIcon className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          {label && (
            <span className="text-sm text-gray-600 leading-relaxed">{label}</span>
          )}
        </label>
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1 ml-3">
            <ErrorIcon className="w-4 h-4" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
