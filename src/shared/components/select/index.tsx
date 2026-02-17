"use client";

import React, { forwardRef, useState } from "react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder = "Seleccionar...",
      className = "",
      disabled,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseSelectClasses =
      "w-full px-4 py-3 pr-10 rounded-xl border bg-white text-gray-900 transition-all duration-200 outline-none appearance-none cursor-pointer";

    const stateClasses = error
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
      : isFocused
        ? "border-emerald-500 ring-2 ring-emerald-100"
        : "border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

    const disabledClasses = disabled
      ? "bg-gray-50 text-gray-400 cursor-not-allowed"
      : "";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            value={value}
            className={`${baseSelectClasses} ${stateClasses} ${disabledClasses} ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onChange?.(e.target.value)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isFocused ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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

Select.displayName = "Select";

export default Select;
