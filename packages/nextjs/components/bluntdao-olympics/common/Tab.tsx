import React from "react";

interface TabProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, isActive = false, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer px-6 py-4 rounded-t-lg transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-base-100 border-b-2 border-primary font-semibold text-primary"
            : "bg-base-200 hover:bg-base-300 text-base-content"
        }
        flex items-center gap-2
      `}
    >
      {label}
      {children}
    </div>
  );
};

export default Tab;
