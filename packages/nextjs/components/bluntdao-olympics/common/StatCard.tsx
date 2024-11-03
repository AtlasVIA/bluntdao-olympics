"use client";

import React from "react";
import { motion } from "framer-motion";

export interface StatCardProps {
  title: string;
  stat: string;
  description: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, stat, description, className = "" }) => {
  return (
    <motion.div
      className={`card bg-base-200 shadow-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-body">
        <h2 className="card-title text-lg">{title}</h2>
        <p className="text-4xl font-bold">{stat}</p>
        <p className="text-base-content/70 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};
