import { applicationFormSchema } from "./application-form.schema";

describe("applicationFormSchema", () => {
  it("valida formulario correcto", async () => {
    const validData = {
      documentNumber: "12345678",
      acceptsDataTreatment: true,
    };

    await expect(applicationFormSchema.validate(validData)).resolves.toMatchObject({
      documentNumber: "12345678",
      acceptsDataTreatment: true,
    });
  });

  it("rechaza documentNumber vacío", async () => {
    const invalidData = {
      documentNumber: "",
      acceptsDataTreatment: true,
    };

    await expect(applicationFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza documentNumber muy corto", async () => {
    const invalidData = {
      documentNumber: "123",
      acceptsDataTreatment: true,
    };

    await expect(applicationFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza documentNumber con letras", async () => {
    const invalidData = {
      documentNumber: "123abc",
      acceptsDataTreatment: true,
    };

    await expect(applicationFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza tratamiento de datos no aceptado", async () => {
    const invalidData = {
      documentNumber: "12345678",
      acceptsDataTreatment: false,
    };

    await expect(applicationFormSchema.validate(invalidData)).rejects.toThrow();
  });

  it("rechaza documentNumber muy largo", async () => {
    const invalidData = {
      documentNumber: "1234567890123",
      acceptsDataTreatment: true,
    };

    await expect(applicationFormSchema.validate(invalidData)).rejects.toThrow();
  });
});
