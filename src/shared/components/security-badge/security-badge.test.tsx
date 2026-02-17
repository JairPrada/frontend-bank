import { render, screen } from "@testing-library/react";
import { SecurityBadge } from "./index";

// Mock del icono
jest.mock("../icons", () => ({
  ShieldIcon: ({ className }: { className: string }) => (
    <span data-testid="shield-icon" className={className}>🛡</span>
  ),
}));

describe("SecurityBadge", () => {
  it("renderiza el texto por defecto", () => {
    render(<SecurityBadge />);
    expect(screen.getByText("Tus datos están protegidos")).toBeInTheDocument();
  });

  it("renderiza texto personalizado", () => {
    render(<SecurityBadge text="Conexión segura" />);
    expect(screen.getByText("Conexión segura")).toBeInTheDocument();
  });

  it("muestra el icono de escudo", () => {
    render(<SecurityBadge />);
    expect(screen.getByTestId("shield-icon")).toBeInTheDocument();
  });
});
