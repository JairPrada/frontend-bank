import { useState, useEffect, useRef } from "react";
import { updateProduct } from "../services";
import type { UpdateProductRequestDto } from "../services/dtos/update-product-request.dto";
import type { UserProduct } from "../interfaces";

interface UseEditProductParams {
  onProductUpdated: (id: string, newName: string) => void;
}

export function useEditProduct({ onProductUpdated }: UseEditProductParams) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  const startEdit = (product: UserProduct) => {
    setEditingId(product.id);
    setEditName(product.name);
  };

  const saveEdit = async () => {
    if (!editingId || !editName.trim()) return;

    const requestBody: UpdateProductRequestDto = {
      name: editName.trim(),
    };

    setIsUpdating(true);
    try {
      await updateProduct(editingId, requestBody);
      onProductUpdated(editingId, editName.trim());
      setEditingId(null);
      setEditName("");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return {
    editingId,
    editName,
    setEditName,
    inputRef,
    isUpdating,
    startEdit,
    saveEdit,
    cancelEdit,
    handleKeyDown,
  };
}
