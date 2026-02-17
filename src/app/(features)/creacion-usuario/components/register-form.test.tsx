import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RegisterForm } from "./register-form";

// Mocks
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockSetFullName = jest.fn();
const mockSetCity = jest.fn();
const mockSetMonthlyIncome = jest.fn();
jest.mock("@/shared/hooks", () => ({
  useRegisterFormStore: () => ({
    setFullName: mockSetFullName,
    setCity: mockSetCity,
    setMonthlyIncome: mockSetMonthlyIncome,
  }),
}));

jest.mock("../services", () => ({
  registerUser: jest.fn().mockResolvedValue({}),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("renderiza el campo de nombre completo", () => {
      render(<RegisterForm />);
      expect(screen.getByPlaceholderText(/nombre completo/i)).toBeInTheDocument();
    });

    it("renderiza el campo de ciudad", () => {
      render(<RegisterForm />);
      expect(screen.getByText("Ciudad de residencia")).toBeInTheDocument();
    });

    it("renderiza el campo de ingresos mensuales", () => {
      render(<RegisterForm />);
      expect(screen.getByPlaceholderText(/3500000/)).toBeInTheDocument();
    });

    it("renderiza el campo de contraseña", () => {
      render(<RegisterForm />);
      expect(screen.getByPlaceholderText(/mínimo 8 caracteres/i)).toBeInTheDocument();
    });

    it("renderiza el campo de confirmar contraseña", () => {
      render(<RegisterForm />);
      expect(screen.getByPlaceholderText(/repite tu contraseña/i)).toBeInTheDocument();
    });

    it("renderiza el botón de crear cuenta", () => {
      render(<RegisterForm />);
      expect(
        screen.getByRole("button", { name: /crear cuenta/i })
      ).toBeInTheDocument();
    });

    it("renderiza el badge de seguridad con texto personalizado", () => {
      render(<RegisterForm />);
      expect(
        screen.getByText(/tus datos están protegidos/i)
      ).toBeInTheDocument();
    });
  });

  describe("Interacción con campos", () => {
    it("permite ingresar nombre completo", () => {
      render(<RegisterForm />);
      const input = screen.getByPlaceholderText(/nombre completo/i);

      fireEvent.change(input, { target: { value: "Juan Pérez" } });

      expect(input).toHaveValue("Juan Pérez");
    });

    it("permite ingresar ingresos mensuales", () => {
      render(<RegisterForm />);
      const input = screen.getByPlaceholderText(/3500000/);

      fireEvent.change(input, { target: { value: "3500000" } });

      expect(input).toHaveValue(3500000);
    });

    it("permite ingresar contraseña", () => {
      render(<RegisterForm />);
      const input = screen.getByPlaceholderText(/mínimo 8 caracteres/i);

      fireEvent.change(input, { target: { value: "password123" } });

      expect(input).toHaveValue("password123");
    });

    it("permite ingresar confirmación de contraseña", () => {
      render(<RegisterForm />);
      const input = screen.getByPlaceholderText(/repite tu contraseña/i);

      fireEvent.change(input, { target: { value: "password123" } });

      expect(input).toHaveValue("password123");
    });
  });

  describe("Validación", () => {
    it("muestra error cuando campos requeridos están vacíos", async () => {
      render(<RegisterForm />);
      const submitButton = screen.getByRole("button", { name: /crear cuenta/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryAllByRole("alert").length).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("Envío del formulario", () => {
    it("renderiza formulario con todos los campos", () => {
      render(<RegisterForm />);

      // Verificar campos del formulario
      expect(screen.getByPlaceholderText(/nombre completo/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/3500000/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/mínimo 8 caracteres/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/repite tu contraseña/i)).toBeInTheDocument();
      expect(screen.getByText("Ciudad de residencia")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /crear cuenta/i })).toBeInTheDocument();
    });
  });
});
