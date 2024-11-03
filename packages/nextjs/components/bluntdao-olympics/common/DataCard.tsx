import React from "react";

interface DataCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value, subtitle, icon, trend, className = "" }) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-error";
      default:
        return "text-base-content";
    }
  };

  return (
    <div
      className={`
        p-6 rounded-xl bg-base-100 shadow-lg hover:shadow-xl transition-all duration-200
        border border-base-200 hover:border-primary/20
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-base-content/80">{title}</h3>
        {icon && <div className="text-primary/80">{icon}</div>}
      </div>

      <div className="flex flex-col gap-2">
        <div className={`text-3xl font-bold ${getTrendColor()}`}>{value}</div>
        {subtitle && <p className="text-sm text-base-content/60">{subtitle}</p>}
      </div>
    </div>
  );
};

export default DataCard;
