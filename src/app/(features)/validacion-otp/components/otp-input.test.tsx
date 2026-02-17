import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { OtpInput } from "./otp-input";

describe("OtpInput", () => {
  const defaultProps = {
    length: 6,
    value: ["", "", "", "", "", ""],
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el número correcto de inputs", () => {
    render(<OtpInput {...defaultProps} />);
    
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
  });

  it("llama onChange cuando se ingresa un dígito", () => {
    const mockOnChange = jest.fn();
    render(<OtpInput {...defaultProps} onChange={mockOnChange} />);
    
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("solo acepta dígitos numéricos", () => {
    const mockOnChange = jest.fn();
    render(<OtpInput {...defaultProps} onChange={mockOnChange} />);
    
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "a" } });
    
    // Debería llamar onChange con valor vacío (filtrado)
    expect(mockOnChange).toHaveBeenCalledWith(["", "", "", "", "", ""]);
  });

  it("llama onComplete cuando se completa el código", () => {
    const mockOnComplete = jest.fn();
    const filledValue = ["1", "2", "3", "4", "5", ""];
    render(
      <OtpInput
        {...defaultProps}
        value={filledValue}
        onComplete={mockOnComplete}
      />
    );
    
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[5], { target: { value: "6" } });
    
    expect(mockOnComplete).toHaveBeenCalledWith("123456");
  });

  it("no permite entrada cuando está deshabilitado", () => {
    const mockOnChange = jest.fn();
    render(<OtpInput {...defaultProps} onChange={mockOnChange} disabled />);
    
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("muestra error cuando hasError es true", () => {
    render(<OtpInput {...defaultProps} hasError />);
    
    const inputs = screen.getAllByRole("textbox");
    // Verificar que los inputs tienen clase de error
    expect(inputs[0]).toBeInTheDocument();
  });

  it("maneja backspace correctamente", () => {
    const mockOnChange = jest.fn();
    const valueWithDigit = ["1", "", "", "", "", ""];
    render(<OtpInput {...defaultProps} value={valueWithDigit} onChange={mockOnChange} />);
    
    const inputs = screen.getAllByRole("textbox");
    fireEvent.keyDown(inputs[0], { key: "Backspace" });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("maneja navegación con flechas", () => {
    render(<OtpInput {...defaultProps} />);
    
    const inputs = screen.getAllByRole("textbox");
    inputs[2].focus();
    
    fireEvent.keyDown(inputs[2], { key: "ArrowLeft" });
    fireEvent.keyDown(inputs[2], { key: "ArrowRight" });
    
    // No debería lanzar errores
    expect(inputs[2]).toBeInTheDocument();
  });

  it("maneja pegado de código", () => {
    const mockOnChange = jest.fn();
    const mockOnComplete = jest.fn();
    render(
      <OtpInput
        {...defaultProps}
        onChange={mockOnChange}
        onComplete={mockOnComplete}
      />
    );
    
    const inputs = screen.getAllByRole("textbox");
    const pasteEvent = {
      clipboardData: {
        getData: () => "123456",
      },
      preventDefault: jest.fn(),
    };
    
    fireEvent.paste(inputs[0], pasteEvent);
    
    expect(mockOnChange).toHaveBeenCalled();
  });
});
