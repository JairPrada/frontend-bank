import { renderHook } from "@testing-library/react";
import { useInView } from "./use-in-view";

describe("useInView", () => {
  it("retorna ref e isInView", () => {
    const { result } = renderHook(() => useInView());
    
    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.isInView).toBe("boolean");
  });

  it("inicia con isInView en false", () => {
    const { result } = renderHook(() => useInView());
    
    expect(result.current.isInView).toBe(false);
  });

  it("acepta opciones personalizadas", () => {
    const { result } = renderHook(() =>
      useInView({
        threshold: 0.5,
        rootMargin: "10px",
        triggerOnce: false,
      })
    );
    
    expect(result.current.ref).toBeDefined();
    expect(result.current.isInView).toBe(false);
  });

  it("usa valores por defecto cuando no se pasan opciones", () => {
    const { result } = renderHook(() => useInView());
    
    expect(result.current.ref).toBeDefined();
  });

  it("puede configurarse con triggerOnce true", () => {
    const { result } = renderHook(() => useInView({ triggerOnce: true }));
    
    expect(result.current.ref.current).toBeNull();
  });

  it("puede configurarse con triggerOnce false", () => {
    const { result } = renderHook(() => useInView({ triggerOnce: false }));
    
    expect(result.current.ref.current).toBeNull();
  });

  it("puede configurarse con threshold personalizado", () => {
    const { result } = renderHook(() => useInView({ threshold: 0.8 }));
    
    expect(result.current).toBeDefined();
  });

  it("puede configurarse con rootMargin personalizado", () => {
    const { result } = renderHook(() => useInView({ rootMargin: "20px" }));
    
    expect(result.current).toBeDefined();
  });
});
