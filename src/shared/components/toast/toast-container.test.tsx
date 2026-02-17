import React from "react";
import { render, screen } from "@testing-library/react";
import { ToastContainer } from "./index";
import type { ToastProps } from "./toast.types";

describe("ToastContainer", () => {
  const mockToasts: ToastProps[] = [
    {
      id: "1",
      type: "success",
      message: "Operación exitosa",
      onClose: jest.fn(),
    },
    {
      id: "2",
      type: "error",
      message: "Error en la operación",
      onClose: jest.fn(),
    },
  ];

  it("no renderiza nada cuando no hay toasts", () => {
    const { container } = render(
      <ToastContainer position="top-right" toasts={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renderiza múltiples toasts", () => {
    render(<ToastContainer position="top-right" toasts={mockToasts} />);
    
    expect(screen.getByText("Operación exitosa")).toBeInTheDocument();
    expect(screen.getByText("Error en la operación")).toBeInTheDocument();
  });

  it("usa posición por defecto top-right", () => {
    render(<ToastContainer toasts={mockToasts} />);
    
    expect(screen.getByText("Operación exitosa")).toBeInTheDocument();
  });

  it("renderiza con posición bottom-left", () => {
    render(<ToastContainer position="bottom-left" toasts={mockToasts} />);
    
    expect(screen.getByText("Operación exitosa")).toBeInTheDocument();
  });
});
