import { render, screen, fireEvent } from "@testing-library/react";
import Stepper from "./index";
import type { Step } from "./stepper.types";

// Mock de iconos
jest.mock("../icons", () => ({
  CheckIcon: ({ className }: { className: string }) => (
    <span data-testid="check-icon" className={className}>✓</span>
  ),
}));

const mockSteps: Step[] = [
  { id: 1, label: "Paso 1", description: "Descripción 1" },
  { id: 2, label: "Paso 2", description: "Descripción 2" },
  { id: 3, label: "Paso 3" },
];

describe("Stepper", () => {
  describe("orientación horizontal (default)", () => {
    it("renderiza todos los pasos", () => {
      render(<Stepper steps={mockSteps} currentStep={1} />);
      
      expect(screen.getByText("Paso 1")).toBeInTheDocument();
      expect(screen.getByText("Paso 2")).toBeInTheDocument();
      expect(screen.getByText("Paso 3")).toBeInTheDocument();
    });

    it("marca el paso actual como activo", () => {
      render(<Stepper steps={mockSteps} currentStep={2} />);
      
      const paso2 = screen.getByText("Paso 2");
      expect(paso2).toHaveClass("text-emerald-600");
    });

    it("marca pasos anteriores como completados", () => {
      render(<Stepper steps={mockSteps} currentStep={3} />);
      
      // Pasos 1 y 2 deberían estar completados (con check icon)
      const checkIcons = screen.getAllByTestId("check-icon");
      expect(checkIcons.length).toBe(2);
    });
  });

  describe("orientación vertical", () => {
    it("renderiza en orientación vertical", () => {
      render(<Stepper steps={mockSteps} currentStep={1} orientation="vertical" />);
      
      expect(screen.getByText("Paso 1")).toBeInTheDocument();
      expect(screen.getByText("Descripción 1")).toBeInTheDocument();
    });

    it("muestra descripciones en vertical", () => {
      render(<Stepper steps={mockSteps} currentStep={1} orientation="vertical" />);
      
      expect(screen.getByText("Descripción 1")).toBeInTheDocument();
      expect(screen.getByText("Descripción 2")).toBeInTheDocument();
    });
  });

  describe("interactividad", () => {
    it("no responde a clics por defecto en pasos completados", () => {
      const onStepClick = jest.fn();
      render(
        <Stepper 
          steps={mockSteps} 
          currentStep={3} 
          onStepClick={onStepClick} 
        />
      );
      
      // El paso 1 está completado y muestra check, no es clickeable por defecto
      const checkIcons = screen.getAllByTestId("check-icon");
      fireEvent.click(checkIcons[0]);
      expect(onStepClick).not.toHaveBeenCalled();
    });

    it("permite clic en pasos completados cuando allowClickOnCompleted es true", () => {
      const onStepClick = jest.fn();
      render(
        <Stepper 
          steps={mockSteps} 
          currentStep={3} 
          onStepClick={onStepClick}
          allowClickOnCompleted 
        />
      );
      
      // Buscar el contenedor del paso 1 y hacer clic
      const checkIcons = screen.getAllByTestId("check-icon");
      const step1Container = checkIcons[0].closest("div");
      if (step1Container) {
        fireEvent.click(step1Container);
        expect(onStepClick).toHaveBeenCalledWith(1);
      }
    });
  });

  describe("estados de pasos", () => {
    it("paso pendiente tiene estilo correcto", () => {
      render(<Stepper steps={mockSteps} currentStep={1} />);
      
      const paso3 = screen.getByText("Paso 3");
      expect(paso3).toHaveClass("text-gray-400");
    });

    it("muestra número en pasos no completados", () => {
      render(<Stepper steps={mockSteps} currentStep={1} />);
      
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });
});
