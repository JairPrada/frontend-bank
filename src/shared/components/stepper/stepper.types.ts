export interface Step {
  id: number;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  onStepClick?: (stepId: number) => void;
  allowClickOnCompleted?: boolean;
}

export type StepStatus = "completed" | "active" | "pending";
