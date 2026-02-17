import { registerFormSchema } from "./register.schema";

describe("registerFormSchema", () => {
  const validData = {
    fullName: "Juan Pérez",
    city: "Bogotá",
    monthlyIncome: 5000000,
    password: "Password123",
    confirmPassword: "Password123",
  };

  it("valida formulario correcto", async () => {
    await expect(registerFormSchema.validate(validData)).resolves.toMatchObject({
      fullName: "Juan Pérez",
      city: "Bogotá",
      monthlyIncome: 5000000,
    });
  });

  it("rechaza nombre vacío", async () => {
    const invalidData = { ...validData, fullName: "" };
    await expect(registerFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza ciudad vacía", async () => {
    const invalidData = { ...validData, city: "" };
    await expect(registerFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza ingresos mensuales cero", async () => {
    const invalidData = { ...validData, monthlyIncome: 0 };
    await expect(registerFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza contraseña sin mayúscula", async () => {
    const invalidData = { 
      ...validData, 
      password: "password123",
      confirmPassword: "password123",
    };
    await expect(registerFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza contraseña sin número", async () => {
    const invalidData = { 
      ...validData, 
      password: "Password",
      confirmPassword: "Password",
    };
    await expect(registerFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza confirmación que no coincide", async () => {
    const invalidData = { 
      ...validData, 
      confirmPassword: "Different123",
    };
    await expect(registerFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza nombre muy corto", async () => {
    const invalidData = { ...validData, fullName: "AB" };
    await expect(registerFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza nombre muy largo", async () => {
    const invalidData = { ...validData, fullName: "A".repeat(51) };
    await expect(registerFormSchema.validate(invalidData)).rejects.toThrow();
  });
});
