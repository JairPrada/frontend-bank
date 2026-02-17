import { render, screen } from "@testing-library/react";
import { ProductBalance } from "./product-balance";

describe("ProductBalance", () => {
  describe("Renderizado de balance", () => {
    it("muestra el balance cuando está presente", () => {
      render(<ProductBalance balance="$8,320,000" />);
      expect(screen.getByText("$8,320,000")).toBeInTheDocument();
    });

    it("no muestra balance cuando no está presente", () => {
      render(<ProductBalance />);
      expect(screen.queryByText(/\$/)).not.toBeInTheDocument();
    });
  });

  describe("Renderizado de límite", () => {
    it("muestra el límite cuando está presente", () => {
      render(<ProductBalance limit="$15,000,000" />);
      expect(screen.getByText("Cupo: $15,000,000")).toBeInTheDocument();
    });

    it("no muestra cupo cuando no está presente", () => {
      render(<ProductBalance balance="$1,000,000" />);
      expect(screen.queryByText(/Cupo:/)).not.toBeInTheDocument();
    });
  });

  describe("Renderizado de tasa", () => {
    it("muestra la tasa cuando está presente", () => {
      render(<ProductBalance rate="4.5% EA" />);
      expect(screen.getByText("Tasa: 4.5% EA")).toBeInTheDocument();
    });

    it("no muestra tasa cuando no está presente", () => {
      render(<ProductBalance balance="$1,000,000" />);
      expect(screen.queryByText(/Tasa:/)).not.toBeInTheDocument();
    });
  });

  describe("Renderizado combinado", () => {
    it("muestra todos los valores cuando están presentes", () => {
      render(
        <ProductBalance
          balance="$2,150,000"
          limit="$15,000,000"
          rate="1.2% MV"
        />
      );

      expect(screen.getByText("$2,150,000")).toBeInTheDocument();
      expect(screen.getByText("Cupo: $15,000,000")).toBeInTheDocument();
      expect(screen.getByText("Tasa: 1.2% MV")).toBeInTheDocument();
    });

    it("muestra solo balance y tasa sin límite", () => {
      render(<ProductBalance balance="$18,500,000" rate="1.2% MV" />);

      expect(screen.getByText("$18,500,000")).toBeInTheDocument();
      expect(screen.getByText("Tasa: 1.2% MV")).toBeInTheDocument();
      expect(screen.queryByText(/Cupo:/)).not.toBeInTheDocument();
    });
  });

  describe("Estilos", () => {
    it("aplica clase de texto grande al balance", () => {
      render(<ProductBalance balance="$8,320,000" />);
      const balanceElement = screen.getByText("$8,320,000");
      expect(balanceElement).toHaveClass("font-bold");
    });

    it("aplica color verde a la tasa", () => {
      render(<ProductBalance rate="4.5% EA" />);
      const rateElement = screen.getByText("Tasa: 4.5% EA");
      expect(rateElement).toHaveClass("text-emerald-600");
    });
  });
});
