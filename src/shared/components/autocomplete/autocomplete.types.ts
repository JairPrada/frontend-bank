export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  disabled?: boolean;
  className?: string;
  noOptionsText?: string;
}
