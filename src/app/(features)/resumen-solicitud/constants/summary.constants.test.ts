import { SUCCESS_MESSAGES, PRODUCT_DETAILS, NEXT_STEPS } from "./summary.constants";

describe("summary.constants", () => {
  describe("SUCCESS_MESSAGES", () => {
    it("debe tener mensaje de felicitaciones", () => {
      expect(SUCCESS_MESSAGES.TITLE).toBe("¡Felicitaciones!");
    });

    it("debe tener subtítulo de procesamiento exitoso", () => {
      expect(SUCCESS_MESSAGES.SUBTITLE).toBe("Tu solicitud ha sido procesada exitosamente");
    });

    it("debe tener mensaje de producto listo", () => {
      expect(SUCCESS_MESSAGES.PRODUCT_READY).toBe("Tu producto está listo");
    });

    it("debe tener título de próximos pasos", () => {
      expect(SUCCESS_MESSAGES.NEXT_STEPS_TITLE).toBe("Próximos pasos");
    });
  });

  describe("PRODUCT_DETAILS", () => {
    it("debe tener detalles para tarjeta de crédito", () => {
      const creditCard = PRODUCT_DETAILS["credit-card"];
      expect(creditCard).toBeDefined();
      expect(creditCard.title).toBe("Tarjeta de Crédito");
      expect(creditCard.benefits).toHaveLength(3);
    });

    it("debe tener detalles para cuenta de ahorro", () => {
      const savingsAccount = PRODUCT_DETAILS["savings-account"];
      expect(savingsAccount).toBeDefined();
      expect(savingsAccount.title).toBe("Cuenta de Ahorro");
      expect(savingsAccount.benefits).toHaveLength(3);
    });

    it("debe tener detalles para crédito libre inversión", () => {
      const freeInvestment = PRODUCT_DETAILS["free-investment"];
      expect(freeInvestment).toBeDefined();
      expect(freeInvestment.title).toBe("Crédito Libre Inversión");
      expect(freeInvestment.benefits).toHaveLength(3);
    });

    it("cada producto debe tener propiedades requeridas", () => {
      Object.values(PRODUCT_DETAILS).forEach((product) => {
        expect(product).toHaveProperty("title");
        expect(product).toHaveProperty("description");
        expect(product).toHaveProperty("icon");
        expect(product).toHaveProperty("benefits");
        expect(Array.isArray(product.benefits)).toBe(true);
      });
    });
  });

  describe("NEXT_STEPS", () => {
    it("debe tener 3 pasos siguientes", () => {
      expect(NEXT_STEPS).toHaveLength(3);
    });

    it("debe mencionar correo de confirmación", () => {
      expect(NEXT_STEPS[0]).toContain("correo de confirmación");
    });

    it("debe mencionar contacto de asesor", () => {
      expect(NEXT_STEPS[1]).toContain("asesor te contactará");
    });

    it("debe mencionar documento de identidad", () => {
      expect(NEXT_STEPS[2]).toContain("documento de identidad");
    });
  });
});
