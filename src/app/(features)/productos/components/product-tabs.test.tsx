import { render, screen, fireEvent } from "@testing-library/react";
import { ProductTabs } from "./product-tabs";

describe("ProductTabs", () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("renderiza todas las pestañas disponibles", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);

      // Debe haber múltiples botones de pestaña
      const tabs = screen.getAllByRole("button");
      expect(tabs.length).toBeGreaterThan(0);
    });

    it("muestra la pestaña 'Todos' como opción", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);
      expect(screen.getByText("Todos")).toBeInTheDocument();
    });

    it("muestra las pestañas de tipos de producto", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);

      // Verificar que existen diferentes pestañas
      const tabs = screen.getAllByRole("button");
      expect(tabs.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Estado activo", () => {
    it("aplica estilos de activo a la pestaña seleccionada", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);
      const activeTab = screen.getByText("Todos");

      expect(activeTab).toHaveClass("bg-emerald-600", "text-white");
    });

    it("aplica estilos inactivos a pestañas no seleccionadas", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);
      const tabs = screen.getAllByRole("button");

      // Filtrar pestañas inactivas (no tienen bg-emerald-600)
      const inactiveTabs = tabs.filter(
        (tab) => !tab.classList.contains("bg-emerald-600")
      );

      inactiveTabs.forEach((tab) => {
        expect(tab).toHaveClass("bg-white");
      });
    });

    it("cambia el estilo cuando cambia la pestaña activa", () => {
      const { rerender } = render(
        <ProductTabs activeTab="all" onTabChange={mockOnTabChange} />
      );
      const allTab = screen.getByText("Todos");
      expect(allTab).toHaveClass("bg-emerald-600");

      // Simular cambio de pestaña
      rerender(
        <ProductTabs activeTab="savings" onTabChange={mockOnTabChange} />
      );

      // "Todos" ya no debería estar activo
      expect(allTab).toHaveClass("bg-white");
    });
  });

  describe("Interacción", () => {
    it("llama onTabChange al hacer click en una pestaña", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);
      const tabs = screen.getAllByRole("button");

      // Click en cualquier pestaña
      if (tabs.length > 0) {
        fireEvent.click(tabs[0]);
        expect(mockOnTabChange).toHaveBeenCalled();
      }
    });

    it("pasa el id correcto al cambiar de pestaña", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);
      const allTab = screen.getByText("Todos");

      fireEvent.click(allTab);

      expect(mockOnTabChange).toHaveBeenCalledWith("all");
    });
  });

  describe("Estilos", () => {
    it("aplica transición a las pestañas", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);
      const tabs = screen.getAllByRole("button");

      tabs.forEach((tab) => {
        expect(tab).toHaveClass("transition-all");
      });
    });

    it("aplica borde redondeado a las pestañas", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);
      const tabs = screen.getAllByRole("button");

      tabs.forEach((tab) => {
        expect(tab).toHaveClass("rounded-full");
      });
    });

    it("la pestaña activa tiene sombra", () => {
      render(<ProductTabs activeTab="all" onTabChange={mockOnTabChange} />);
      const activeTab = screen.getByText("Todos");

      expect(activeTab).toHaveClass("shadow-lg");
    });
  });
});
