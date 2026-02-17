import { render, screen, fireEvent } from "@testing-library/react";
import { ProductNameDisplay } from "./product-name-display";

describe("ProductNameDisplay", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("muestra el nombre del producto", () => {
      render(
        <ProductNameDisplay
          name="Cuenta Digital"
          status="active"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText("Cuenta Digital")).toBeInTheDocument();
    });

    it("muestra el botón de editar", () => {
      render(
        <ProductNameDisplay
          name="Cuenta Digital"
          status="active"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(
        screen.getByRole("button", { name: /editar nombre/i })
      ).toBeInTheDocument();
    });

    it("muestra el botón de eliminar", () => {
      render(
        <ProductNameDisplay
          name="Cuenta Digital"
          status="active"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(
        screen.getByRole("button", { name: /cancelar producto/i })
      ).toBeInTheDocument();
    });
  });

  describe("Estado activo", () => {
    it("muestra badge de activo cuando status es active", () => {
      render(
        <ProductNameDisplay
          name="Cuenta Digital"
          status="active"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText("Activo")).toBeInTheDocument();
    });

    it("no muestra badge cuando status es pending", () => {
      render(
        <ProductNameDisplay
          name="Cuenta en proceso"
          status="pending"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.queryByText("Activo")).not.toBeInTheDocument();
    });
  });

  describe("Interacción", () => {
    it("llama onEdit al hacer click en editar", () => {
      render(
        <ProductNameDisplay
          name="Cuenta Digital"
          status="active"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      const editButton = screen.getByRole("button", { name: /editar nombre/i });

      fireEvent.click(editButton);

      expect(mockOnEdit).toHaveBeenCalled();
    });

    it("llama onDelete al hacer click en eliminar", () => {
      render(
        <ProductNameDisplay
          name="Cuenta Digital"
          status="active"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      const deleteButton = screen.getByRole("button", {
        name: /cancelar producto/i,
      });

      fireEvent.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalled();
    });

    it("detiene la propagación del evento al editar", () => {
      const parentHandler = jest.fn();
      render(
        <div onClick={parentHandler}>
          <ProductNameDisplay
            name="Cuenta Digital"
            status="active"
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </div>
      );
      const editButton = screen.getByRole("button", { name: /editar nombre/i });

      fireEvent.click(editButton);

      expect(mockOnEdit).toHaveBeenCalled();
      expect(parentHandler).not.toHaveBeenCalled();
    });

    it("detiene la propagación del evento al eliminar", () => {
      const parentHandler = jest.fn();
      render(
        <div onClick={parentHandler}>
          <ProductNameDisplay
            name="Cuenta Digital"
            status="active"
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </div>
      );
      const deleteButton = screen.getByRole("button", {
        name: /cancelar producto/i,
      });

      fireEvent.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalled();
      expect(parentHandler).not.toHaveBeenCalled();
    });
  });

  describe("Estilos", () => {
    it("aplica clase de truncado al nombre", () => {
      render(
        <ProductNameDisplay
          name="Nombre muy largo de cuenta que debería truncarse"
          status="active"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      const nameElement = screen.getByRole("heading", { level: 3 });
      expect(nameElement).toHaveClass("truncate");
    });

    it("aplica estilo verde al badge de activo", () => {
      render(
        <ProductNameDisplay
          name="Cuenta"
          status="active"
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );
      const badge = screen.getByText("Activo");
      expect(badge).toHaveClass("bg-green-100", "text-green-700");
    });
  });
});
