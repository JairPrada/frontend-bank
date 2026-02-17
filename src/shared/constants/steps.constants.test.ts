import { APPLICATION_STEPS } from "./steps.constants";

describe("steps.constants", () => {
  describe("APPLICATION_STEPS", () => {
    it("tiene 4 pasos de aplicación", () => {
      expect(APPLICATION_STEPS).toHaveLength(4);
    });

    it("primer paso es Datos", () => {
      expect(APPLICATION_STEPS[0].id).toBe(1);
      expect(APPLICATION_STEPS[0].label).toBe("Datos");
    });

    it("segundo paso es Verificación", () => {
      expect(APPLICATION_STEPS[1].id).toBe(2);
      expect(APPLICATION_STEPS[1].label).toBe("Verificación");
    });

    it("tercer paso es Creación Usuario", () => {
      expect(APPLICATION_STEPS[2].id).toBe(3);
      expect(APPLICATION_STEPS[2].label).toBe("Creación Usuario");
    });

    it("cuarto paso es Producto", () => {
      expect(APPLICATION_STEPS[3].id).toBe(4);
      expect(APPLICATION_STEPS[3].label).toBe("Producto");
    });

    it("todos los pasos tienen id y label", () => {
      APPLICATION_STEPS.forEach((step) => {
        expect(step).toHaveProperty("id");
        expect(step).toHaveProperty("label");
        expect(typeof step.id).toBe("number");
        expect(typeof step.label).toBe("string");
      });
    });
  });
});
