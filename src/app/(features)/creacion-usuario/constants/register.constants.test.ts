import { 
  REGISTER_STEPS, 
  REGISTER_CURRENT_STEP, 
  VALIDATION_MESSAGES, 
  FORM_CONFIG 
} from "./register.constants";

describe("Register Constants", () => {
  describe("REGISTER_STEPS", () => {
    it("tiene los pasos correctos", () => {
      expect(REGISTER_STEPS).toHaveLength(2);
      expect(REGISTER_STEPS[0].label).toBe("Datos");
      expect(REGISTER_STEPS[1].label).toBe("Contraseña");
    });

    it("tiene IDs secuenciales", () => {
      expect(REGISTER_STEPS[0].id).toBe(1);
      expect(REGISTER_STEPS[1].id).toBe(2);
    });
  });

  describe("REGISTER_CURRENT_STEP", () => {
    it("está configurado como 3", () => {
      expect(REGISTER_CURRENT_STEP).toBe(3);
    });
  });

  describe("VALIDATION_MESSAGES", () => {
    it("tiene mensajes de nombre", () => {
      expect(VALIDATION_MESSAGES.NAME_REQUIRED).toContain("obligatorio");
      expect(VALIDATION_MESSAGES.NAME_MIN).toContain("3 caracteres");
      expect(VALIDATION_MESSAGES.NAME_MAX).toContain("50 caracteres");
    });

    it("tiene mensajes de ciudad", () => {
      expect(VALIDATION_MESSAGES.CITY_REQUIRED).toContain("obligatoria");
      expect(VALIDATION_MESSAGES.CITY_MIN).toContain("2 caracteres");
    });

    it("tiene mensajes de ingresos", () => {
      expect(VALIDATION_MESSAGES.MONTHLY_INCOME_REQUIRED).toContain("obligatorios");
      expect(VALIDATION_MESSAGES.MONTHLY_INCOME_MIN).toContain("mayores a 0");
    });

    it("tiene mensajes de contraseña", () => {
      expect(VALIDATION_MESSAGES.PASSWORD_REQUIRED).toContain("obligatoria");
      expect(VALIDATION_MESSAGES.PASSWORD_UPPERCASE).toContain("mayúscula");
      expect(VALIDATION_MESSAGES.PASSWORD_LOWERCASE).toContain("minúscula");
      expect(VALIDATION_MESSAGES.PASSWORD_NUMBER).toContain("número");
    });

    it("tiene mensajes de confirmación de contraseña", () => {
      expect(VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED).toContain("Confirma");
      expect(VALIDATION_MESSAGES.CONFIRM_PASSWORD_MATCH).toContain("no coinciden");
    });
  });

  describe("FORM_CONFIG", () => {
    it("tiene configuración correcta de nombre", () => {
      expect(FORM_CONFIG.NAME_MIN_LENGTH).toBe(3);
      expect(FORM_CONFIG.NAME_MAX_LENGTH).toBe(50);
    });

    it("tiene configuración correcta de ciudad", () => {
      expect(FORM_CONFIG.CITY_MIN_LENGTH).toBe(2);
    });

    it("tiene configuración correcta de contraseña", () => {
      expect(FORM_CONFIG.PASSWORD_MIN_LENGTH).toBe(8);
    });
  });
});
