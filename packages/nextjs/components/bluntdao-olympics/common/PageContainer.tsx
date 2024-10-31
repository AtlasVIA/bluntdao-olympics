"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, title, description }) => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-4 text-center text-shadow text-weed-primary dark:text-weed-light p-4 rounded-lg bg-weed-light dark:bg-weed-dark border-2 border-weed"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>

      {description && (
        <motion.p
          className="text-weed-secondary dark:text-weed-light text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageContainer;
