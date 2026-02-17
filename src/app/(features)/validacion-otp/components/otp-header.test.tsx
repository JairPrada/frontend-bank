import React from "react";
import { render, screen } from "@testing-library/react";
import { OtpHeader } from "./otp-header";

describe("OtpHeader", () => {
  it("renderiza título por defecto", () => {
    render(<OtpHeader />);
    
    expect(screen.getByText("Verificación de identidad")).toBeInTheDocument();
  });

  it("renderiza subtítulo por defecto", () => {
    render(<OtpHeader />);
    
    expect(
      screen.getByText(/Ingresa el código de 6 dígitos/i)
    ).toBeInTheDocument();
  });

  it("renderiza título personalizado", () => {
    render(<OtpHeader title="Código de verificación" />);
    
    expect(screen.getByText("Código de verificación")).toBeInTheDocument();
  });

  it("renderiza subtítulo personalizado", () => {
    render(<OtpHeader subtitle="Enviamos un código a tu email" />);
    
    expect(screen.getByText("Enviamos un código a tu email")).toBeInTheDocument();
  });

  it("muestra número de teléfono cuando se proporciona", () => {
    render(<OtpHeader phoneNumber="+57 300 123 4567" />);
    
    expect(screen.getByText("+57 300 123 4567")).toBeInTheDocument();
  });

  it("no muestra número de teléfono cuando no se proporciona", () => {
    render(<OtpHeader />);
    
    expect(screen.queryByText(/\+57/)).not.toBeInTheDocument();
  });

  it("renderiza el icono de teléfono", () => {
    render(<OtpHeader />);
    
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
