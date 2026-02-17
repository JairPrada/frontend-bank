import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { ProductSection } from "./product-section";
import type { UserProduct } from "../interfaces";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

describe("ProductSection", () => {
  const mockInputRef = createRef<HTMLInputElement>();
  const mockOnEditNameChange = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnCancelEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const mockProducts: UserProduct[] = [
    {
      id: "1",
      name: "Cuenta Digital",
      type: "savings",
      description: "Sin comisiones de manejo",
      imageSrc: "/cards/saving-icon.png",
      accountNumber: "****7821",
      balance: "$8,320,000",
      status: "active",
    },
    {
      id: "2",
      name: "Cuenta Premium",
      type: "savings",
      description: "Tasas preferenciales",
      imageSrc: "/cards/saving-icon.png",
      accountNumber: "****4532",
      balance: "$12,450,000",
      status: "active",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("renderiza el título de la sección", () => {
      render(
        <ProductSection
          type="savings"
          products={mockProducts}
          editingId={null}
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
      expect(screen.getByText("Cuentas de Ahorro")).toBeInTheDocument();
    });

    it("muestra el badge con la cantidad de productos", () => {
      render(
        <ProductSection
          type="savings"
          products={mockProducts}
          editingId={null}
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
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("renderiza todas las tarjetas de productos", () => {
      render(
        <ProductSection
          type="savings"
          products={mockProducts}
          editingId={null}
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
      expect(screen.getByText("Cuenta Premium")).toBeInTheDocument();
    });
  });

  describe("Tipos de productos", () => {
    it("muestra título correcto para savings", () => {
      render(
        <ProductSection
          type="savings"
          products={mockProducts}
          editingId={null}
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
      expect(screen.getByText("Cuentas de Ahorro")).toBeInTheDocument();
    });

    it("muestra título correcto para credit", () => {
      const creditProducts: UserProduct[] = [
        {
          id: "1",
          name: "Tarjeta Gold",
          type: "credit",
          description: "Beneficios premium",
          imageSrc: "/cards/credit-icon.png",
          status: "active",
        },
      ];

      render(
        <ProductSection
          type="credit"
          products={creditProducts}
          editingId={null}
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
      expect(screen.getByText("Tarjetas de Crédito")).toBeInTheDocument();
    });

    it("muestra título correcto para loan", () => {
      const loanProducts: UserProduct[] = [
        {
          id: "1",
          name: "Crédito Libre Inversión",
          type: "loan",
          description: "Tasas preferenciales",
          imageSrc: "/cards/travel-icon.png",
          status: "active",
        },
      ];

      render(
        <ProductSection
          type="loan"
          products={loanProducts}
          editingId={null}
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
      expect(screen.getByText("Préstamos")).toBeInTheDocument();
    });
  });

  describe("Estado de edición", () => {
    it("pasa isEditing=true a la tarjeta correcta", () => {
      render(
        <ProductSection
          type="savings"
          products={mockProducts}
          editingId="1"
          editName="Editando cuenta"
          inputRef={mockInputRef}
          onEditNameChange={mockOnEditNameChange}
          onKeyDown={mockOnKeyDown}
          onEdit={mockOnEdit}
          onSave={mockOnSave}
          onCancelEdit={mockOnCancelEdit}
          onDelete={mockOnDelete}
        />
      );
      // La primera tarjeta debe estar en modo edición
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveValue("Editando cuenta");
    });

    it("no muestra input de edición cuando editingId no coincide", () => {
      render(
        <ProductSection
          type="savings"
          products={mockProducts}
          editingId="999"
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
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });
  });

  describe("Lista vacía", () => {
    it("no muestra tarjetas cuando no hay productos", () => {
      render(
        <ProductSection
          type="savings"
          products={[]}
          editingId={null}
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
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });
});
