"use client";

import { ArrowRightIcon, SpinnerIcon } from "@/shared/components/icons";

interface SubmitButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  text: string;
  showArrow?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
}

export const SubmitButton = ({
  isLoading = false,
  loadingText = "Procesando...",
  text,
  showArrow = true,
  disabled = false,
  type = "submit",
  onClick,
}: SubmitButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className="w-full py-4 px-6 rounded-xl font-semibold text-white 
        bg-emerald-500 hover:bg-emerald-600
        shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50
        transform hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        flex items-center justify-center gap-2
        relative overflow-hidden group"
    >
      {isLoading ? (
        <>
          <SpinnerIcon className="animate-spin h-5 w-5" />
          {loadingText}
        </>
      ) : (
        <>
          <span className="relative z-10">{text}</span>
          {showArrow && (
            <ArrowRightIcon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          )}
          <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </>
      )}
    </button>
  );
};
