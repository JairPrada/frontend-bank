import { render } from "@testing-library/react";
import { PageBackground } from "./index";

describe("PageBackground", () => {
  describe("variante light (default)", () => {
    it("renderiza el fondo light por defecto", () => {
      render(<PageBackground />);
      expect(document.querySelector(".form-grid-bg-light")).toBeInTheDocument();
    });
  });

  describe("variante dark", () => {
    it("renderiza el fondo dark", () => {
      render(<PageBackground variant="dark" />);
      expect(document.querySelector(".form-grid-bg")).toBeInTheDocument();
    });
  });

  describe("variante hero", () => {
    it("renderiza elementos del hero", () => {
      render(<PageBackground variant="hero" />);
      expect(document.querySelector(".hero-grid-bg")).toBeInTheDocument();
      expect(document.querySelector(".hero-grid-overlay")).toBeInTheDocument();
    });

    it("renderiza círculos animados en hero", () => {
      render(<PageBackground variant="hero" />);
      expect(document.querySelector(".animate-pulse-glow")).toBeInTheDocument();
    });
  });

  describe("con decoraciones", () => {
    it("renderiza decoraciones cuando withDecorations es true", () => {
      render(<PageBackground withDecorations />);
      const blurElements = document.querySelectorAll(".blur-3xl");
      expect(blurElements.length).toBeGreaterThan(0);
    });

    it("renderiza círculo extra cuando extraCenterCircle es true", () => {
      const { container } = render(<PageBackground withDecorations extraCenterCircle />);
      const centerCircle = container.querySelector(".-translate-x-1\\/2");
      expect(centerCircle).toBeInTheDocument();
    });
  });
});
