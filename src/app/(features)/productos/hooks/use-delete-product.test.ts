import { renderHook, act } from "@testing-library/react";
import { useDeleteProduct } from "./use-delete-product";
import type { UserProduct } from "../interfaces";

// Mock del servicio
jest.mock("../services", () => ({
  deleteProduct: jest.fn().mockResolvedValue({}),
}));

describe("useDeleteProduct", () => {
  const mockOnProductDeleted = jest.fn();
  const mockProduct: UserProduct = {
    id: "1",
    name: "Cuenta Test",
    type: "savings",
    description: "Cuenta de prueba",
    imageSrc: "/cards/saving-icon.png",
    balance: "$1,000,000",
    status: "active",
    lastMovement: "Hoy",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("inicializa sin producto a eliminar", () => {
    const { result } = renderHook(() =>
      useDeleteProduct({ onProductDeleted: mockOnProductDeleted })
    );
    
    expect(result.current.productToDelete).toBeNull();
    expect(result.current.isDeleting).toBe(false);
  });

  it("establece producto a eliminar con requestDelete", () => {
    const { result } = renderHook(() =>
      useDeleteProduct({ onProductDeleted: mockOnProductDeleted })
    );
    
    act(() => {
      result.current.requestDelete(mockProduct);
    });
    
    expect(result.current.productToDelete).toEqual(mockProduct);
  });

  it("cancela eliminación con cancelDelete", () => {
    const { result } = renderHook(() =>
      useDeleteProduct({ onProductDeleted: mockOnProductDeleted })
    );
    
    act(() => {
      result.current.requestDelete(mockProduct);
    });
    
    act(() => {
      result.current.cancelDelete();
    });
    
    expect(result.current.productToDelete).toBeNull();
  });

  it("no elimina si no hay producto seleccionado", async () => {
    const { result } = renderHook(() =>
      useDeleteProduct({ onProductDeleted: mockOnProductDeleted })
    );
    
    await act(async () => {
      await result.current.confirmDelete();
    });
    
    expect(mockOnProductDeleted).not.toHaveBeenCalled();
  });

  it("elimina producto con confirmDelete", async () => {
    const { result } = renderHook(() =>
      useDeleteProduct({ onProductDeleted: mockOnProductDeleted })
    );
    
    act(() => {
      result.current.requestDelete(mockProduct);
    });
    
    await act(async () => {
      await result.current.confirmDelete();
    });
    
    expect(mockOnProductDeleted).toHaveBeenCalledWith("1");
    expect(result.current.productToDelete).toBeNull();
  });
});
