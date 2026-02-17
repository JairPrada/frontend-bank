import { render, screen } from "@testing-library/react";
import { SubmitButton } from "./index";

// Mock de iconos
jest.mock("../icons", () => ({
  ArrowRightIcon: ({ className }: { className: string }) => (
    <span data-testid="arrow-icon" className={className}>→</span>
  ),
  SpinnerIcon: ({ className }: { className: string }) => (
    <span data-testid="spinner-icon" className={className}>⟳</span>
  ),
}));

describe("SubmitButton", () => {
  it("renderiza el texto del botón", () => {
    render(<SubmitButton text="Enviar" />);
    expect(screen.getByRole("button")).toHaveTextContent("Enviar");
  });

  it("muestra flecha por defecto", () => {
    render(<SubmitButton text="Continuar" />);
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });

  it("oculta flecha cuando showArrow es false", () => {
    render(<SubmitButton text="Enviar" showArrow={false} />);
    expect(screen.queryByTestId("arrow-icon")).not.toBeInTheDocument();
  });

  it("muestra estado de carga", () => {
    render(<SubmitButton text="Enviar" isLoading />);
    expect(screen.getByTestId("spinner-icon")).toBeInTheDocument();
    expect(screen.getByText("Procesando...")).toBeInTheDocument();
  });

  it("muestra texto de carga personalizado", () => {
    render(<SubmitButton text="Enviar" isLoading loadingText="Guardando..." />);
    expect(screen.getByText("Guardando...")).toBeInTheDocument();
  });

  it("está deshabilitado cuando disabled es true", () => {
    render(<SubmitButton text="Enviar" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("está deshabilitado cuando isLoading es true", () => {
    render(<SubmitButton text="Enviar" isLoading />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("tiene type submit por defecto", () => {
    render(<SubmitButton text="Enviar" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("acepta type button", () => {
    render(<SubmitButton text="Enviar" type="button" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("llama onClick cuando se hace clic", () => {
    const onClick = jest.fn();
    render(<SubmitButton text="Enviar" onClick={onClick} />);
    
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalled();
  });
});
