"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Column {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  emptyMessage?: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, className = "", emptyMessage = "No data available" }) => {
  if (!data.length) {
    return <div className="text-center p-4 text-weed-secondary">{emptyMessage}</div>;
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-weed-light dark:bg-weed-dark">
            {columns.map(column => (
              <th key={column.key} className="px-4 py-2 text-left text-weed-primary font-semibold">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <motion.tr
              key={index}
              className="border-b border-weed-light dark:border-weed-dark hover:bg-weed-light/10 dark:hover:bg-weed-dark/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {columns.map(column => (
                <td key={column.key} className="px-4 py-2">
                  {column.render ? column.render(row[column.key]) : row[column.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
