import {
  identificationSchema,
  passwordSchema,
  passwordStrongSchema,
  confirmPasswordSchema,
  nameSchema,
  citySchema,
  monthlyIncomeSchema,
  dataTreatmentSchema,
} from "./validation.schemas";
import * as yup from "yup";

describe("Validation Schemas", () => {
  describe("identificationSchema", () => {
    it("valida cédula correcta", async () => {
      await expect(identificationSchema.validate("12345678")).resolves.toBe("12345678");
    });

    it("rechaza cédula vacía", async () => {
      await expect(identificationSchema.validate("")).rejects.toThrow("obligatorio");
    });

    it("rechaza cédula con letras", async () => {
      await expect(identificationSchema.validate("1234abc")).rejects.toThrow("números");
    });

    it("rechaza cédula muy corta", async () => {
      await expect(identificationSchema.validate("123")).rejects.toThrow("6 dígitos");
    });

    it("rechaza cédula muy larga", async () => {
      await expect(identificationSchema.validate("1234567890123")).rejects.toThrow("12 dígitos");
    });
  });

  describe("passwordSchema", () => {
    it("valida contraseña correcta", async () => {
      await expect(passwordSchema.validate("password123")).resolves.toBe("password123");
    });

    it("rechaza contraseña vacía", async () => {
      await expect(passwordSchema.validate("")).rejects.toThrow("obligatoria");
    });

    it("rechaza contraseña muy corta", async () => {
      await expect(passwordSchema.validate("1234567")).rejects.toThrow("8 caracteres");
    });
  });

  describe("passwordStrongSchema", () => {
    it("valida contraseña fuerte correcta", async () => {
      await expect(passwordStrongSchema.validate("Password1")).resolves.toBe("Password1");
    });

    it("rechaza sin mayúscula", async () => {
      await expect(passwordStrongSchema.validate("password1")).rejects.toThrow("mayúscula");
    });

    it("rechaza sin minúscula", async () => {
      await expect(passwordStrongSchema.validate("PASSWORD1")).rejects.toThrow("minúscula");
    });

    it("rechaza sin número", async () => {
      await expect(passwordStrongSchema.validate("Password")).rejects.toThrow("número");
    });
  });

  describe("confirmPasswordSchema", () => {
    const schema = yup.object({
      password: yup.string(),
      confirmPassword: confirmPasswordSchema,
    });

    it("valida cuando las contraseñas coinciden", async () => {
      await expect(
        schema.validate({ password: "Test123", confirmPassword: "Test123" })
      ).resolves.toMatchObject({ confirmPassword: "Test123" });
    });

    it("rechaza cuando las contraseñas no coinciden", async () => {
      await expect(
        schema.validate({ password: "Test123", confirmPassword: "Different" })
      ).rejects.toThrow("no coinciden");
    });

    it("rechaza confirmación vacía", async () => {
      await expect(
        schema.validate({ password: "Test123", confirmPassword: "" })
      ).rejects.toThrow();
    });
  });

  describe("nameSchema", () => {
    it("valida nombre correcto", async () => {
      await expect(nameSchema.validate("Juan Pérez")).resolves.toBe("Juan Pérez");
    });

    it("rechaza nombre vacío", async () => {
      await expect(nameSchema.validate("")).rejects.toThrow("obligatorio");
    });

    it("rechaza nombre muy corto", async () => {
      await expect(nameSchema.validate("Ab")).rejects.toThrow("3 caracteres");
    });

    it("rechaza nombre muy largo", async () => {
      const longName = "A".repeat(51);
      await expect(nameSchema.validate(longName)).rejects.toThrow("50 caracteres");
    });
  });

  describe("citySchema", () => {
    it("valida ciudad correcta", async () => {
      await expect(citySchema.validate("Bogotá")).resolves.toBe("Bogotá");
    });

    it("rechaza ciudad vacía", async () => {
      await expect(citySchema.validate("")).rejects.toThrow("obligatoria");
    });

    it("rechaza ciudad muy corta", async () => {
      await expect(citySchema.validate("A")).rejects.toThrow("2 caracteres");
    });
  });

  describe("monthlyIncomeSchema", () => {
    it("valida ingreso correcto", async () => {
      await expect(monthlyIncomeSchema.validate(5000000)).resolves.toBe(5000000);
    });

    it("rechaza ingreso vacío/null", async () => {
      await expect(monthlyIncomeSchema.validate(null)).rejects.toThrow();
    });

    it("rechaza ingreso cero o negativo", async () => {
      await expect(monthlyIncomeSchema.validate(0)).rejects.toThrow("mayores a 0");
    });
  });

  describe("dataTreatmentSchema", () => {
    it("valida aceptación", async () => {
      await expect(dataTreatmentSchema.validate(true)).resolves.toBe(true);
    });

    it("rechaza no aceptación", async () => {
      await expect(dataTreatmentSchema.validate(false)).rejects.toThrow();
    });
  });
});
