import { render, screen, fireEvent } from "@testing-library/react";
import { DataTreatmentModal } from "./data-treatment-modal";

describe("DataTreatmentModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado cuando está abierto", () => {
    it("muestra el título del modal", () => {
      render(<DataTreatmentModal isOpen={true} onClose={mockOnClose} />);
      expect(
        screen.getByText("Tratamiento de Datos Personales")
      ).toBeInTheDocument();
    });

    it("muestra el contenido sobre protección de datos", () => {
      render(<DataTreatmentModal isOpen={true} onClose={mockOnClose} />);
      expect(
        screen.getByText(/ley de protección de datos personales/i)
      ).toBeInTheDocument();
    });

    it("muestra la sección de finalidad del tratamiento", () => {
      render(<DataTreatmentModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText("Finalidad del tratamiento")).toBeInTheDocument();
    });

    it("muestra la lista de finalidades", () => {
      render(<DataTreatmentModal isOpen={true} onClose={mockOnClose} />);
      expect(
        screen.getByText(/procesamiento y evaluación de su solicitud/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/verificación de identidad/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/comunicación sobre el estado/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/cumplimiento de obligaciones legales/i)
      ).toBeInTheDocument();
    });

    it("muestra la sección de derechos del titular", () => {
      render(<DataTreatmentModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText("Derechos del titular")).toBeInTheDocument();
    });

    it("muestra la sección de seguridad", () => {
      render(<DataTreatmentModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText("Seguridad")).toBeInTheDocument();
    });

    it("muestra información sobre medidas de seguridad", () => {
      render(<DataTreatmentModal isOpen={true} onClose={mockOnClose} />);
      expect(
        screen.getByText(/medidas de seguridad técnicas/i)
      ).toBeInTheDocument();
    });
  });

  describe("Renderizado cuando está cerrado", () => {
    it("no muestra el modal cuando isOpen es false", () => {
      render(<DataTreatmentModal isOpen={false} onClose={mockOnClose} />);
      expect(
        screen.queryByText("Tratamiento de Datos Personales")
      ).not.toBeInTheDocument();
    });
  });

  describe("Interacción", () => {
    it("llama onClose al cerrar el modal", () => {
      render(<DataTreatmentModal isOpen={true} onClose={mockOnClose} />);
      const closeButton = screen.getByRole("button", { name: /cerrar/i });

      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
