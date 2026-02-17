import { renderHook, act } from "@testing-library/react";
import { useFormStore } from "./form.store";

describe("form.store", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useFormStore());
    act(() => {
      result.current.resetAllForms();
    });
  });

  it("tiene estado inicial de login", () => {
    const { result } = renderHook(() => useFormStore());
    
    expect(result.current.login).toBeDefined();
    expect(result.current.login.documentNumber).toBe("");
  });

  it("tiene estado inicial de register", () => {
    const { result } = renderHook(() => useFormStore());
    
    expect(result.current.register).toBeDefined();
    expect(result.current.register.fullName).toBe("");
  });

  it("tiene estado inicial de application", () => {
    const { result } = renderHook(() => useFormStore());
    
    expect(result.current.application).toBeDefined();
    expect(result.current.application.documentNumber).toBe("");
    expect(result.current.application.acceptsDataTreatment).toBe(false);
  });

  it("tiene estado inicial de productSelection", () => {
    const { result } = renderHook(() => useFormStore());
    
    expect(result.current.productSelection).toBeDefined();
    expect(result.current.productSelection.selectedProductId).toBeNull();
  });

  it("actualiza campo de login", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setLoginField("documentNumber", "12345678");
    });
    
    expect(result.current.login.documentNumber).toBe("12345678");
  });

  it("actualiza campo de register", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setRegisterField("fullName", "Juan Pérez");
    });
    
    expect(result.current.register.fullName).toBe("Juan Pérez");
  });

  it("actualiza campo de application", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setApplicationField("acceptsDataTreatment", true);
    });
    
    expect(result.current.application.acceptsDataTreatment).toBe(true);
  });

  it("resetea formulario de login", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setLoginField("documentNumber", "12345678");
      result.current.resetLogin();
    });
    
    expect(result.current.login.documentNumber).toBe("");
  });

  it("resetea todos los formularios", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setLoginField("documentNumber", "12345678");
      result.current.setRegisterField("fullName", "Test");
      result.current.resetAllForms();
    });
    
    expect(result.current.login.documentNumber).toBe("");
    expect(result.current.register.fullName).toBe("");
  });
});
