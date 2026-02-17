import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductSelection } from "./product-selection";

// Mocks
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockSetSelectedProduct = jest.fn();
jest.mock("@/shared/hooks", () => ({
  useProductSelectionStore: () => ({
    setSelectedProduct: mockSetSelectedProduct,
  }),
}));

jest.mock("../services", () => ({
  createProduct: jest.fn().mockResolvedValue({}),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

describe("ProductSelection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Renderizado", () => {
    it("muestra el título de selección", () => {
      render(<ProductSelection />);
      expect(screen.getByText("Selecciona tu producto")).toBeInTheDocument();
    });

    it("muestra el subtítulo explicativo", () => {
      render(<ProductSelection />);
      expect(
        screen.getByText(/elige el producto financiero/i)
      ).toBeInTheDocument();
    });

    it("renderiza las tarjetas de productos disponibles", () => {
      render(<ProductSelection />);
      // Debería haber al menos una tarjeta de producto
      const productCards = screen.getAllByRole("button");
      expect(productCards.length).toBeGreaterThan(0);
    });

    it("muestra el botón de continuar", () => {
      render(<ProductSelection />);
      expect(
        screen.getByRole("button", { name: /continuar/i })
      ).toBeInTheDocument();
    });

    it("muestra el mensaje de seguridad", () => {
      render(<ProductSelection />);
      expect(
        screen.getByText(/proceso seguro y encriptado/i)
      ).toBeInTheDocument();
    });
  });

  describe("Estado inicial", () => {
    it("el botón de continuar está deshabilitado sin selección", () => {
      render(<ProductSelection />);
      const continueButton = screen.getByRole("button", { name: /continuar/i });
      expect(continueButton).toBeDisabled();
    });
  });

  describe("Selección de producto", () => {
    it("habilita el botón de continuar al seleccionar un producto", async () => {
      render(<ProductSelection />);

      // Obtener todas las tarjetas clickeables (excluyendo el botón continuar)
      const allButtons = screen.getAllByRole("button");
      const productCard = allButtons.find(
        (btn) => !btn.textContent?.includes("Continuar")
      );

      if (productCard) {
        fireEvent.click(productCard);

        await waitFor(() => {
          const continueButton = screen.getByRole("button", {
            name: /continuar/i,
          });
          expect(continueButton).not.toBeDisabled();
        });
      }
    });
  });

  describe("Envío de selección", () => {
    it("guarda producto en store al continuar", async () => {
      const { createProduct } = jest.requireMock("../services");
      render(<ProductSelection />);

      // Seleccionar un producto
      const allButtons = screen.getAllByRole("button");
      const productCard = allButtons.find(
        (btn) => !btn.textContent?.includes("Continuar")
      );

      if (productCard) {
        fireEvent.click(productCard);

        await waitFor(() => {
          const continueButton = screen.getByRole("button", {
            name: /continuar/i,
          });
          fireEvent.click(continueButton);
        });

        await waitFor(() => {
          expect(mockSetSelectedProduct).toHaveBeenCalled();
        });
      }
    });

    it("llama al servicio de crear producto", async () => {
      const { createProduct } = jest.requireMock("../services");
      render(<ProductSelection />);

      // Seleccionar producto
      const allButtons = screen.getAllByRole("button");
      const productCard = allButtons.find(
        (btn) => !btn.textContent?.includes("Continuar")
      );

      if (productCard) {
        fireEvent.click(productCard);

        await waitFor(() => {
          const continueButton = screen.getByRole("button", {
            name: /continuar/i,
          });
          fireEvent.click(continueButton);
        });

        await waitFor(() => {
          expect(createProduct).toHaveBeenCalled();
        });
      }
    });

    it("navega al resumen después de crear producto", async () => {
      render(<ProductSelection />);

      const allButtons = screen.getAllByRole("button");
      const productCard = allButtons.find(
        (btn) => !btn.textContent?.includes("Continuar")
      );

      if (productCard) {
        fireEvent.click(productCard);

        const continueButton = screen.getByRole("button", {
          name: /continuar/i,
        });
        fireEvent.click(continueButton);

        // Avanzar tiempo para el loader
        jest.advanceTimersByTime(2000);

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalled();
        });
      }
    });
  });

  describe("Estado de carga", () => {
    it("muestra estado de procesando al hacer submit", async () => {
      render(<ProductSelection />);

      const allButtons = screen.getAllByRole("button");
      const productCard = allButtons.find(
        (btn) => !btn.textContent?.includes("Continuar")
      );

      if (productCard) {
        fireEvent.click(productCard);

        const continueButton = screen.getByRole("button", {
          name: /continuar/i,
        });
        fireEvent.click(continueButton);

        await waitFor(() => {
          expect(screen.getByText(/procesando/i)).toBeInTheDocument();
        });
      }
    });
  });
});
