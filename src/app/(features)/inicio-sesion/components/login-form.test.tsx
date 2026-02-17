import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "./login-form";

// Mocks
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockSetIdentificationNumber = jest.fn();
jest.mock("@/shared/hooks", () => ({
  useLoginFormStore: () => ({
    setIdentificationNumber: mockSetIdentificationNumber,
  }),
}));

jest.mock("../services", () => ({
  login: jest.fn().mockResolvedValue({}),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("muestra el título del formulario", () => {
      render(<LoginForm />);
      expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    });

    it("muestra el subtítulo explicativo", () => {
      render(<LoginForm />);
      expect(
        screen.getByText("Ingresa tus credenciales para acceder")
      ).toBeInTheDocument();
    });

    it("renderiza el campo de número de cédula", () => {
      render(<LoginForm />);
      expect(screen.getByPlaceholderText(/número de cédula/i)).toBeInTheDocument();
    });

    it("renderiza el campo de contraseña", () => {
      render(<LoginForm />);
      expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    });

    it("renderiza el botón de ingresar", () => {
      render(<LoginForm />);
      expect(
        screen.getByRole("button", { name: /ingresar/i })
      ).toBeInTheDocument();
    });

    it("renderiza el badge de seguridad", () => {
      render(<LoginForm />);
      expect(screen.getByText(/datos están protegidos/i)).toBeInTheDocument();
    });
  });

  describe("Validación", () => {
    it("muestra error cuando el documento está vacío al enviar", async () => {
      render(<LoginForm />);
      const submitButton = screen.getByRole("button", { name: /ingresar/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/cédula/i)).toBeInTheDocument();
      });
    });

    it("permite ingresar texto en el campo documento", async () => {
      render(<LoginForm />);
      const documentInput = screen.getByPlaceholderText(/número de cédula/i);

      fireEvent.change(documentInput, { target: { value: "12345678" } });

      expect(documentInput).toHaveValue("12345678");
    });

    it("permite ingresar texto en el campo contraseña", async () => {
      render(<LoginForm />);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);

      fireEvent.change(passwordInput, { target: { value: "password123" } });

      expect(passwordInput).toHaveValue("password123");
    });
  });

  describe("Envío del formulario", () => {
    it("llama al servicio de login con datos válidos", async () => {
      const { login } = jest.requireMock("../services");
      render(<LoginForm />);

      const documentInput = screen.getByPlaceholderText(/número de cédula/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      const submitButton = screen.getByRole("button", { name: /ingresar/i });

      fireEvent.change(documentInput, { target: { value: "1234567890" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(login).toHaveBeenCalledWith({
          documentNumber: "1234567890",
          passwordHash: "password123",
        });
      });
    });

    it("guarda el documento en el store", async () => {
      render(<LoginForm />);

      const documentInput = screen.getByPlaceholderText(/número de cédula/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      const submitButton = screen.getByRole("button", { name: /ingresar/i });

      fireEvent.change(documentInput, { target: { value: "1234567890" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSetIdentificationNumber).toHaveBeenCalledWith("1234567890");
      });
    });

    it("navega a productos después del login exitoso", async () => {
      render(<LoginForm />);

      const documentInput = screen.getByPlaceholderText(/número de cédula/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      const submitButton = screen.getByRole("button", { name: /ingresar/i });

      fireEvent.change(documentInput, { target: { value: "1234567890" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalled();
      });
    });
  });
});
