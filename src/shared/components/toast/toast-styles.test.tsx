import { toastIcons, toastStyles, positionClasses } from "./toast-styles";

describe("toast-styles", () => {
  describe("toastIcons", () => {
    it("tiene iconos para todos los tipos de toast", () => {
      expect(toastIcons.success).toBeDefined();
      expect(toastIcons.error).toBeDefined();
      expect(toastIcons.warning).toBeDefined();
      expect(toastIcons.info).toBeDefined();
    });
  });

  describe("toastStyles", () => {
    it("tiene estilos para success", () => {
      expect(toastStyles.success).toHaveProperty("bg");
      expect(toastStyles.success).toHaveProperty("icon");
      expect(toastStyles.success).toHaveProperty("text");
      expect(toastStyles.success.bg).toContain("emerald");
    });

    it("tiene estilos para error", () => {
      expect(toastStyles.error).toHaveProperty("bg");
      expect(toastStyles.error.bg).toContain("red");
    });

    it("tiene estilos para warning", () => {
      expect(toastStyles.warning).toHaveProperty("bg");
      expect(toastStyles.warning.bg).toContain("amber");
    });

    it("tiene estilos para info", () => {
      expect(toastStyles.info).toHaveProperty("bg");
      expect(toastStyles.info.bg).toContain("blue");
    });
  });

  describe("positionClasses", () => {
    it("tiene clases para top-right", () => {
      expect(positionClasses["top-right"]).toContain("top-4");
      expect(positionClasses["top-right"]).toContain("right-4");
    });

    it("tiene clases para top-left", () => {
      expect(positionClasses["top-left"]).toContain("top-4");
      expect(positionClasses["top-left"]).toContain("left-4");
    });

    it("tiene clases para bottom-right", () => {
      expect(positionClasses["bottom-right"]).toContain("bottom-4");
      expect(positionClasses["bottom-right"]).toContain("right-4");
    });

    it("tiene clases para bottom-left", () => {
      expect(positionClasses["bottom-left"]).toContain("bottom-4");
      expect(positionClasses["bottom-left"]).toContain("left-4");
    });

    it("tiene clases para top-center", () => {
      expect(positionClasses["top-center"]).toContain("top-4");
      expect(positionClasses["top-center"]).toContain("translate");
    });

    it("tiene clases para bottom-center", () => {
      expect(positionClasses["bottom-center"]).toContain("bottom-4");
    });
  });
});
