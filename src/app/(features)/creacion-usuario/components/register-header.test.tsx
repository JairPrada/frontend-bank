import React from "react";
import { render, screen } from "@testing-library/react";
import { RegisterHeader } from "./register-header";

describe("RegisterHeader", () => {
  it("renderiza el título crear cuenta", () => {
    render(<RegisterHeader />);
    
    expect(screen.getByText("Crear cuenta")).toBeInTheDocument();
  });

  it("renderiza el subtítulo con instrucciones", () => {
    render(<RegisterHeader />);
    
    expect(screen.getByText("Completa tus datos para registrarte")).toBeInTheDocument();
  });

  it("renderiza el icono de identificación", () => {
    render(<RegisterHeader />);
    
    const iconContainer = document.querySelector(".bg-emerald-500");
    expect(iconContainer).toBeInTheDocument();
  });

  it("tiene estructura correcta de encabezado", () => {
    render(<RegisterHeader />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Crear cuenta");
  });
});
