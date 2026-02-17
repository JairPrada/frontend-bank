import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductsHeader } from "./products-header";

describe("ProductsHeader", () => {
  const defaultProps = {
    currentTime: "10:30 AM",
    totalProducts: 5,
  };

  it("renderiza el título principal", () => {
    render(<ProductsHeader {...defaultProps} />);
    
    expect(screen.getByText("Mis Productos Financieros")).toBeInTheDocument();
  });

  it("muestra la hora actual", () => {
    render(<ProductsHeader {...defaultProps} />);
    
    expect(screen.getByText("10:30 AM")).toBeInTheDocument();
  });

  it("muestra el número de productos", () => {
    render(<ProductsHeader {...defaultProps} />);
    
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("muestra placeholder cuando no hay hora", () => {
    render(<ProductsHeader currentTime="" totalProducts={3} />);
    
    expect(screen.getByText("--:--")).toBeInTheDocument();
  });

  it("muestra etiqueta de productos activos", () => {
    render(<ProductsHeader {...defaultProps} />);
    
    expect(screen.getByText("Activos")).toBeInTheDocument();
  });

  it("muestra descripción del portafolio", () => {
    render(<ProductsHeader {...defaultProps} />);
    
    expect(
      screen.getByText(/Administra tu portafolio bancario/i)
    ).toBeInTheDocument();
  });

  it("muestra etiqueta de productos", () => {
    render(<ProductsHeader {...defaultProps} />);
    
    expect(screen.getByText("Productos")).toBeInTheDocument();
  });
});
