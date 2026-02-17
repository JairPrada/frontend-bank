import { renderHook, act } from "@testing-library/react";
import { useToast } from "./use-toast";

describe("useToast", () => {
  it("inicia sin toasts", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toHaveLength(0);
  });

  it("agrega toast de éxito", () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.success("Título", "Mensaje");
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe("success");
    expect(result.current.toasts[0].title).toBe("Título");
    expect(result.current.toasts[0].message).toBe("Mensaje");
  });

  it("agrega toast de error", () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.error("Error", "Algo salió mal");
    });
    
    expect(result.current.toasts[0].type).toBe("error");
  });

  it("agrega toast de warning", () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.warning("Advertencia");
    });
    
    expect(result.current.toasts[0].type).toBe("warning");
  });

  it("agrega toast de info", () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.info("Información");
    });
    
    expect(result.current.toasts[0].type).toBe("info");
  });

  it("genera IDs únicos para cada toast", () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.success("Toast 1");
      result.current.success("Toast 2");
    });
    
    expect(result.current.toasts[0].id).not.toBe(result.current.toasts[1].id);
  });

  it("elimina toast por ID", () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.success("Toast");
    });
    
    const toastId = result.current.toasts[0].id;
    
    act(() => {
      result.current.removeToast(toastId);
    });
    
    expect(result.current.toasts).toHaveLength(0);
  });

  it("agrega múltiples toasts", () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.success("Toast 1");
      result.current.error("Toast 2");
      result.current.info("Toast 3");
    });
    
    expect(result.current.toasts).toHaveLength(3);
  });

  it("addToast funciona directamente", () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.addToast({ type: "success", title: "Direct" });
    });
    
    expect(result.current.toasts[0].title).toBe("Direct");
  });
});
