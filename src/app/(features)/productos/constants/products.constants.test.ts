import { MOCK_PRODUCTS } from "./products.constants";

describe("Products Constants", () => {
  describe("MOCK_PRODUCTS", () => {
    it("tiene productos definidos", () => {
      expect(MOCK_PRODUCTS.length).toBeGreaterThan(0);
    });

    it("tiene productos de tipo savings", () => {
      const savingsProducts = MOCK_PRODUCTS.filter(p => p.type === "savings");
      expect(savingsProducts.length).toBeGreaterThan(0);
    });

    it("tiene productos de tipo credit", () => {
      const creditProducts = MOCK_PRODUCTS.filter(p => p.type === "credit");
      expect(creditProducts.length).toBeGreaterThan(0);
    });

    it("tiene productos de tipo loan", () => {
      const loanProducts = MOCK_PRODUCTS.filter(p => p.type === "loan");
      expect(loanProducts.length).toBeGreaterThan(0);
    });

    it("cada producto tiene id único", () => {
      const ids = MOCK_PRODUCTS.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("cada producto tiene campos requeridos", () => {
      MOCK_PRODUCTS.forEach(product => {
        expect(product.id).toBeDefined();
        expect(product.name).toBeDefined();
        expect(product.type).toBeDefined();
        expect(product.status).toBeDefined();
      });
    });

    it("productos de cuenta tienen número de cuenta", () => {
      const productsWithAccount = MOCK_PRODUCTS.filter(
        p => p.type === "savings" || p.type === "credit"
      );
      productsWithAccount.forEach(product => {
        expect(product.accountNumber).toMatch(/^\*\*\*\*\d{4}$/);
      });
    });

    it("productos tienen balance", () => {
      MOCK_PRODUCTS.forEach(product => {
        expect(product.balance).toBeDefined();
        expect(product.balance).toMatch(/^\$/);
      });
    });

    it("primer producto es Cuenta Digital", () => {
      expect(MOCK_PRODUCTS[0].name).toBe("Cuenta Digital");
      expect(MOCK_PRODUCTS[0].type).toBe("savings");
    });
  });
});
