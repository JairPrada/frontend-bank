import React from "react";

interface ProgressConnectorProps {
  index: number;
  isCompleted: boolean;
  isActive: boolean;
  orientation: "horizontal" | "vertical";
}

export const ProgressConnector: React.FC<ProgressConnectorProps> = ({
  index,
  isCompleted,
  isActive,
  orientation,
}) => {
  if (orientation === "vertical") {
    return (
      <div className="relative w-8 flex justify-center py-1">
        <div className="absolute w-0.5 h-6 bg-gray-100 rounded-full" />
        <div
          className={`absolute w-0.5 rounded-full transition-all duration-500 ease-out ${
            isCompleted
              ? "h-6 bg-emerald-500"
              : isActive
                ? "h-3 bg-emerald-300"
                : "h-0 bg-emerald-500"
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        />
      </div>
    );
  }

  return (
    <div className="relative flex-1 h-8 flex items-center mx-1">
      <div className="absolute w-full h-0.5 bg-gray-100 rounded-full" />
      <div
        className={`absolute h-0.5 rounded-full transition-all duration-500 ease-out ${
          isCompleted
            ? "w-full bg-emerald-500"
            : isActive
              ? "w-1/2 bg-emerald-300"
              : "w-0 bg-emerald-500"
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      />
    </div>
  );
};
