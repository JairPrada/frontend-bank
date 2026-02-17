import { render, screen, fireEvent } from "@testing-library/react";
import { DataTreatmentCheckbox } from "./data-treatment-checkbox";

describe("DataTreatmentCheckbox", () => {
  const mockRegister = jest.fn().mockReturnValue({
    name: "acceptsDataTreatment",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  });
  const mockOnOpenModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("renderiza el checkbox", () => {
      render(
        <DataTreatmentCheckbox
          register={mockRegister}
          errors={{}}
          onOpenModal={mockOnOpenModal}
        />
      );
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("renderiza el texto del checkbox", () => {
      render(
        <DataTreatmentCheckbox
          register={mockRegister}
          errors={{}}
          onOpenModal={mockOnOpenModal}
        />
      );
      expect(screen.getByText(/acepto el/i)).toBeInTheDocument();
    });

    it("renderiza el enlace para ver política de datos", () => {
      render(
        <DataTreatmentCheckbox
          register={mockRegister}
          errors={{}}
          onOpenModal={mockOnOpenModal}
        />
      );
      expect(
        screen.getByText("tratamiento de mis datos personales")
      ).toBeInTheDocument();
    });
  });

  describe("Interacción", () => {
    it("abre modal al hacer click en el enlace de política", () => {
      render(
        <DataTreatmentCheckbox
          register={mockRegister}
          errors={{}}
          onOpenModal={mockOnOpenModal}
        />
      );
      const link = screen.getByText("tratamiento de mis datos personales");

      fireEvent.click(link);

      expect(mockOnOpenModal).toHaveBeenCalled();
    });

    it("permite marcar el checkbox", () => {
      render(
        <DataTreatmentCheckbox
          register={mockRegister}
          errors={{}}
          onOpenModal={mockOnOpenModal}
        />
      );
      const checkbox = screen.getByRole("checkbox");

      fireEvent.click(checkbox);

      // El checkbox se registra con react-hook-form
      expect(mockRegister).toHaveBeenCalledWith("acceptsDataTreatment");
    });
  });

  describe("Errores", () => {
    it("muestra mensaje de error cuando existe", () => {
      render(
        <DataTreatmentCheckbox
          register={mockRegister}
          errors={{
            acceptsDataTreatment: {
              message: "Debes aceptar el tratamiento de datos",
              type: "required",
            },
          }}
          onOpenModal={mockOnOpenModal}
        />
      );
      expect(
        screen.getByText("Debes aceptar el tratamiento de datos")
      ).toBeInTheDocument();
    });

    it("no muestra mensaje de error cuando no hay errores", () => {
      render(
        <DataTreatmentCheckbox
          register={mockRegister}
          errors={{}}
          onOpenModal={mockOnOpenModal}
        />
      );
      expect(
        screen.queryByText("Debes aceptar el tratamiento de datos")
      ).not.toBeInTheDocument();
    });

    it("aplica estilos de error al checkbox cuando hay error", () => {
      const { container } = render(
        <DataTreatmentCheckbox
          register={mockRegister}
          errors={{
            acceptsDataTreatment: {
              message: "Error",
              type: "required",
            },
          }}
          onOpenModal={mockOnOpenModal}
        />
      );
      // Verificar que existe el contenedor con clase de error
      expect(container.querySelector(".border-red-400")).toBeInTheDocument();
    });
  });
});
