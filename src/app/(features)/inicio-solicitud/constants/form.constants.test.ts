import { VALIDATION_MESSAGES, FORM_CONFIG } from "./form.constants";

describe("Application Form Constants", () => {
  describe("VALIDATION_MESSAGES", () => {
    it("tiene mensaje para identificación requerida", () => {
      expect(VALIDATION_MESSAGES.IDENTIFICATION_REQUIRED).toContain("obligatorio");
    });

    it("tiene mensaje para solo números", () => {
      expect(VALIDATION_MESSAGES.IDENTIFICATION_ONLY_NUMBERS).toContain("números");
    });

    it("tiene mensaje para longitud mínima", () => {
      expect(VALIDATION_MESSAGES.IDENTIFICATION_MIN_LENGTH).toContain("6 dígitos");
    });

    it("tiene mensaje para longitud máxima", () => {
      expect(VALIDATION_MESSAGES.IDENTIFICATION_MAX_LENGTH).toContain("12 dígitos");
    });

    it("tiene mensaje para tratamiento de datos", () => {
      expect(VALIDATION_MESSAGES.DATA_TREATMENT_REQUIRED).toContain("aceptar");
    });
  });

  describe("FORM_CONFIG", () => {
    it("tiene longitud mínima correcta", () => {
      expect(FORM_CONFIG.IDENTIFICATION_MIN_LENGTH).toBe(6);
    });

    it("tiene longitud máxima correcta", () => {
      expect(FORM_CONFIG.IDENTIFICATION_MAX_LENGTH).toBe(12);
    });
  });
});
