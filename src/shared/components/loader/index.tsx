import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  color?: "primary" | "white" | "gray";
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const colorClasses = {
  primary: "text-emerald-600",
  white: "text-white",
  gray: "text-gray-400",
};

const dotSizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  variant = "spinner",
  color = "primary",
  text,
  fullScreen = false,
}) => {
  const renderSpinner = () => (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const renderDots = () => (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSizeClasses[size]} rounded-full bg-current ${colorClasses[color]} animate-bounce`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full bg-emerald-600 animate-ping absolute`}
      />
      <div
        className={`${sizeClasses[size]} rounded-full bg-emerald-600 relative`}
      />
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return renderSpinner();
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center">
      {renderLoader()}
      {text && (
        <p className={`text-sm font-medium ${colorClasses[color]}`}>{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
