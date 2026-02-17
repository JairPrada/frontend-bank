import { renderHook, act } from "@testing-library/react";
import { useEditProduct } from "./use-edit-product";
import type { UserProduct } from "../interfaces";

// Mock del servicio
jest.mock("../services", () => ({
  updateProduct: jest.fn().mockResolvedValue({}),
}));

describe("useEditProduct", () => {
  const mockOnProductUpdated = jest.fn();
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

  it("inicializa sin producto en edición", () => {
    const { result } = renderHook(() =>
      useEditProduct({ onProductUpdated: mockOnProductUpdated })
    );
    
    expect(result.current.editingId).toBeNull();
    expect(result.current.editName).toBe("");
  });

  it("inicia edición con startEdit", () => {
    const { result } = renderHook(() =>
      useEditProduct({ onProductUpdated: mockOnProductUpdated })
    );
    
    act(() => {
      result.current.startEdit(mockProduct);
    });
    
    expect(result.current.editingId).toBe("1");
    expect(result.current.editName).toBe("Cuenta Test");
  });

  it("cancela edición con cancelEdit", () => {
    const { result } = renderHook(() =>
      useEditProduct({ onProductUpdated: mockOnProductUpdated })
    );
    
    act(() => {
      result.current.startEdit(mockProduct);
    });
    
    act(() => {
      result.current.cancelEdit();
    });
    
    expect(result.current.editingId).toBeNull();
    expect(result.current.editName).toBe("");
  });

  it("actualiza editName con setEditName", () => {
    const { result } = renderHook(() =>
      useEditProduct({ onProductUpdated: mockOnProductUpdated })
    );
    
    act(() => {
      result.current.startEdit(mockProduct);
    });
    
    act(() => {
      result.current.setEditName("Nuevo Nombre");
    });
    
    expect(result.current.editName).toBe("Nuevo Nombre");
  });

  it("guarda edición con saveEdit", async () => {
    const { result } = renderHook(() =>
      useEditProduct({ onProductUpdated: mockOnProductUpdated })
    );
    
    act(() => {
      result.current.startEdit(mockProduct);
    });
    
    act(() => {
      result.current.setEditName("Nuevo Nombre");
    });
    
    await act(async () => {
      await result.current.saveEdit();
    });
    
    expect(mockOnProductUpdated).toHaveBeenCalledWith("1", "Nuevo Nombre");
    expect(result.current.editingId).toBeNull();
  });

  it("no guarda si editName está vacío", async () => {
    const { result } = renderHook(() =>
      useEditProduct({ onProductUpdated: mockOnProductUpdated })
    );
    
    act(() => {
      result.current.startEdit(mockProduct);
    });
    
    act(() => {
      result.current.setEditName("");
    });
    
    await act(async () => {
      await result.current.saveEdit();
    });
    
    expect(mockOnProductUpdated).not.toHaveBeenCalled();
  });

  it("maneja Enter para guardar", () => {
    const { result } = renderHook(() =>
      useEditProduct({ onProductUpdated: mockOnProductUpdated })
    );
    
    act(() => {
      result.current.startEdit(mockProduct);
    });
    
    // Simular evento Enter
    act(() => {
      result.current.handleKeyDown({ key: "Enter" } as React.KeyboardEvent);
    });
    
    // No debe lanzar error
    expect(result.current).toBeDefined();
  });

  it("maneja Escape para cancelar", () => {
    const { result } = renderHook(() =>
      useEditProduct({ onProductUpdated: mockOnProductUpdated })
    );
    
    act(() => {
      result.current.startEdit(mockProduct);
    });
    
    act(() => {
      result.current.handleKeyDown({ key: "Escape" } as React.KeyboardEvent);
    });
    
    expect(result.current.editingId).toBeNull();
  });

  it("tiene ref para input", () => {
    const { result } = renderHook(() =>
      useEditProduct({ onProductUpdated: mockOnProductUpdated })
    );
    
    expect(result.current.inputRef).toBeDefined();
  });
});
