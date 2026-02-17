import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./index";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe("Header", () => {
  it("renderiza el header", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("muestra el logo NeoBank", () => {
    render(<Header />);
    expect(screen.getByText("NeoBank")).toBeInTheDocument();
  });

  it("tiene tabs Personal y Business", () => {
    render(<Header />);
    expect(screen.getByText("Personal")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
  });

  it("Personal está activo por defecto", () => {
    render(<Header />);
    const personalTab = screen.getByText("Personal");
    expect(personalTab).toHaveClass("bg-emerald-100");
  });

  it("cambia a Business al hacer clic", () => {
    render(<Header />);
    const businessTab = screen.getByText("Business");
    
    fireEvent.click(businessTab);
    
    expect(businessTab).toHaveClass("bg-emerald-100");
    expect(screen.getByText("Personal")).not.toHaveClass("bg-emerald-100");
  });

  it("tiene enlace de Iniciar Sesion", () => {
    render(<Header />);
    expect(screen.getByText("Iniciar Sesion")).toBeInTheDocument();
  });

  it("tiene enlace de Solicitar", () => {
    render(<Header />);
    expect(screen.getByText("Solicitar")).toBeInTheDocument();
  });

  it("tiene navegación con items", () => {
    render(<Header />);
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Tarjeta de Credito")).toBeInTheDocument();
  });
});
