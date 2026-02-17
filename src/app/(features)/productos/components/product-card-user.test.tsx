import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { ProductCard } from "./product-card";
import type { UserProduct } from "../interfaces";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

describe("ProductCard (productos)", () => {
  const mockProduct: UserProduct = {
    id: "1",
    name: "Cuenta Digital",
    type: "savings",
    description: "Sin comisiones de manejo, 100% digital.",
    imageSrc: "/cards/saving-icon.png",
    accountNumber: "****7821",
    balance: "$8,320,000",
    status: "active",
    lastMovement: "Hoy, 9:15 AM",
    rate: "4.0% EA",
  };

  const mockConfig = {
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
  };

  const mockInputRef = createRef<HTMLInputElement>();
  const mockOnEditNameChange = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnCancelEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado básico", () => {
    it("renderiza el nombre del producto", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={false}
          editName=""
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText("Cuenta Digital")).toBeInTheDocument();
    });

    it("renderiza la descripción del producto", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={false}
          editName=""
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(
        screen.getByText("Sin comisiones de manejo, 100% digital.")
      ).toBeInTheDocument();
    });

    it("renderiza el balance del producto", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={false}
          editName=""
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText("$8,320,000")).toBeInTheDocument();
    });

    it("renderiza el icono del producto", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={false}
          editName=""
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
    });
  });

  describe("Modo de visualización", () => {
    it("muestra ProductNameDisplay cuando no está editando", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={false}
          editName=""
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText("Cuenta Digital")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /editar nombre/i })).toBeInTheDocument();
    });
  });

  describe("Modo de edición", () => {
    it("muestra ProductNameEditor cuando está editando", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={true}
          editName="Cuenta Editada"
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveValue("Cuenta Editada");
    });

    it("muestra botones de guardar y cancelar en modo edición", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={true}
          editName="Cuenta"
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByRole("button", { name: /guardar/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /cancelar/i })).toBeInTheDocument();
    });
  });

  describe("Interacción", () => {
    it("llama onEdit al hacer click en editar", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={false}
          editName=""
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      const editButton = screen.getByRole("button", { name: /editar nombre/i });
      fireEvent.click(editButton);
      expect(mockOnEdit).toHaveBeenCalled();
    });

    it("llama onDelete al hacer click en eliminar", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={false}
          editName=""
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      const deleteButton = screen.getByRole("button", { name: /cancelar producto/i });
      fireEvent.click(deleteButton);
      expect(mockOnDelete).toHaveBeenCalled();
    });

    it("llama onSave al hacer click en guardar durante edición", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={true}
          editName="Nuevo nombre"
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      const saveButton = screen.getByRole("button", { name: /guardar/i });
      fireEvent.click(saveButton);
      expect(mockOnSave).toHaveBeenCalled();
    });

    it("llama onCancelEdit al hacer click en cancelar durante edición", () => {
      render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={true}
          editName="Nombre"
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      const cancelButton = screen.getByRole("button", { name: /cancelar/i });
      fireEvent.click(cancelButton);
      expect(mockOnCancelEdit).toHaveBeenCalled();
    });
  });

  describe("Estilos", () => {
    it("aplica la sombra de la configuración", () => {
      const { container } = render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={false}
          editName=""
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("shadow-emerald-500/20");
    });

    it("tiene clase de transición hover", () => {
      const { container } = render(
        <ProductCard
          product={mockProduct}
          type="savings"
          config={mockConfig}
          isEditing={false}
          editName=""
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("transition-all", "hover:-translate-y-1");
    });
  });
});
