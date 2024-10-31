"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, children, className = "" }) => {
  return (
    <motion.div
      className={`card hover-lift ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-weed-primary">{title}</h2>
      <div className="text-foreground">{children}</div>
    </motion.div>
  );
};

export default StatCard;
