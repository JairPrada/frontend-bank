import React from "react";

interface AutocompleteInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  placeholder: string;
  disabled?: boolean;
  isOpen: boolean;
  hasError: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  inputRef,
  value,
  placeholder,
  disabled,
  isOpen,
  hasError,
  className = "",
  onChange,
  onFocus,
  onKeyDown,
}) => {
  const baseClasses =
    "w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none";

  const stateClasses = hasError
    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
    : isOpen
      ? "border-emerald-500 ring-2 ring-emerald-100"
      : "border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  const disabledClasses = disabled
    ? "bg-gray-50 text-gray-400 cursor-not-allowed"
    : "";

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="autocomplete-listbox"
        aria-haspopup="listbox"
        aria-autocomplete="list"
      />

      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};
