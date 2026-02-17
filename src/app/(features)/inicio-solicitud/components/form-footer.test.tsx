import React from "react";
import { render, screen } from "@testing-library/react";
import { FormFooter } from "./form-footer";

describe("FormFooter", () => {
  it("renderiza el mensaje de protección de datos", () => {
    render(<FormFooter />);
    
    expect(
      screen.getByText("Tus datos están protegidos y cifrados")
    ).toBeInTheDocument();
  });

  it("tiene el icono de escudo", () => {
    render(<FormFooter />);
    
    const icon = document.querySelector(".text-emerald-500");
    expect(icon).toBeInTheDocument();
  });

  it("tiene el borde superior", () => {
    render(<FormFooter />);
    
    const container = document.querySelector(".border-t");
    expect(container).toBeInTheDocument();
  });
});
