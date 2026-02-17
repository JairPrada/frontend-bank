import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./index";

// Mock de los iconos
jest.mock("../icons", () => ({
  CheckIcon: ({ className }: { className: string }) => (
    <span data-testid="check-icon" className={className}>✓</span>
  ),
  ErrorIcon: ({ className }: { className: string }) => (
    <span data-testid="error-icon" className={className}>!</span>
  ),
}));

describe("Checkbox", () => {
  it("renderiza un checkbox básico", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("muestra el label cuando se proporciona", () => {
    render(<Checkbox label="Acepto los términos" />);
    expect(screen.getByText("Acepto los términos")).toBeInTheDocument();
  });

  it("muestra mensaje de error", () => {
    render(<Checkbox error="Debes aceptar los términos" />);
    expect(screen.getByText("Debes aceptar los términos")).toBeInTheDocument();
    expect(screen.getByTestId("error-icon")).toBeInTheDocument();
  });

  it("permite marcar el checkbox", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("maneja el estado disabled", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("acepta ref correctamente", () => {
    const ref = { current: null };
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("aplica className personalizado", () => {
    render(<Checkbox className="custom-checkbox" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("custom-checkbox");
  });

  it("renderiza label como ReactNode", () => {
    render(
      <Checkbox 
        label={<span data-testid="custom-label">Label <strong>especial</strong></span>} 
      />
    );
    expect(screen.getByTestId("custom-label")).toBeInTheDocument();
    expect(screen.getByText("especial")).toBeInTheDocument();
  });
});
