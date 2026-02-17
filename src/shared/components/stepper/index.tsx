import React from "react";
import type { StepperProps } from "./stepper.types";
import { StepIcon } from "./step-icon";
import { StepLabel } from "./step-label";
import { ProgressConnector } from "./progress-connector";

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = "horizontal",
  onStepClick,
  allowClickOnCompleted = false,
}) => {
  const isStepCompleted = (stepId: number) => stepId < currentStep;
  const isStepActive = (stepId: number) => stepId === currentStep;
  const isStepClickable = (stepId: number) =>
    allowClickOnCompleted && isStepCompleted(stepId);

  const handleStepClick = (stepId: number) => {
    if (isStepClickable(stepId) && onStepClick) {
      onStepClick(stepId);
    }
  };

  if (orientation === "vertical") {
    return (
      <div className="flex flex-col">
        {steps.map((step, index) => {
          const completed = isStepCompleted(step.id);
          const active = isStepActive(step.id);
          const nextCompleted = isStepCompleted(step.id + 1);
          const nextActive = step.id + 1 === currentStep;

          return (
            <div
              key={step.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <StepIcon
                  step={step}
                  index={index}
                  isCompleted={completed}
                  isActive={active}
                  isClickable={isStepClickable(step.id)}
                  onClick={() => handleStepClick(step.id)}
                />
                <StepLabel
                  step={step}
                  isActive={active}
                  isCompleted={completed}
                  orientation="vertical"
                />
              </div>
              {index < steps.length - 1 && (
                <ProgressConnector
                  index={index}
                  isCompleted={nextCompleted}
                  isActive={nextActive}
                  orientation="vertical"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-start w-full">
      {steps.map((step, index) => {
        const completed = isStepCompleted(step.id);
        const active = isStepActive(step.id);
        const nextCompleted = isStepCompleted(step.id + 1);
        const nextActive = step.id + 1 === currentStep;

        return (
          <React.Fragment key={step.id}>
            <div
              className="flex flex-col items-center animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <StepIcon
                step={step}
                index={index}
                isCompleted={completed}
                isActive={active}
                isClickable={isStepClickable(step.id)}
                onClick={() => handleStepClick(step.id)}
              />
              <StepLabel
                step={step}
                isActive={active}
                isCompleted={completed}
                orientation="horizontal"
              />
            </div>
            {index < steps.length - 1 && (
              <ProgressConnector
                index={index}
                isCompleted={nextCompleted}
                isActive={nextActive}
                orientation="horizontal"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
export type { Step, StepperProps } from "./stepper.types";
