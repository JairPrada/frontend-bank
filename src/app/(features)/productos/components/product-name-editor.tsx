import { CheckIcon, XMarkIcon } from "@/shared/components/icons";

interface ProductNameEditorProps {
  value: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ProductNameEditor({
  value,
  inputRef,
  onChange,
  onKeyDown,
  onSave,
  onCancel,
}: ProductNameEditorProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="text-lg font-semibold text-gray-900 border border-emerald-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        onClick={onSave}
        className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        title="Guardar"
      >
        <CheckIcon className="w-5 h-5" />
      </button>
      <button
        onClick={onCancel}
        className="p-1 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
        title="Cancelar"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
