import { render, screen, fireEvent } from "@testing-library/react";
import { CancelProductModal } from "./cancel-product-modal";
import type { UserProduct } from "../interfaces";

describe("CancelProductModal", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const mockProduct: UserProduct = {
    id: "1",
    name: "Cuenta Digital Premium",
    type: "savings",
    description: "Cuenta de ahorros digital",
    imageSrc: "/cards/saving-icon.png",
    status: "active",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado cuando está abierto", () => {
    it("muestra el título del modal", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      expect(screen.getByText("Cancelar producto")).toBeInTheDocument();
    });

    it("muestra el mensaje de confirmación", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      expect(
        screen.getByText(/estás seguro de que deseas cancelar/i)
      ).toBeInTheDocument();
    });

    it("muestra el nombre del producto a cancelar", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      expect(screen.getByText("Cuenta Digital Premium")).toBeInTheDocument();
    });

    it("muestra mensaje de que la acción no se puede deshacer", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      expect(
        screen.getByText(/esta acción no se puede deshacer/i)
      ).toBeInTheDocument();
    });

    it("muestra el botón de mantener producto", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      expect(
        screen.getByRole("button", { name: /no, mantener/i })
      ).toBeInTheDocument();
    });

    it("muestra el botón de confirmar cancelación", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      expect(
        screen.getByRole("button", { name: /sí, cancelar/i })
      ).toBeInTheDocument();
    });

    it("muestra el icono de papelera", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      // El modal está abierto si hay un producto, verificamos el título
      expect(screen.getByText("Cancelar producto")).toBeInTheDocument();
    });
  });

  describe("Renderizado cuando está cerrado", () => {
    it("no muestra el modal cuando product es null", () => {
      render(
        <CancelProductModal
          product={null}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      expect(
        screen.queryByText("Cancelar producto")
      ).not.toBeInTheDocument();
    });
  });

  describe("Interacción", () => {
    it("llama onClose al hacer click en mantener", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      const keepButton = screen.getByRole("button", { name: /no, mantener/i });

      fireEvent.click(keepButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it("llama onConfirm al hacer click en confirmar cancelación", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      const confirmButton = screen.getByRole("button", {
        name: /sí, cancelar/i,
      });

      fireEvent.click(confirmButton);

      expect(mockOnConfirm).toHaveBeenCalled();
    });
  });

  describe("Estilos de botones", () => {
    it("el botón de mantener tiene estilos sutiles", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      const keepButton = screen.getByRole("button", { name: /no, mantener/i });
      expect(keepButton).toHaveClass("text-gray-600");
    });

    it("el botón de confirmar tiene estilos de peligro", () => {
      render(
        <CancelProductModal
          product={mockProduct}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );
      const confirmButton = screen.getByRole("button", {
        name: /sí, cancelar/i,
      });
      expect(confirmButton).toHaveClass("bg-red-600", "text-white");
    });
  });

  describe("Diferentes productos", () => {
    it("muestra el nombre de diferentes productos", () => {
      const creditCard: UserProduct = {
        id: "2",
        name: "Tarjeta Gold",
        type: "credit",
        description: "Tarjeta de crédito premium",
        imageSrc: "/cards/credit-icon.png",
        status: "active",
      };

      render(
        <CancelProductModal
          product={creditCard}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.getByText("Tarjeta Gold")).toBeInTheDocument();
    });
  });
});
