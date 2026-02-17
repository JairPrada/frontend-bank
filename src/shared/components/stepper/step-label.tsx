import React from "react";
import type { Step } from "./stepper.types";

interface StepLabelProps {
  step: Step;
  isActive: boolean;
  isCompleted: boolean;
  orientation: "horizontal" | "vertical";
}

export const StepLabel: React.FC<StepLabelProps> = ({
  step,
  isActive,
  isCompleted,
  orientation,
}) => {
  const textColor = isActive
    ? "text-emerald-600"
    : isCompleted
      ? "text-gray-800"
      : "text-gray-400";

  if (orientation === "vertical") {
    return (
      <div>
        <p className={`text-sm font-medium transition-colors duration-300 ${textColor}`}>
          {step.label}
        </p>
        {step.description && (
          <p className="text-xs text-gray-400 mt-0.5">{step.description}</p>
        )}
      </div>
    );
  }

  return (
    <>
      <p
        className={`mt-2 text-xs font-medium text-center transition-colors duration-300 ${textColor}`}
      >
        {step.label}
      </p>
      {step.description && (
        <p className="text-xs text-gray-400 text-center mt-0.5 max-w-25">
          {step.description}
        </p>
      )}
    </>
  );
};
