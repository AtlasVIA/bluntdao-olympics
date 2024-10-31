"use client";

import React from "react";
import StatCard from "./StatCard";

interface DataCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon?: React.ReactNode;
  className?: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value, change, icon, className = "" }) => {
  return (
    <StatCard title={title} className={className}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-weed-primary">{value}</div>
          {change && (
            <div className={`text-sm ${change.type === "increase" ? "text-green-500" : "text-red-500"}`}>
              {change.type === "increase" ? "↑" : "↓"} {Math.abs(change.value)}%
            </div>
          )}
        </div>
        {icon && <div className="text-weed-primary text-2xl">{icon}</div>}
      </div>
    </StatCard>
  );
};

export default DataCard;
