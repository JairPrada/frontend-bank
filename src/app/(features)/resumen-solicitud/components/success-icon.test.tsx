import React from "react";
import { render, screen } from "@testing-library/react";
import { SuccessIcon } from "./success-icon";

describe("SuccessIcon", () => {
  it("renderiza el contenedor del icono", () => {
    render(<SuccessIcon />);
    
    const container = document.querySelector(".bg-emerald-500");
    expect(container).toBeInTheDocument();
  });

  it("renderiza el icono de check", () => {
    render(<SuccessIcon />);
    
    const svgIcon = document.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
  });

  it("tiene el efecto de animación ping", () => {
    render(<SuccessIcon />);
    
    const pingElement = document.querySelector(".animate-ping");
    expect(pingElement).toBeInTheDocument();
  });

  it("tiene las clases de tamaño correctas", () => {
    render(<SuccessIcon />);
    
    const container = document.querySelector(".w-24.h-24");
    expect(container).toBeInTheDocument();
  });
});
