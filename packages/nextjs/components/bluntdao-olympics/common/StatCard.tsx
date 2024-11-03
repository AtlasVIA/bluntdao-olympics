import React from "react";

interface StatCardProps {
  title: string;
  stat: string;
  description?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, stat, description, className = "" }) => {
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
      <div className="card-body">
        <h2 className="card-title text-sm dark:text-white">{title}</h2>
        <p className="text-3xl font-bold dark:text-white">{stat}</p>
        {description && <p className="text-sm opacity-70 dark:text-white">{description}</p>}
      </div>
    </div>
  );
};
