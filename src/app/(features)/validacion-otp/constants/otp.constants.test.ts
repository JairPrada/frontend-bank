import { OTP_CONFIG, VALIDATION_MESSAGES, OTP_CURRENT_STEP } from "./otp.constants";

describe("OTP Constants", () => {
  describe("OTP_CONFIG", () => {
    it("tiene longitud de código correcta", () => {
      expect(OTP_CONFIG.CODE_LENGTH).toBe(6);
    });

    it("tiene cooldown de reenvío correcto", () => {
      expect(OTP_CONFIG.RESEND_COOLDOWN_SECONDS).toBe(60);
    });

    it("tiene auto submit habilitado", () => {
      expect(OTP_CONFIG.AUTO_SUBMIT).toBe(true);
    });
  });

  describe("VALIDATION_MESSAGES", () => {
    it("tiene mensaje de código requerido", () => {
      expect(VALIDATION_MESSAGES.REQUIRED).toContain("obligatorio");
    });

    it("tiene mensaje de código incompleto", () => {
      expect(VALIDATION_MESSAGES.INCOMPLETE).toContain("todos los dígitos");
    });

    it("tiene mensaje de código inválido", () => {
      expect(VALIDATION_MESSAGES.INVALID).toContain("no es válido");
    });
  });

  describe("OTP_CURRENT_STEP", () => {
    it("está configurado como 2", () => {
      expect(OTP_CURRENT_STEP).toBe(2);
    });
  });
});
