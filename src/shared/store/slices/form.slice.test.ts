import { createFormSlice, type FormSlice } from "./form.slice";

// Helper para crear un store mockeado
const createMockStore = () => {
  let state: FormSlice;
  
  const setState = (partial: Partial<FormSlice> | ((state: FormSlice) => Partial<FormSlice>)) => {
    const newState = typeof partial === "function" ? partial(state) : partial;
    state = { ...state, ...newState };
  };
  
  const getState = () => state;
  const subscribe = jest.fn();
  const destroy = jest.fn();
  
  // Inicializar estado con el slice
  state = createFormSlice(setState, getState, { setState, getState, subscribe, destroy });
  
  return { getState, setState };
};

describe("FormSlice", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  describe("estado inicial", () => {
    it("tiene estado inicial de login vacío", () => {
      expect(store.getState().login).toEqual({
        documentNumber: "",
      });
    });

    it("tiene estado inicial de register vacío", () => {
      expect(store.getState().register).toEqual({
        fullName: "",
        city: "",
        monthlyIncome: null,
      });
    });

    it("tiene estado inicial de application vacío", () => {
      expect(store.getState().application).toEqual({
        documentNumber: "",
        acceptsDataTreatment: false,
      });
    });

    it("tiene estado inicial de productSelection vacío", () => {
      expect(store.getState().productSelection).toEqual({
        selectedProductId: null,
      });
    });
  });

  describe("setLoginField", () => {
    it("actualiza documentNumber", () => {
      store.getState().setLoginField("documentNumber", "12345678");
      expect(store.getState().login.documentNumber).toBe("12345678");
    });
  });

  describe("setRegisterField", () => {
    it("actualiza fullName", () => {
      store.getState().setRegisterField("fullName", "Juan Pérez");
      expect(store.getState().register.fullName).toBe("Juan Pérez");
    });

    it("actualiza city", () => {
      store.getState().setRegisterField("city", "Bogotá");
      expect(store.getState().register.city).toBe("Bogotá");
    });

    it("actualiza monthlyIncome", () => {
      store.getState().setRegisterField("monthlyIncome", 5000000);
      expect(store.getState().register.monthlyIncome).toBe(5000000);
    });
  });

  describe("setApplicationField", () => {
    it("actualiza documentNumber", () => {
      store.getState().setApplicationField("documentNumber", "87654321");
      expect(store.getState().application.documentNumber).toBe("87654321");
    });

    it("actualiza acceptsDataTreatment", () => {
      store.getState().setApplicationField("acceptsDataTreatment", true);
      expect(store.getState().application.acceptsDataTreatment).toBe(true);
    });
  });

  describe("setSelectedProduct", () => {
    it("establece producto seleccionado", () => {
      store.getState().setSelectedProduct("product-1");
      expect(store.getState().productSelection.selectedProductId).toBe("product-1");
    });

    it("permite establecer null", () => {
      store.getState().setSelectedProduct("product-1");
      store.getState().setSelectedProduct(null);
      expect(store.getState().productSelection.selectedProductId).toBeNull();
    });
  });

  describe("reset functions", () => {
    it("resetLogin limpia el estado de login", () => {
      store.getState().setLoginField("documentNumber", "12345678");
      store.getState().resetLogin();
      expect(store.getState().login.documentNumber).toBe("");
    });

    it("resetRegister limpia el estado de register", () => {
      store.getState().setRegisterField("fullName", "Juan");
      store.getState().setRegisterField("city", "Bogotá");
      store.getState().resetRegister();
      expect(store.getState().register).toEqual({
        fullName: "",
        city: "",
        monthlyIncome: null,
      });
    });

    it("resetApplication limpia el estado de application", () => {
      store.getState().setApplicationField("documentNumber", "12345678");
      store.getState().setApplicationField("acceptsDataTreatment", true);
      store.getState().resetApplication();
      expect(store.getState().application).toEqual({
        documentNumber: "",
        acceptsDataTreatment: false,
      });
    });

    it("resetProductSelection limpia el producto seleccionado", () => {
      store.getState().setSelectedProduct("product-1");
      store.getState().resetProductSelection();
      expect(store.getState().productSelection.selectedProductId).toBeNull();
    });

    it("resetAllForms limpia todos los estados", () => {
      // Establecer valores
      store.getState().setLoginField("documentNumber", "12345678");
      store.getState().setRegisterField("fullName", "Juan");
      store.getState().setApplicationField("acceptsDataTreatment", true);
      store.getState().setSelectedProduct("product-1");

      // Resetear todo
      store.getState().resetAllForms();

      // Verificar estados iniciales
      expect(store.getState().login.documentNumber).toBe("");
      expect(store.getState().register.fullName).toBe("");
      expect(store.getState().application.acceptsDataTreatment).toBe(false);
      expect(store.getState().productSelection.selectedProductId).toBeNull();
    });
  });
});
