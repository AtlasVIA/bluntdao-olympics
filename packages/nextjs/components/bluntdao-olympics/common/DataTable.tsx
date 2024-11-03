"use client";

import React from "react";
import { motion } from "framer-motion";

export type ColumnRenderFunction<T extends Record<string, unknown>, K extends keyof T> = (
  value: T[K],
  row: T,
) => React.ReactNode;

export interface Column<T extends Record<string, unknown>, K extends keyof T = keyof T> {
  header: string;
  accessor: K;
  render?: ColumnRenderFunction<T, K>;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Array<Column<T>>;
  className?: string;
}

export const DataTable = <T extends Record<string, unknown>>({ data, columns, className = "" }: DataTableProps<T>) => {
  return (
    <motion.div
      className={`overflow-x-auto ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <table className="table w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => {
                const value = row[column.accessor];
                return (
                  <td key={colIndex}>
                    {column.render ? column.render(value as T[typeof column.accessor], row) : String(value ?? "")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DataTable;
