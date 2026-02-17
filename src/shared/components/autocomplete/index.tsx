"use client";

import React from "react";
import type { AutocompleteProps } from "./autocomplete.types";
import { useAutocomplete } from "./use-autocomplete";
import { AutocompleteInput } from "./autocomplete-input";
import { AutocompleteDropdown } from "./autocomplete-dropdown";

const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  error,
  helperText,
  placeholder = "Buscar...",
  options,
  value = "",
  onChange,
  onSelect,
  disabled,
  className = "",
  noOptionsText = "Sin resultados",
}) => {
  const {
    isOpen,
    setIsOpen,
    inputValue,
    highlightedIndex,
    setHighlightedIndex,
    filteredOptions,
    inputRef,
    listRef,
    containerRef,
    handleInputChange,
    handleSelect,
    handleKeyDown,
  } = useAutocomplete({ options, value, onChange, onSelect });

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <AutocompleteInput
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        isOpen={isOpen}
        hasError={!!error}
        className={className}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {isOpen && (
        <AutocompleteDropdown
          options={filteredOptions}
          highlightedIndex={highlightedIndex}
          noOptionsText={noOptionsText}
          listRef={listRef as React.RefObject<HTMLUListElement>}
          onSelect={handleSelect}
          onHighlight={setHighlightedIndex}
        />
      )}

      {(error || helperText) && (
        <p
          className={`mt-2 text-sm ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Autocomplete;
export type { AutocompleteOption, AutocompleteProps } from "./autocomplete.types";
