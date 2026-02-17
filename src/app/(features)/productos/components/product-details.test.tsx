import { render, screen } from "@testing-library/react";
import { ProductDetails } from "./product-details";

describe("ProductDetails", () => {
  describe("Renderizado de descripción", () => {
    it("muestra la descripción del producto", () => {
      render(
        <ProductDetails
          description="Sin comisiones de manejo, 100% digital."
          type="savings"
        />
      );
      expect(
        screen.getByText("Sin comisiones de manejo, 100% digital.")
      ).toBeInTheDocument();
    });
  });

  describe("Renderizado de número de cuenta", () => {
    it("muestra número de cuenta para tipo savings", () => {
      render(
        <ProductDetails
          description="Cuenta de ahorros"
          accountNumber="****7821"
          type="savings"
        />
      );
      expect(screen.getByText("Cuenta: ****7821")).toBeInTheDocument();
    });

    it("muestra número de tarjeta para tipo credit", () => {
      render(
        <ProductDetails
          description="Tarjeta de crédito"
          accountNumber="****1234"
          type="credit"
        />
      );
      expect(screen.getByText("Tarjeta: ****1234")).toBeInTheDocument();
    });

    it("no muestra número de cuenta para tipo loan", () => {
      render(
        <ProductDetails
          description="Crédito libre inversión"
          accountNumber="****5678"
          type="loan"
        />
      );
      expect(screen.queryByText(/Cuenta:/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Tarjeta:/)).not.toBeInTheDocument();
    });

    it("no muestra número de cuenta cuando no está presente", () => {
      render(
        <ProductDetails description="Producto sin cuenta" type="savings" />
      );
      expect(screen.queryByText(/Cuenta:/)).not.toBeInTheDocument();
    });
  });

  describe("Renderizado de último movimiento", () => {
    it("muestra último movimiento para savings", () => {
      render(
        <ProductDetails
          description="Cuenta"
          lastMovement="Hoy, 9:15 AM"
          type="savings"
        />
      );
      expect(
        screen.getByText("Último movimiento: Hoy, 9:15 AM")
      ).toBeInTheDocument();
    });

    it("muestra último movimiento para credit", () => {
      render(
        <ProductDetails
          description="Tarjeta"
          lastMovement="Hace 3 días"
          type="credit"
        />
      );
      expect(
        screen.getByText("Último movimiento: Hace 3 días")
      ).toBeInTheDocument();
    });

    it("muestra texto directo sin prefijo para loan", () => {
      render(
        <ProductDetails
          description="Crédito"
          lastMovement="Cuota: 15 de cada mes"
          type="loan"
        />
      );
      expect(screen.getByText("Cuota: 15 de cada mes")).toBeInTheDocument();
      expect(
        screen.queryByText(/Último movimiento:/)
      ).not.toBeInTheDocument();
    });

    it("no muestra último movimiento cuando no está presente", () => {
      render(<ProductDetails description="Producto básico" type="savings" />);
      expect(
        screen.queryByText(/Último movimiento:/)
      ).not.toBeInTheDocument();
    });
  });

  describe("Combinaciones de datos", () => {
    it("renderiza todos los campos para cuenta de ahorros completa", () => {
      render(
        <ProductDetails
          description="Cuenta digital premium"
          accountNumber="****4532"
          lastMovement="Ayer, 3:45 PM"
          type="savings"
        />
      );

      expect(screen.getByText("Cuenta digital premium")).toBeInTheDocument();
      expect(screen.getByText("Cuenta: ****4532")).toBeInTheDocument();
      expect(
        screen.getByText("Último movimiento: Ayer, 3:45 PM")
      ).toBeInTheDocument();
    });

    it("renderiza todos los campos para tarjeta de crédito completa", () => {
      render(
        <ProductDetails
          description="Tarjeta Gold"
          accountNumber="****5678"
          lastMovement="Hace 2 días"
          type="credit"
        />
      );

      expect(screen.getByText("Tarjeta Gold")).toBeInTheDocument();
      expect(screen.getByText("Tarjeta: ****5678")).toBeInTheDocument();
      expect(
        screen.getByText("Último movimiento: Hace 2 días")
      ).toBeInTheDocument();
    });

    it("renderiza campos de préstamo correctamente", () => {
      render(
        <ProductDetails
          description="Financia tus proyectos"
          lastMovement="Cuota: 5 de cada mes"
          type="loan"
        />
      );

      expect(screen.getByText("Financia tus proyectos")).toBeInTheDocument();
      expect(screen.getByText("Cuota: 5 de cada mes")).toBeInTheDocument();
    });
  });
});
