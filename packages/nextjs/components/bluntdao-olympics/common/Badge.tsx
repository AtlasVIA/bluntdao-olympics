import React from "react";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, variant = "primary", size = "md", className = "" }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "secondary":
        return "bg-secondary/10 text-secondary";
      case "success":
        return "bg-success/10 text-success";
      case "warning":
        return "bg-warning/10 text-warning";
      case "error":
        return "bg-error/10 text-error";
      case "info":
        return "bg-info/10 text-info";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-0.5 text-xs";
      case "md":
        return "px-3 py-1 text-sm";
      case "lg":
        return "px-4 py-1.5 text-base";
      default:
        return "px-3 py-1 text-sm";
    }
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-medium rounded-full
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
    >
      {label}
    </span>
  );
};

export default Badge;
