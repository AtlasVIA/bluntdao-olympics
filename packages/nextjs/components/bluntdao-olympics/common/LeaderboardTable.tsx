"use client";

import React from "react";
import { motion } from "framer-motion";

interface LeaderboardTableProps {
  data: any[];
  columns: string[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data, columns }) => {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <motion.table className="min-w-full bg-white" variants={tableVariants} initial="hidden" animate="visible">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {columns.map((column, index) => (
              <th key={index} className="py-3 px-6 text-left">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((row, rowIndex) => (
            <motion.tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-100" variants={rowVariants}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-3 px-6 text-left whitespace-nowrap">
                  {row[column.toLowerCase()]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default LeaderboardTable;
