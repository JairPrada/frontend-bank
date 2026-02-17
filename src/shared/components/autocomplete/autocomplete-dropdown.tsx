import React from "react";
import type { AutocompleteOption } from "./autocomplete.types";

interface AutocompleteDropdownProps {
  options: AutocompleteOption[];
  highlightedIndex: number;
  noOptionsText: string;
  listRef: React.RefObject<HTMLUListElement>;
  onSelect: (option: AutocompleteOption) => void;
  onHighlight: (index: number) => void;
}

export const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  options,
  highlightedIndex,
  noOptionsText,
  listRef,
  onSelect,
  onHighlight,
}) => {
  return (
    <ul
      ref={listRef}
      className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto"
      role="listbox"
      id="autocomplete-listbox"
    >
      {options.length > 0 ? (
        options.map((option, index) => (
          <li
            key={option.value}
            role="option"
            aria-selected={highlightedIndex === index}
            className={`px-4 py-3 cursor-pointer transition-colors ${
              highlightedIndex === index
                ? "bg-emerald-50 text-emerald-900"
                : "hover:bg-gray-50 text-gray-900"
            }`}
            onClick={() => onSelect(option)}
            onMouseEnter={() => onHighlight(index)}
          >
            {option.label}
          </li>
        ))
      ) : (
        <li className="px-4 py-3 text-gray-500 text-center">{noOptionsText}</li>
      )}
    </ul>
  );
};
