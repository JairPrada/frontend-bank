import { render, screen, fireEvent, act } from "@testing-library/react";
import { OtpForm } from "./otp-form";

// Mocks
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("OtpForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("renderiza el encabezado con número de teléfono parcial", () => {
      render(<OtpForm />);
      expect(screen.getByText(/\*\*\* \*\*\* \*\*45/)).toBeInTheDocument();
    });

    it("renderiza los inputs de OTP", () => {
      render(<OtpForm />);
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBeGreaterThan(0);
    });

    it("renderiza el enlace de reenviar código", () => {
      render(<OtpForm />);
      expect(screen.getByText(/reenviar/i)).toBeInTheDocument();
    });

    it("renderiza el mensaje de seguridad", () => {
      render(<OtpForm />);
      expect(screen.getByText(/verificación segura/i)).toBeInTheDocument();
    });

    it("muestra el título de verificación", () => {
      render(<OtpForm />);
      expect(screen.getByText(/verificación de identidad/i)).toBeInTheDocument();
    });
  });

  describe("Interacción con inputs", () => {
    it("permite ingresar dígitos en los campos de OTP", () => {
      render(<OtpForm />);
      const inputs = screen.getAllByRole("textbox");

      fireEvent.change(inputs[0], { target: { value: "1" } });
      expect(inputs[0]).toHaveValue("1");
    });

    it("mantiene el valor después de ingresar un dígito", () => {
      render(<OtpForm />);
      const inputs = screen.getAllByRole("textbox");

      fireEvent.change(inputs[0], { target: { value: "5" } });
      expect(inputs[0]).toHaveValue("5");
    });

    it("permite llenar múltiples campos", () => {
      render(<OtpForm />);
      const inputs = screen.getAllByRole("textbox");

      fireEvent.change(inputs[0], { target: { value: "1" } });
      fireEvent.change(inputs[1], { target: { value: "2" } });

      expect(inputs[0]).toHaveValue("1");
      expect(inputs[1]).toHaveValue("2");
    });
  });

  describe("Estructura", () => {
    it("renderiza el formulario con inputs de OTP", () => {
      render(<OtpForm />);
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBe(6);
    });

    it("los inputs tienen maxLength=1", () => {
      render(<OtpForm />);
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toHaveAttribute("maxlength", "1");
      });
    });

    it("los inputs tienen inputMode numeric", () => {
      render(<OtpForm />);
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toHaveAttribute("inputmode", "numeric");
      });
    });
  });
});
