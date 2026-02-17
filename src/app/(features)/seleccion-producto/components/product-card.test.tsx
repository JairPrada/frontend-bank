import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "./product-card";
import type { Product } from "../interfaces/selection.interface";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt} src={props.src} />
  ),
}));

describe("ProductCard", () => {
  const mockProduct: Product = {
    id: "credit-card",
    imageSrc: "/cards/credit-icon.png",
    title: "Tarjeta de Crédito",
    description: "Accede a beneficios exclusivos, cashback y financiamiento flexible.",
    bgSrc: "bg-[url(/creditCard.png)]",
  };
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el título del producto", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );
    
    const titles = screen.getAllByText("Tarjeta de Crédito");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("renderiza la descripción del producto", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );
    
    const descriptions = screen.getAllByText(/Accede a beneficios exclusivos/i);
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it("llama onSelect cuando se hace clic", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );
    
    const card = document.querySelector(".cursor-pointer");
    fireEvent.click(card!);
    
    expect(mockOnSelect).toHaveBeenCalledWith("credit-card");
  });

  it("muestra etiqueta Disponible cuando no está seleccionado", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );
    
    expect(screen.getByText("Disponible")).toBeInTheDocument();
  });

  it("muestra etiqueta Seleccionado cuando está seleccionado", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSelected={true}
        onSelect={mockOnSelect}
      />
    );
    
    expect(screen.getByText("✓ Seleccionado")).toBeInTheDocument();
  });

  it("tiene estilos de selección cuando está seleccionado", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSelected={true}
        onSelect={mockOnSelect}
      />
    );
    
    const card = document.querySelector(".ring-emerald-500");
    expect(card).toBeInTheDocument();
  });

  it("renderiza la imagen del producto", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );
    
    const image = screen.getByAltText("Tarjeta de Crédito");
    expect(image).toBeInTheDocument();
  });

  it("muestra texto Seleccionar", () => {
    render(
      <ProductCard
        product={mockProduct}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );
    
    expect(screen.getByText("Seleccionar")).toBeInTheDocument();
  });
});
