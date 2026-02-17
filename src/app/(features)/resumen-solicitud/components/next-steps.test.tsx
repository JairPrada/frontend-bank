import React from "react";
import { render, screen } from "@testing-library/react";
import { NextSteps } from "./next-steps";

describe("NextSteps", () => {
  it("renderiza el título próximos pasos", () => {
    render(<NextSteps />);
    
    expect(screen.getByText("Próximos pasos")).toBeInTheDocument();
  });

  it("renderiza los 3 pasos", () => {
    render(<NextSteps />);
    
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("menciona correo de confirmación", () => {
    render(<NextSteps />);
    
    expect(screen.getByText(/correo de confirmación/i)).toBeInTheDocument();
  });

  it("menciona contacto de asesor", () => {
    render(<NextSteps />);
    
    expect(screen.getByText(/asesor te contactará/i)).toBeInTheDocument();
  });

  it("menciona documento de identidad", () => {
    render(<NextSteps />);
    
    expect(screen.getByText(/documento de identidad/i)).toBeInTheDocument();
  });

  it("renderiza como lista ordenada", () => {
    render(<NextSteps />);
    
    const list = document.querySelector("ol");
    expect(list).toBeInTheDocument();
  });
});
