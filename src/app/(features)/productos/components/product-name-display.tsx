import { CheckIcon, PencilIcon, TrashIcon } from "@/shared/components/icons";
import type { ProductStatus } from "../interfaces";

interface ProductNameDisplayProps {
  name: string;
  status: ProductStatus;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductNameDisplay({
  name,
  status,
  onEdit,
  onDelete,
}: ProductNameDisplayProps) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="p-1 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Editar nombre"
      >
        <PencilIcon className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Cancelar producto"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
      {status === "active" && (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckIcon className="w-3 h-3" />
          Activo
        </span>
      )}
    </>
  );
}
