import { useState } from "react";
import { deleteProduct } from "../services";
import type { UserProduct } from "../interfaces";

interface UseDeleteProductParams {
  onProductDeleted: (id: string) => void;
}

export function useDeleteProduct({ onProductDeleted }: UseDeleteProductParams) {
  const [productToDelete, setProductToDelete] = useState<UserProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDelete = (product: UserProduct) => {
    setProductToDelete(product);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      onProductDeleted(productToDelete.id);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  return {
    productToDelete,
    isDeleting,
    requestDelete,
    confirmDelete,
    cancelDelete,
  };
}
