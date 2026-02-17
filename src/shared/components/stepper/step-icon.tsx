import React from "react";
import { CheckIcon } from "@/shared/components/icons";
import type { Step } from "./stepper.types";

interface StepIconProps {
  step: Step;
  index: number;
  isCompleted: boolean;
  isActive: boolean;
  isClickable: boolean;
  onClick: () => void;
}

export const StepIcon: React.FC<StepIconProps> = ({
  step,
  index,
  isCompleted,
  isActive,
  isClickable,
  onClick,
}) => {
  const clickableClasses = isClickable ? "cursor-pointer hover:scale-110" : "";

  const stateClasses = isCompleted
    ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
    : isActive
      ? "bg-white text-emerald-600 ring-2 ring-emerald-500 shadow-md shadow-emerald-500/20"
      : "bg-white text-gray-400 border border-gray-200";

  return (
    <div
      className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center font-medium text-xs transition-all duration-300 ${clickableClasses} ${stateClasses}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {isCompleted ? (
        <CheckIcon className="w-4 h-4 animate-scale-in" />
      ) : (
        <span className={isActive ? "animate-pulse-subtle" : ""}>{step.id}</span>
      )}
    </div>
  );
};
