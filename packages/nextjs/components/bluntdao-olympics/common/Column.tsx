import { type ReactNode } from "react";

interface ColumnProps {
  children: ReactNode;
  className?: string;
}

export const Column = ({ children, className = "" }: ColumnProps) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};
