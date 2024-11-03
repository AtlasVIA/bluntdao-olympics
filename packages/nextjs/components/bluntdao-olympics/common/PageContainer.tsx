"use client";

import React from "react";
import { motion } from "framer-motion";

export interface PageContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ title, description, children, className = "" }) => {
  return (
    <motion.div
      className={`container mx-auto px-4 py-8 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-base-content/70">{description}</p>
        </div>
        {children}
      </div>
    </motion.div>
  );
};
