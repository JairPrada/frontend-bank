import { LOADER_DELAY_MS, FORM_FIELD_CONFIG } from "./ui.constants";

describe("ui.constants", () => {
  describe("LOADER_DELAY_MS", () => {
    it("tiene valor de 1500ms", () => {
      expect(LOADER_DELAY_MS).toBe(1500);
    });

    it("es un número positivo", () => {
      expect(typeof LOADER_DELAY_MS).toBe("number");
      expect(LOADER_DELAY_MS).toBeGreaterThan(0);
    });
  });

  describe("FORM_FIELD_CONFIG", () => {
    it("tiene longitud máxima de identificación", () => {
      expect(FORM_FIELD_CONFIG.IDENTIFICATION_MAX_LENGTH).toBe(15);
    });

    it("tiene longitud de código OTP", () => {
      expect(FORM_FIELD_CONFIG.OTP_CODE_LENGTH).toBe(6);
    });

    it("todos los valores son números positivos", () => {
      expect(FORM_FIELD_CONFIG.IDENTIFICATION_MAX_LENGTH).toBeGreaterThan(0);
      expect(FORM_FIELD_CONFIG.OTP_CODE_LENGTH).toBeGreaterThan(0);
    });
  });
});
