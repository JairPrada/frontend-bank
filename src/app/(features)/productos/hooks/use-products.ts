import { useFetchProducts } from "./use-fetch-products";
import { useEditProduct } from "./use-edit-product";
import { useDeleteProduct } from "./use-delete-product";
import { useProductsGrouping } from "./use-products-grouping";

export function useProducts() {
  const { products, setProducts, isLoading, error, refetch } = useFetchProducts();

  const handleProductUpdated = (id: string, newName: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
  };

  const handleProductDeleted = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const {
    editingId,
    editName,
    setEditName,
    inputRef,
    isUpdating,
    startEdit: handleEdit,
    saveEdit: handleSave,
    cancelEdit: handleCancelEdit,
    handleKeyDown,
  } = useEditProduct({ onProductUpdated: handleProductUpdated });

  const {
    productToDelete: cancelingProduct,
    isDeleting,
    requestDelete: handleCancelProduct,
    confirmDelete: confirmCancelProduct,
    cancelDelete: closeCancelModal,
  } = useDeleteProduct({ onProductDeleted: handleProductDeleted });

  const { productsByType, getFilteredTypes } = useProductsGrouping(products);

  return {
    products,
    productsByType,
    getFilteredTypes,
    editingId,
    editName,
    setEditName,
    inputRef,
    handleEdit,
    handleSave,
    handleCancelEdit,
    handleKeyDown,
    cancelingProduct,
    handleCancelProduct,
    confirmCancelProduct,
    closeCancelModal,
    isLoading,
    error,
    isUpdating,
    isDeleting,
    refetch,
  };
}
