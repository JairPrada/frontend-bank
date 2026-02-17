import { VALIDATION_MESSAGES, FORM_CONFIG } from "./login.constants";

describe("Login Constants", () => {
  describe("VALIDATION_MESSAGES", () => {
    it("tiene mensaje para identificación requerida", () => {
      expect(VALIDATION_MESSAGES.IDENTIFICATION_REQUIRED).toContain("obligatorio");
    });

    it("tiene mensaje para mínimo de identificación", () => {
      expect(VALIDATION_MESSAGES.IDENTIFICATION_MIN).toContain("6 dígitos");
    });

    it("tiene mensaje para máximo de identificación", () => {
      expect(VALIDATION_MESSAGES.IDENTIFICATION_MAX).toContain("15");
    });

    it("tiene mensaje para contraseña requerida", () => {
      expect(VALIDATION_MESSAGES.PASSWORD_REQUIRED).toContain("obligatoria");
    });

    it("tiene mensaje para mínimo de contraseña", () => {
      expect(VALIDATION_MESSAGES.PASSWORD_MIN).toContain("8 caracteres");
    });
  });

  describe("FORM_CONFIG", () => {
    it("tiene longitud mínima de identificación correcta", () => {
      expect(FORM_CONFIG.IDENTIFICATION_MIN_LENGTH).toBe(6);
    });

    it("tiene longitud máxima de identificación correcta", () => {
      expect(FORM_CONFIG.IDENTIFICATION_MAX_LENGTH).toBe(15);
    });

    it("tiene longitud mínima de contraseña correcta", () => {
      expect(FORM_CONFIG.PASSWORD_MIN_LENGTH).toBe(8);
    });
  });
});
