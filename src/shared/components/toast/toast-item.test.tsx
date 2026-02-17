import { render, screen, act } from "@testing-library/react";
import { ToastItem } from "./toast-item";

// Mock de estilos
jest.mock("./toast-styles", () => ({
  toastStyles: {
    success: { bg: "bg-green-50", icon: "bg-green-100" },
    error: { bg: "bg-red-50", icon: "bg-red-100" },
    warning: { bg: "bg-yellow-50", icon: "bg-yellow-100" },
    info: { bg: "bg-blue-50", icon: "bg-blue-100" },
  },
  toastIcons: {
    success: <span data-testid="toast-icon-success">✓</span>,
    error: <span data-testid="toast-icon-error">✗</span>,
    warning: <span data-testid="toast-icon-warning">⚠</span>,
    info: <span data-testid="toast-icon-info">ℹ</span>,
  },
}));

describe("ToastItem", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const defaultProps = {
    id: "toast-1",
    type: "success" as const,
    title: "Éxito",
    onClose: jest.fn(),
  };

  it("renderiza el título", () => {
    render(<ToastItem {...defaultProps} />);
    expect(screen.getByText("Éxito")).toBeInTheDocument();
  });

  it("renderiza el mensaje cuando se proporciona", () => {
    render(<ToastItem {...defaultProps} message="Operación completada" />);
    expect(screen.getByText("Operación completada")).toBeInTheDocument();
  });

  it("muestra el icono correcto según el tipo", () => {
    render(<ToastItem {...defaultProps} type="success" />);
    expect(screen.getByTestId("toast-icon-success")).toBeInTheDocument();
  });

  it("llama onClose después del duration", () => {
    const onClose = jest.fn();
    render(<ToastItem {...defaultProps} onClose={onClose} duration={3000} />);
    
    act(() => {
      jest.advanceTimersByTime(3300);
    });
    
    expect(onClose).toHaveBeenCalledWith("toast-1");
  });

  it("usa duration de 5000ms por defecto", () => {
    const onClose = jest.fn();
    render(<ToastItem {...defaultProps} onClose={onClose} />);
    
    act(() => {
      jest.advanceTimersByTime(5300);
    });
    
    expect(onClose).toHaveBeenCalled();
  });

  it("no se cierra automáticamente cuando duration es 0", () => {
    const onClose = jest.fn();
    render(<ToastItem {...defaultProps} onClose={onClose} duration={0} />);
    
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it("renderiza diferentes tipos de toast", () => {
    const { rerender } = render(<ToastItem {...defaultProps} type="error" />);
    expect(screen.getByTestId("toast-icon-error")).toBeInTheDocument();
    
    rerender(<ToastItem {...defaultProps} type="warning" />);
    expect(screen.getByTestId("toast-icon-warning")).toBeInTheDocument();
    
    rerender(<ToastItem {...defaultProps} type="info" />);
    expect(screen.getByTestId("toast-icon-info")).toBeInTheDocument();
  });
});
