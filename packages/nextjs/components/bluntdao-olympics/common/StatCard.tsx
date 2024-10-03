"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  children: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, children }) => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </motion.div>
  );
};

export default StatCard;
