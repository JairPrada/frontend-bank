import { render, screen } from "@testing-library/react";
import Footer from "./index";

describe("Footer", () => {
  it("renderiza el footer", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("muestra el copyright con el año actual", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("muestra el nombre de la marca", () => {
    render(<Footer />);
    expect(screen.getByText(/NeoBank/)).toBeInTheDocument();
  });

  it("muestra información de seguridad SSL", () => {
    render(<Footer />);
    expect(screen.getByText(/SSL 256-bit/)).toBeInTheDocument();
  });

  it("muestra información FDIC", () => {
    render(<Footer />);
    expect(screen.getByText(/FDIC/)).toBeInTheDocument();
  });
});
