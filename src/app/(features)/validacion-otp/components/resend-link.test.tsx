import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ResendLink } from "./resend-link";

describe("ResendLink", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("muestra contador cuando está en cooldown", () => {
    render(<ResendLink onResend={jest.fn()} cooldownSeconds={30} />);
    
    expect(screen.getByText(/Reenviar en/i)).toBeInTheDocument();
  });

  it("muestra botón de reenviar cuando termina cooldown", () => {
    render(<ResendLink onResend={jest.fn()} cooldownSeconds={1} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByRole("button", { name: /reenviar código/i })).toBeInTheDocument();
  });

  it("llama onResend cuando se hace clic en el botón", () => {
    const mockOnResend = jest.fn();
    render(<ResendLink onResend={mockOnResend} cooldownSeconds={0} />);
    
    const button = screen.getByRole("button", { name: /reenviar código/i });
    fireEvent.click(button);
    
    expect(mockOnResend).toHaveBeenCalledTimes(1);
  });

  it("no llama onResend cuando está deshabilitado", () => {
    const mockOnResend = jest.fn();
    render(<ResendLink onResend={mockOnResend} cooldownSeconds={0} disabled />);
    
    const button = screen.getByRole("button", { name: /reenviar código/i });
    fireEvent.click(button);
    
    expect(mockOnResend).not.toHaveBeenCalled();
  });

  it("reinicia el contador después de reenviar", () => {
    const mockOnResend = jest.fn();
    render(<ResendLink onResend={mockOnResend} cooldownSeconds={30} />);
    
    // Esperar a que termine el cooldown inicial
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    
    const button = screen.getByRole("button", { name: /reenviar código/i });
    fireEvent.click(button);
    
    // Ahora debería mostrar el contador nuevamente
    expect(screen.getByText(/Reenviar en/i)).toBeInTheDocument();
  });

  it("muestra texto de no recibiste el código", () => {
    render(<ResendLink onResend={jest.fn()} cooldownSeconds={30} />);
    
    expect(screen.getByText(/¿No recibiste el código\?/i)).toBeInTheDocument();
  });

  it("formatea tiempo correctamente en segundos", () => {
    render(<ResendLink onResend={jest.fn()} cooldownSeconds={45} />);
    
    expect(screen.getByText(/45s/)).toBeInTheDocument();
  });

  it("formatea tiempo correctamente en minutos", () => {
    render(<ResendLink onResend={jest.fn()} cooldownSeconds={90} />);
    
    expect(screen.getByText(/1:30/)).toBeInTheDocument();
  });

  it("decrementa el contador cada segundo", () => {
    render(<ResendLink onResend={jest.fn()} cooldownSeconds={5} />);
    
    expect(screen.getByText(/5s/)).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText(/4s/)).toBeInTheDocument();
  });
});
