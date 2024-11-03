import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, variant = "default", padding = "md", className = "" }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "outlined":
        return "bg-base-100 border border-base-200 hover:border-primary/20";
      case "elevated":
        return "bg-base-100 shadow-xl hover:shadow-2xl";
      default:
        return "bg-base-100 shadow-lg hover:shadow-xl";
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case "none":
        return "p-0";
      case "sm":
        return "p-4";
      case "lg":
        return "p-8";
      default:
        return "p-6";
    }
  };

  return (
    <div
      className={`
        rounded-xl transition-all duration-200
        ${getVariantClasses()}
        ${getPaddingClasses()}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
