import React from "react";

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
}

const Column: React.FC<ColumnProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        flex flex-col gap-6 w-full
        sm:gap-8 md:gap-10
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Column;
