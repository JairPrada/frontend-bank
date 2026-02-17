import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./index";

describe("Input", () => {
  it("renderiza un input básico", () => {
    render(<Input placeholder="Escribe aquí" />);
    expect(screen.getByPlaceholderText("Escribe aquí")).toBeInTheDocument();
  });

  it("muestra el label cuando se proporciona", () => {
    render(<Input label="Nombre" />);
    expect(screen.getByText("Nombre")).toBeInTheDocument();
  });

  it("muestra mensaje de error", () => {
    render(<Input error="Campo requerido" />);
    expect(screen.getByText("Campo requerido")).toBeInTheDocument();
    expect(screen.getByText("Campo requerido")).toHaveClass("text-red-500");
  });

  it("muestra texto de ayuda", () => {
    render(<Input helperText="Ingresa tu nombre completo" />);
    expect(screen.getByText("Ingresa tu nombre completo")).toBeInTheDocument();
  });

  it("muestra error en lugar de helperText cuando ambos existen", () => {
    render(<Input error="Error" helperText="Ayuda" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.queryByText("Ayuda")).not.toBeInTheDocument();
  });

  it("aplica clases de deshabilitado", () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("bg-gray-50", "cursor-not-allowed");
  });

  it("renderiza icono izquierdo", () => {
    render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} />);
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renderiza icono derecho", () => {
    render(<Input rightIcon={<span data-testid="right-icon">👁</span>} />);
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("cambia estilos al enfocar", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    
    fireEvent.focus(input);
    expect(input).toHaveClass("border-emerald-500");
  });

  it("llama onFocus y onBlur correctamente", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    
    render(<Input data-testid="input" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByTestId("input");
    
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();
    
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it("acepta ref correctamente", () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
