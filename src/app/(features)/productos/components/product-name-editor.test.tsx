import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { ProductNameEditor } from "./product-name-editor";

describe("ProductNameEditor", () => {
  const mockOnChange = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("renderiza el input de edición", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value="Cuenta Digital"
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("muestra el valor actual en el input", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value="Cuenta Premium"
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      expect(screen.getByRole("textbox")).toHaveValue("Cuenta Premium");
    });

    it("muestra el botón de guardar", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value=""
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      expect(
        screen.getByRole("button", { name: /guardar/i }),
      ).toBeInTheDocument();
    });

    it("muestra el botón de cancelar", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value=""
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      expect(
        screen.getByRole("button", { name: /cancelar/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Interacción con input", () => {
    it("llama onChange al escribir", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value=""
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "Nuevo nombre" } });

      expect(mockOnChange).toHaveBeenCalledWith("Nuevo nombre");
    });

    it("llama onKeyDown al presionar tecla", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value="Test"
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      const input = screen.getByRole("textbox");

      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnKeyDown).toHaveBeenCalled();
    });
  });

  describe("Interacción con botones", () => {
    it("llama onSave al hacer click en guardar", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value="Cuenta editada"
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      const saveButton = screen.getByRole("button", { name: /guardar/i });

      fireEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalled();
    });

    it("llama onCancel al hacer click en cancelar", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value="Cuenta"
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      const cancelButton = screen.getByRole("button", { name: /cancelar/i });

      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalled();
    });
  });

  describe("Ref del input", () => {
    it("asigna la ref al input correctamente", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value="Test"
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );

      expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
      expect(inputRef.current?.value).toBe("Test");
    });
  });

  describe("Estilos", () => {
    it("aplica estilos de borde al input", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value="Test"
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border", "border-emerald-300");
    });

    it("aplica color verde al botón de guardar", () => {
      const inputRef = createRef<HTMLInputElement>();
      render(
        <ProductNameEditor
          value="Test"
          inputRef={inputRef}
          onChange={mockOnChange}
          onKeyDown={mockOnKeyDown}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />,
      );
      const saveButton = screen.getByRole("button", { name: /guardar/i });
      expect(saveButton).toHaveClass("text-emerald-600");
    });
  });
});
