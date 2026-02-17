import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductSummaryCard } from "./product-summary-card";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt} src={props.src} />
  ),
}));

describe("ProductSummaryCard", () => {
  it("renderiza tarjeta de crédito por defecto", () => {
    render(<ProductSummaryCard productId="credit-card" />);
    
    expect(screen.getByText("Tarjeta de Crédito")).toBeInTheDocument();
  });

  it("muestra estado aprobado", () => {
    render(<ProductSummaryCard productId="credit-card" />);
    
    expect(screen.getByText("Aprobado")).toBeInTheDocument();
  });

  it("renderiza los beneficios del producto", () => {
    render(<ProductSummaryCard productId="credit-card" />);
    
    expect(screen.getByText(/Límite de crédito/i)).toBeInTheDocument();
    expect(screen.getByText(/Cashback/i)).toBeInTheDocument();
  });

  it("renderiza cuenta de ahorro cuando se selecciona", () => {
    render(<ProductSummaryCard productId="savings-account" />);
    
    expect(screen.getByText("Cuenta de Ahorro")).toBeInTheDocument();
  });

  it("renderiza crédito libre inversión cuando se selecciona", () => {
    render(<ProductSummaryCard productId="free-investment" />);
    
    expect(screen.getByText("Crédito Libre Inversión")).toBeInTheDocument();
  });

  it("usa tarjeta de crédito como fallback para id desconocido", () => {
    render(<ProductSummaryCard productId="unknown-product" />);
    
    expect(screen.getByText("Tarjeta de Crédito")).toBeInTheDocument();
  });

  it("renderiza la imagen del producto", () => {
    render(<ProductSummaryCard productId="credit-card" />);
    
    const image = screen.getByAltText("Tarjeta de Crédito");
    expect(image).toBeInTheDocument();
  });

  it("renderiza 3 beneficios", () => {
    render(<ProductSummaryCard productId="credit-card" />);
    
    const listItems = document.querySelectorAll("li");
    expect(listItems.length).toBe(3);
  });
});
