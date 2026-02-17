import React from "react";
import { render, screen } from "@testing-library/react";
import { FormHeader } from "./form-header";

describe("FormHeader", () => {
  it("renderiza el título Nueva Solicitud", () => {
    render(<FormHeader />);
    
    expect(screen.getByText("Nueva Solicitud")).toBeInTheDocument();
  });

  it("renderiza el subtítulo con instrucciones", () => {
    render(<FormHeader />);
    
    expect(
      screen.getByText("Ingresa tus datos para comenzar el proceso")
    ).toBeInTheDocument();
  });

  it("tiene el icono de documento", () => {
    render(<FormHeader />);
    
    const iconContainer = document.querySelector(".bg-emerald-500");
    expect(iconContainer).toBeInTheDocument();
  });

  it("tiene estructura de heading nivel 2", () => {
    render(<FormHeader />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Nueva Solicitud");
  });
});
