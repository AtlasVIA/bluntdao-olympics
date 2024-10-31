"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading...", className = "" }) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-8 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-12 h-12 border-4 border-weed-primary border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-weed-primary text-lg">{message}</p>
    </motion.div>
  );
};

export default LoadingState;
