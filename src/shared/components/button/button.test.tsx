import { render, screen } from "@testing-library/react";
import Button from "./button";

describe("Button", () => {
  it("renderiza el contenido del botón", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("aplica clases base por defecto", () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-8", "py-1", "rounded-full");
  });

  it("aplica variante primary por defecto", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-emerald-800", "text-white");
  });

  it("aplica variante secondary correctamente", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-100", "text-emerald-800");
  });

  it("acepta clases adicionales via className", () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
