import { render, screen, fireEvent } from "@testing-library/react";
import { SuccessContent } from "./success-content";

// Mocks
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

describe("SuccessContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Renderizado", () => {
    it("muestra el icono de éxito", () => {
      render(<SuccessContent productId="savings" />);
      // El componente SuccessIcon debería renderizarse
      const successSection = document.querySelector(".animate-fade-in-up");
      expect(successSection).toBeInTheDocument();
    });

    it("muestra el título de éxito", () => {
      render(<SuccessContent productId="savings" />);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("renderiza la tarjeta de resumen del producto", () => {
      render(<SuccessContent productId="savings" />);
      // El ProductSummaryCard muestra el título del producto
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    });

    it("muestra la sección de próximos pasos", () => {
      render(<SuccessContent productId="savings" />);
      expect(screen.getByText(/próximos pasos/i)).toBeInTheDocument();
    });

    it("renderiza el botón de ir al inicio", () => {
      render(<SuccessContent productId="savings" />);
      expect(
        screen.getByRole("button", { name: /ir al inicio/i })
      ).toBeInTheDocument();
    });

    it("muestra el badge de seguridad con texto personalizado", () => {
      render(<SuccessContent productId="savings" />);
      expect(
        screen.getByText(/solicitud procesada de forma segura/i)
      ).toBeInTheDocument();
    });
  });

  describe("Interacción", () => {
    it("navega al inicio al hacer click en el botón", () => {
      render(<SuccessContent productId="savings" />);
      const homeButton = screen.getByRole("button", { name: /ir al inicio/i });

      fireEvent.click(homeButton);

      expect(mockPush).toHaveBeenCalled();
    });
  });

  describe("Props", () => {
    it("recibe correctamente el productId", () => {
      render(<SuccessContent productId="credit" />);
      // El componente debe renderizar sin errores con cualquier productId
      expect(screen.getByRole("button", { name: /ir al inicio/i })).toBeInTheDocument();
    });

    it("funciona con diferentes tipos de producto", () => {
      const { rerender } = render(<SuccessContent productId="savings" />);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

      rerender(<SuccessContent productId="credit" />);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

      rerender(<SuccessContent productId="loan" />);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });
  });
});
