"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { OtpInputProps } from "../interfaces";

export const OtpInput = ({
  length,
  value,
  onChange,
  onComplete,
  hasError = false,
  disabled = false,
}: OtpInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    const digit = inputValue.replace(/\D/g, "").slice(-1);
    const newValue = [...value];
    newValue[index] = digit;
    onChange(newValue);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    if (digit && index === length - 1 && onComplete) {
      const code = newValue.join("");
      if (code.length === length) {
        onComplete(code);
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      const newValue = [...value];
      
      if (value[index]) {
        newValue[index] = "";
        onChange(newValue);
      } else if (index > 0) {
        newValue[index - 1] = "";
        onChange(newValue);
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight") {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newValue = [...value];

    pastedData.split("").forEach((digit, i) => {
      if (i < length) {
        newValue[i] = digit;
      }
    });

    onChange(newValue);

    if (pastedData.length === length && onComplete) {
      onComplete(pastedData);
    } else {
      focusInput(Math.min(pastedData.length, length - 1));
    }
  };

  const baseInputClasses = `
    w-12 h-14 sm:w-14 sm:h-16 
    text-center text-xl sm:text-2xl font-semibold
    rounded-xl border-2 
    bg-white
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const stateClasses = hasError
    ? "border-red-300 text-red-600 focus:border-red-500 focus:ring-red-200"
    : "border-gray-200 text-gray-900 focus:border-emerald-500 focus:ring-emerald-200";

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className={`${baseInputClasses} ${stateClasses}`}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};
