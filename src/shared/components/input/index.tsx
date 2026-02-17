"use client";

import React, { forwardRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseInputClasses =
      "w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none";

    const stateClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
      : isFocused
        ? "border-emerald-500 ring-2 ring-emerald-100"
        : "border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

    const disabledClasses = disabled
      ? "bg-gray-50 text-gray-400 cursor-not-allowed"
      : "";

    const iconPaddingLeft = leftIcon ? "pl-11" : "";
    const iconPaddingRight = rightIcon ? "pr-11" : "";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={`${baseInputClasses} ${stateClasses} ${disabledClasses} ${iconPaddingLeft} ${iconPaddingRight} ${className}`}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={`mt-2 text-sm ${error ? "text-red-500" : "text-gray-500"}`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
