import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductIcon } from "./product-icon";

describe("ProductIcon", () => {
  const defaultProps = {
    imageSrc: "/cards/credit-icon.png",
    name: "Tarjeta de Crédito",
    gradient: "from-emerald-500 to-teal-500",
  };

  it("renderiza la imagen del producto", () => {
    render(<ProductIcon {...defaultProps} />);
    
    const image = screen.getByAltText("Tarjeta de Crédito");
    expect(image).toBeInTheDocument();
  });

  it("aplica el gradiente proporcionado", () => {
    render(<ProductIcon {...defaultProps} />);
    
    const container = document.querySelector(".bg-linear-to-br");
    expect(container).toBeInTheDocument();
  });

  it("tiene las clases de tamaño correctas", () => {
    render(<ProductIcon {...defaultProps} />);
    
    const container = document.querySelector(".w-14.h-14");
    expect(container).toBeInTheDocument();
  });

  it("tiene efecto hover de escala", () => {
    render(<ProductIcon {...defaultProps} />);
    
    const container = document.querySelector(".group-hover\\:scale-110");
    expect(container).toBeInTheDocument();
  });
});
