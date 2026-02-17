import { renderHook } from "@testing-library/react";
import { useProductsGrouping } from "./use-products-grouping";
import type { UserProduct } from "../interfaces";

describe("useProductsGrouping", () => {
  const mockProducts: UserProduct[] = [
    {
      id: "1",
      name: "Cuenta Digital",
      type: "savings",
      description: "Cuenta digital",
      imageSrc: "/cards/saving-icon.png",
      balance: "$1,000,000",
      status: "active",
      lastMovement: "Hoy",
    },
    {
      id: "2",
      name: "Tarjeta Gold",
      type: "credit",
      description: "Tarjeta de crédito",
      imageSrc: "/cards/credit-icon.png",
      balance: "$500,000",
      status: "active",
      lastMovement: "Ayer",
    },
    {
      id: "3",
      name: "Crédito Libre",
      type: "loan",
      description: "Crédito libre inversión",
      imageSrc: "/cards/travel-icon.png",
      balance: "$10,000,000",
      status: "active",
      lastMovement: "Hace 3 días",
    },
  ];

  it("agrupa productos por tipo", () => {
    const { result } = renderHook(() => useProductsGrouping(mockProducts));
    
    expect(result.current.productsByType.savings).toHaveLength(1);
    expect(result.current.productsByType.credit).toHaveLength(1);
    expect(result.current.productsByType.loan).toHaveLength(1);
  });

  it("calcula el total de productos", () => {
    const { result } = renderHook(() => useProductsGrouping(mockProducts));
    
    expect(result.current.totalCount).toBe(3);
  });

  it("calcula conteo por tipo", () => {
    const { result } = renderHook(() => useProductsGrouping(mockProducts));
    
    expect(result.current.countByType.savings).toBe(1);
    expect(result.current.countByType.credit).toBe(1);
    expect(result.current.countByType.loan).toBe(1);
  });

  it("filtra tipos para tab all", () => {
    const { result } = renderHook(() => useProductsGrouping(mockProducts));
    
    const types = result.current.getFilteredTypes("all");
    expect(types).toContain("savings");
    expect(types).toContain("credit");
    expect(types).toContain("loan");
  });

  it("filtra tipos para tab específico", () => {
    const { result } = renderHook(() => useProductsGrouping(mockProducts));
    
    const types = result.current.getFilteredTypes("savings");
    expect(types).toEqual(["savings"]);
  });

  it("maneja lista vacía de productos", () => {
    const { result } = renderHook(() => useProductsGrouping([]));
    
    expect(result.current.totalCount).toBe(0);
    expect(result.current.productsByType.savings).toHaveLength(0);
  });

  it("no incluye tipos vacíos en filtro all", () => {
    const onlySavings: UserProduct[] = [mockProducts[0]];
    const { result } = renderHook(() => useProductsGrouping(onlySavings));
    
    const types = result.current.getFilteredTypes("all");
    expect(types).toContain("savings");
    expect(types).not.toContain("credit");
    expect(types).not.toContain("loan");
  });
});
