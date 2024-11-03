"use client";

import React from "react";
import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: string | number;
}

export interface DataCardProps {
  title: string;
  subtitle?: string;
  stats?: Stat[];
  value?: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export const DataCard: React.FC<DataCardProps> = ({ title, subtitle, stats, value, icon, className = "" }) => {
  return (
    <motion.div
      className={`card bg-base-200 shadow-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-body">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <h2 className="card-title text-lg">{title}</h2>
            {subtitle && <p className="text-sm text-base-content/70">{subtitle}</p>}
          </div>
        </div>
        {value !== undefined && <p className="text-2xl font-bold mt-2">{value}</p>}
        {stats && stats.length > 0 && (
          <div className="space-y-2 mt-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-base-content/70">{stat.label}</span>
                <span className="font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
