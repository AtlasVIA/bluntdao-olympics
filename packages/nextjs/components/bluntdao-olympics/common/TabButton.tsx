"use client";

import React from "react";
import { motion } from "framer-motion";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => {
  return (
    <motion.button
      className={`px-6 py-3 mr-2 rounded-t-lg font-semibold transition-colors duration-200 ${
        active
          ? "bg-[rgb(var(--primary-green))] text-white"
          : "bg-weed-light dark:bg-weed-dark text-weed-secondary hover:bg-[rgb(var(--accent-green))] hover:text-white"
      }`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {children}
    </motion.button>
  );
};

export default TabButton;
