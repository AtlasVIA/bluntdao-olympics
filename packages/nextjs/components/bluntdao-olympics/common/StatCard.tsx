import React from "react";

interface StatCardProps {
  title: string;
  stat?: string;
  value?: string | number;
  description?: string;
  className?: string;
  change?: string | number;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  stat,
  value,
  description,
  className = "",
  change,
  isPositive,
  icon,
}) => {
  return (
    <div
      className={`
        p-6 rounded-xl bg-gradient-to-br from-base-100 to-base-200
        shadow-lg hover:shadow-xl transition-all duration-200
        border border-base-300 hover:border-primary/20
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-base-content/70">{title}</h3>
          <div className="text-2xl font-bold text-base-content">{stat || value}</div>
          {description && <p className="text-sm text-base-content/60">{description}</p>}
          {change && (
            <div className={`text-sm font-medium ${isPositive ? "text-success" : "text-error"}`}>
              {isPositive ? "+" : "-"}
              {change}
            </div>
          )}
        </div>
        {icon && <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;
