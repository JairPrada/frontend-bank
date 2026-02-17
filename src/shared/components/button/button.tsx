import React from "react";

const Button = ({
  children,
  variant,
  className = "",
}: {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}) => {
  const baseClasses = "px-8 py-1 rounded-full";
  const variantClasses =
    variant === "secondary"
      ? "bg-gray-100 text-emerald-800 shadow-md hover:bg-gray-200 cursor-pointer"
      : "bg-emerald-800 text-white shadow-md hover:bg-emerald-900 cursor-pointer";

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
