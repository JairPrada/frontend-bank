import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApplicationForm } from "./application-form";

// Mocks
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockSetIdentificationNumber = jest.fn();
const mockSetAcceptsDataTreatment = jest.fn();
jest.mock("@/shared/hooks", () => ({
  useApplicationFormStore: () => ({
    setIdentificationNumber: mockSetIdentificationNumber,
    setAcceptsDataTreatment: mockSetAcceptsDataTreatment,
  }),
}));

jest.mock("../services", () => ({
  startApplication: jest.fn().mockResolvedValue({}),
}));

describe("ApplicationForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("renderiza el campo de número de cédula", () => {
      render(<ApplicationForm />);
      expect(screen.getByPlaceholderText(/1234567890/)).toBeInTheDocument();
    });

    it("renderiza el checkbox de tratamiento de datos", () => {
      render(<ApplicationForm />);
      expect(
        screen.getByText(/tratamiento de mis datos personales/i)
      ).toBeInTheDocument();
    });

    it("renderiza el botón de iniciar solicitud", () => {
      render(<ApplicationForm />);
      expect(
        screen.getByRole("button", { name: /iniciar solicitud/i })
      ).toBeInTheDocument();
    });

    it("renderiza el encabezado del formulario", () => {
      render(<ApplicationForm />);
      expect(screen.getByText(/nueva solicitud/i)).toBeInTheDocument();
    });

    it("renderiza el pie del formulario con información de seguridad", () => {
      render(<ApplicationForm />);
      expect(screen.getByText(/protegidos/i)).toBeInTheDocument();
    });
  });

  describe("Interacción", () => {
    it("permite ingresar número de documento", () => {
      render(<ApplicationForm />);
      const input = screen.getByPlaceholderText(/1234567890/);

      fireEvent.change(input, { target: { value: "1234567890" } });

      expect(input).toHaveValue("1234567890");
    });

    it("permite marcar el checkbox de tratamiento de datos", () => {
      render(<ApplicationForm />);
      const checkbox = screen.getByRole("checkbox");

      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("abre el modal de tratamiento de datos al hacer click en el enlace", () => {
      render(<ApplicationForm />);
      const link = screen.getByText("tratamiento de mis datos personales");

      fireEvent.click(link);

      expect(
        screen.getByText("Tratamiento de Datos Personales")
      ).toBeInTheDocument();
    });
  });

  describe("Validación", () => {
    it("muestra error si el documento está vacío", async () => {
      render(<ApplicationForm />);
      const submitButton = screen.getByRole("button", {
        name: /iniciar solicitud/i,
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/cédula/i)).toBeInTheDocument();
      });
    });

    it("muestra error si no acepta tratamiento de datos", async () => {
      render(<ApplicationForm />);
      const input = screen.getByPlaceholderText(/1234567890/);
      const submitButton = screen.getByRole("button", {
        name: /iniciar solicitud/i,
      });

      fireEvent.change(input, { target: { value: "1234567890" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/aceptar/i)).toBeInTheDocument();
      });
    });
  });

  describe("Envío exitoso", () => {
    it("llama al servicio de solicitud con datos válidos", async () => {
      const { startApplication } = jest.requireMock("../services");
      render(<ApplicationForm />);

      const input = screen.getByPlaceholderText(/1234567890/);
      const checkbox = screen.getByRole("checkbox");
      const submitButton = screen.getByRole("button", {
        name: /iniciar solicitud/i,
      });

      fireEvent.change(input, { target: { value: "1234567890" } });
      fireEvent.click(checkbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(startApplication).toHaveBeenCalledWith({
          documentNumber: "1234567890",
          acceptsDataTreatment: true,
        });
      });
    });

    it("guarda datos en el store al enviar", async () => {
      render(<ApplicationForm />);

      const input = screen.getByPlaceholderText(/1234567890/);
      const checkbox = screen.getByRole("checkbox");
      const submitButton = screen.getByRole("button", {
        name: /iniciar solicitud/i,
      });

      fireEvent.change(input, { target: { value: "1234567890" } });
      fireEvent.click(checkbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSetIdentificationNumber).toHaveBeenCalledWith("1234567890");
        expect(mockSetAcceptsDataTreatment).toHaveBeenCalledWith(true);
      });
    });

    it("navega a validación OTP después del envío exitoso", async () => {
      render(<ApplicationForm />);

      const input = screen.getByPlaceholderText(/1234567890/);
      const checkbox = screen.getByRole("checkbox");
      const submitButton = screen.getByRole("button", {
        name: /iniciar solicitud/i,
      });

      fireEvent.change(input, { target: { value: "1234567890" } });
      fireEvent.click(checkbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalled();
      });
    });
  });
});
