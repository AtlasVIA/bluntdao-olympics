"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

const TabGroup: React.FC<TabGroupProps> = ({ tabs, activeTab, onTabChange, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tabs.map(tab => (
        <motion.button
          key={tab.key}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium
            transition-colors
            ${
              activeTab === tab.key
                ? "bg-weed-primary text-white"
                : "bg-weed-light dark:bg-weed-dark text-weed-primary hover:bg-weed-primary/20"
            }
          `}
          onClick={() => onTabChange(tab.key)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.icon}
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

export default TabGroup;
