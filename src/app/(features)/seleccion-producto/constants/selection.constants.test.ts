import { SELECTION_CURRENT_STEP, AVAILABLE_PRODUCTS } from "./selection.constants";

describe("selection.constants", () => {
  describe("SELECTION_CURRENT_STEP", () => {
    it("debe ser el paso 4", () => {
      expect(SELECTION_CURRENT_STEP).toBe(4);
    });
  });

  describe("AVAILABLE_PRODUCTS", () => {
    it("debe tener 3 productos disponibles", () => {
      expect(AVAILABLE_PRODUCTS).toHaveLength(3);
    });

    it("cada producto debe tener las propiedades requeridas", () => {
      AVAILABLE_PRODUCTS.forEach((product) => {
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("imageSrc");
        expect(product).toHaveProperty("title");
        expect(product).toHaveProperty("description");
        expect(product).toHaveProperty("bgSrc");
      });
    });

    it("debe incluir Tarjeta de Crédito", () => {
      const creditCard = AVAILABLE_PRODUCTS.find((p) => p.id === "credit-card");
      expect(creditCard).toBeDefined();
      expect(creditCard?.title).toBe("Tarjeta de Crédito");
    });

    it("debe incluir Cuenta de Ahorro", () => {
      const savingsAccount = AVAILABLE_PRODUCTS.find((p) => p.id === "savings-account");
      expect(savingsAccount).toBeDefined();
      expect(savingsAccount?.title).toBe("Cuenta de Ahorro");
    });

    it("debe incluir Crédito Libre Inversión", () => {
      const freeInvestment = AVAILABLE_PRODUCTS.find((p) => p.id === "free-investment");
      expect(freeInvestment).toBeDefined();
      expect(freeInvestment?.title).toBe("Crédito Libre Inversión");
    });

    it("cada producto debe tener imagen válida", () => {
      AVAILABLE_PRODUCTS.forEach((product) => {
        expect(product.imageSrc).toMatch(/^\/cards\/.+\.png$/);
      });
    });
  });
});
