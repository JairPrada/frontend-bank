import { VALIDATION_CONFIG, VALIDATION_MESSAGES } from "./validation.constants";

describe("Validation Constants", () => {
  describe("VALIDATION_CONFIG", () => {
    it("tiene configuración correcta para identificación", () => {
      expect(VALIDATION_CONFIG.IDENTIFICATION.MIN_LENGTH).toBe(6);
      expect(VALIDATION_CONFIG.IDENTIFICATION.MAX_LENGTH).toBe(12);
    });

    it("tiene configuración correcta para contraseña", () => {
      expect(VALIDATION_CONFIG.PASSWORD.MIN_LENGTH).toBe(8);
    });

    it("tiene configuración correcta para nombre", () => {
      expect(VALIDATION_CONFIG.NAME.MIN_LENGTH).toBe(3);
      expect(VALIDATION_CONFIG.NAME.MAX_LENGTH).toBe(50);
    });

    it("tiene configuración correcta para ciudad", () => {
      expect(VALIDATION_CONFIG.CITY.MIN_LENGTH).toBe(2);
    });
  });

  describe("VALIDATION_MESSAGES", () => {
    it("tiene mensajes de identificación", () => {
      expect(VALIDATION_MESSAGES.IDENTIFICATION.REQUIRED).toContain("obligatorio");
      expect(VALIDATION_MESSAGES.IDENTIFICATION.NUMERIC).toContain("números");
    });

    it("tiene mensajes de contraseña", () => {
      expect(VALIDATION_MESSAGES.PASSWORD.REQUIRED).toContain("obligatoria");
      expect(VALIDATION_MESSAGES.PASSWORD.UPPERCASE).toContain("mayúscula");
      expect(VALIDATION_MESSAGES.PASSWORD.LOWERCASE).toContain("minúscula");
      expect(VALIDATION_MESSAGES.PASSWORD.NUMBER).toContain("número");
    });

    it("tiene mensajes de confirmación de contraseña", () => {
      expect(VALIDATION_MESSAGES.CONFIRM_PASSWORD.REQUIRED).toContain("Confirma");
      expect(VALIDATION_MESSAGES.CONFIRM_PASSWORD.MATCH).toContain("no coinciden");
    });

    it("tiene mensajes de nombre", () => {
      expect(VALIDATION_MESSAGES.NAME.REQUIRED).toContain("obligatorio");
    });

    it("tiene mensajes de ciudad", () => {
      expect(VALIDATION_MESSAGES.CITY.REQUIRED).toContain("obligatoria");
    });

    it("tiene mensajes de ingresos mensuales", () => {
      expect(VALIDATION_MESSAGES.MONTHLY_INCOME.REQUIRED).toContain("obligatorios");
      expect(VALIDATION_MESSAGES.MONTHLY_INCOME.MIN).toContain("mayores a 0");
    });

    it("tiene mensajes de tratamiento de datos", () => {
      expect(VALIDATION_MESSAGES.DATA_TREATMENT.REQUIRED).toContain("aceptar");
    });
  });
});
