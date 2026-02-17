import { render, screen } from "@testing-library/react";
import Loader from "./index";

describe("Loader", () => {
  describe("variante spinner", () => {
    it("renderiza spinner por defecto", () => {
      render(<Loader />);
      expect(document.querySelector("svg")).toBeInTheDocument();
    });

    it("aplica tamaño md por defecto", () => {
      render(<Loader />);
      const svg = document.querySelector("svg");
      expect(svg).toHaveClass("w-8", "h-8");
    });

    it("aplica tamaño sm", () => {
      render(<Loader size="sm" />);
      const svg = document.querySelector("svg");
      expect(svg).toHaveClass("w-5", "h-5");
    });

    it("aplica tamaño lg", () => {
      render(<Loader size="lg" />);
      const svg = document.querySelector("svg");
      expect(svg).toHaveClass("w-12", "h-12");
    });
  });

  describe("variante dots", () => {
    it("renderiza 3 puntos", () => {
      render(<Loader variant="dots" />);
      const dots = document.querySelectorAll(".rounded-full.animate-bounce");
      expect(dots).toHaveLength(3);
    });
  });

  describe("variante pulse", () => {
    it("renderiza círculos pulsantes", () => {
      render(<Loader variant="pulse" />);
      const pulsingCircle = document.querySelector(".animate-ping");
      expect(pulsingCircle).toBeInTheDocument();
    });
  });

  describe("colores", () => {
    it("aplica color primary por defecto", () => {
      render(<Loader />);
      const svg = document.querySelector("svg");
      expect(svg).toHaveClass("text-emerald-600");
    });

    it("aplica color white", () => {
      render(<Loader color="white" />);
      const svg = document.querySelector("svg");
      expect(svg).toHaveClass("text-white");
    });

    it("aplica color gray", () => {
      render(<Loader color="gray" />);
      const svg = document.querySelector("svg");
      expect(svg).toHaveClass("text-gray-400");
    });
  });

  describe("texto", () => {
    it("muestra texto cuando se proporciona", () => {
      render(<Loader text="Cargando..." />);
      expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });

    it("no muestra texto por defecto", () => {
      render(<Loader />);
      expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
    });
  });
});
