import { loginFormSchema } from "./login.schema";

describe("loginFormSchema", () => {
  it("valida formulario correcto", async () => {
    const validData = {
      documentNumber: "12345678",
      password: "password123",
    };

    await expect(loginFormSchema.validate(validData)).resolves.toEqual(validData);
  });

  it("rechaza documentNumber vacío", async () => {
    const invalidData = {
      documentNumber: "",
      password: "password123",
    };

    await expect(loginFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza password vacío", async () => {
    const invalidData = {
      documentNumber: "12345678",
      password: "",
    };

    await expect(loginFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza password muy corto", async () => {
    const invalidData = {
      documentNumber: "12345678",
      password: "1234567",
    };

    await expect(loginFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza documentNumber con letras", async () => {
    const invalidData = {
      documentNumber: "123abc",
      password: "password123",
    };

    await expect(loginFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza documentNumber muy corto", async () => {
    const invalidData = {
      documentNumber: "123",
      password: "password123",
    };

    await expect(loginFormSchema.validate(invalidData)).rejects.toThrow();
  });
});
