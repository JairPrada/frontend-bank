import { renderHook, act } from "@testing-library/react";
import {
  useLoginFormStore,
  useRegisterFormStore,
  useApplicationFormStore,
  useProductSelectionStore,
  useResetAllForms,
} from "./use-form-store";
import { useFormStore } from "@/shared/store";

describe("use-form-store hooks", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useFormStore());
    act(() => {
      result.current.resetAllForms();
    });
  });

  describe("useLoginFormStore", () => {
    it("retorna estado de login", () => {
      const { result } = renderHook(() => useLoginFormStore());
      
      expect(result.current.documentNumber).toBe("");
      expect(result.current.setIdentificationNumber).toBeDefined();
      expect(result.current.reset).toBeDefined();
    });

    it("actualiza número de identificación", () => {
      const { result } = renderHook(() => useLoginFormStore());
      
      act(() => {
        result.current.setIdentificationNumber("12345678");
      });
      
      expect(result.current.documentNumber).toBe("12345678");
    });

    it("resetea el formulario", () => {
      const { result } = renderHook(() => useLoginFormStore());
      
      act(() => {
        result.current.setIdentificationNumber("12345678");
        result.current.reset();
      });
      
      expect(result.current.documentNumber).toBe("");
    });
  });

  describe("useRegisterFormStore", () => {
    it("retorna estado de registro", () => {
      const { result } = renderHook(() => useRegisterFormStore());
      
      expect(result.current.fullName).toBe("");
      expect(result.current.city).toBe("");
      expect(result.current.monthlyIncome).toBeNull();
    });

    it("actualiza nombre completo", () => {
      const { result } = renderHook(() => useRegisterFormStore());
      
      act(() => {
        result.current.setFullName("Juan Pérez");
      });
      
      expect(result.current.fullName).toBe("Juan Pérez");
    });

    it("actualiza ciudad", () => {
      const { result } = renderHook(() => useRegisterFormStore());
      
      act(() => {
        result.current.setCity("Bogotá");
      });
      
      expect(result.current.city).toBe("Bogotá");
    });

    it("actualiza ingreso mensual", () => {
      const { result } = renderHook(() => useRegisterFormStore());
      
      act(() => {
        result.current.setMonthlyIncome(5000000);
      });
      
      expect(result.current.monthlyIncome).toBe(5000000);
    });

    it("resetea el formulario", () => {
      const { result } = renderHook(() => useRegisterFormStore());
      
      act(() => {
        result.current.setFullName("Test");
        result.current.reset();
      });
      
      expect(result.current.fullName).toBe("");
    });
  });

  describe("useApplicationFormStore", () => {
    it("retorna estado de solicitud", () => {
      const { result } = renderHook(() => useApplicationFormStore());
      
      expect(result.current.documentNumber).toBe("");
      expect(result.current.acceptsDataTreatment).toBe(false);
    });

    it("actualiza número de identificación", () => {
      const { result } = renderHook(() => useApplicationFormStore());
      
      act(() => {
        result.current.setIdentificationNumber("87654321");
      });
      
      expect(result.current.documentNumber).toBe("87654321");
    });

    it("actualiza aceptación de tratamiento de datos", () => {
      const { result } = renderHook(() => useApplicationFormStore());
      
      act(() => {
        result.current.setAcceptsDataTreatment(true);
      });
      
      expect(result.current.acceptsDataTreatment).toBe(true);
    });

    it("resetea el formulario", () => {
      const { result } = renderHook(() => useApplicationFormStore());
      
      act(() => {
        result.current.setAcceptsDataTreatment(true);
        result.current.reset();
      });
      
      expect(result.current.acceptsDataTreatment).toBe(false);
    });
  });

  describe("useProductSelectionStore", () => {
    it("retorna estado de selección de producto", () => {
      const { result } = renderHook(() => useProductSelectionStore());
      
      expect(result.current.selectedProductId).toBeNull();
      expect(result.current.setSelectedProduct).toBeDefined();
    });

    it("selecciona un producto", () => {
      const { result } = renderHook(() => useProductSelectionStore());
      
      act(() => {
        result.current.setSelectedProduct("credit-card");
      });
      
      expect(result.current.selectedProductId).toBe("credit-card");
    });

    it("resetea la selección", () => {
      const { result } = renderHook(() => useProductSelectionStore());
      
      act(() => {
        result.current.setSelectedProduct("credit-card");
        result.current.reset();
      });
      
      expect(result.current.selectedProductId).toBeNull();
    });
  });

  describe("useResetAllForms", () => {
    it("retorna función de reset", () => {
      const { result } = renderHook(() => useResetAllForms());
      
      expect(typeof result.current).toBe("function");
    });

    it("resetea todos los formularios", () => {
      const { result: loginResult } = renderHook(() => useLoginFormStore());
      const { result: resetResult } = renderHook(() => useResetAllForms());
      
      act(() => {
        loginResult.current.setIdentificationNumber("12345");
      });
      
      act(() => {
        resetResult.current();
      });
      
      expect(loginResult.current.documentNumber).toBe("");
    });
  });
});
