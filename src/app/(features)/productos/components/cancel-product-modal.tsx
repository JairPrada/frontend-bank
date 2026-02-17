import Modal from "@/shared/components/modal";
import { TrashIcon } from "@/shared/components/icons";
import type { UserProduct } from "../interfaces";

interface CancelProductModalProps {
  product: UserProduct | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelProductModal({ product, onClose, onConfirm }: CancelProductModalProps) {
  return (
    <Modal
      isOpen={!!product}
      onClose={onClose}
      title="Cancelar producto"
      size="sm"
      footer={
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            No, mantener
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
          >
            Sí, cancelar
          </button>
        </div>
      }
    >
      <div className="text-center py-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <TrashIcon className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-gray-700 mb-2">
          ¿Estás seguro de que deseas cancelar el producto?
        </p>
        <p className="text-lg font-semibold text-gray-900">
          {product?.name}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Esta acción no se puede deshacer.
        </p>
      </div>
    </Modal>
  );
}
