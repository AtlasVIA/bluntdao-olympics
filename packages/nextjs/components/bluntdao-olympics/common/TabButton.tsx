import React from "react";

interface TabButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-primary text-white shadow-lg transform scale-105"
            : "bg-base-200 text-base-content hover:bg-base-300 hover:shadow-md"
        }
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
        active:transform active:scale-95
      `}
    >
      {label}
    </button>
  );
};

export default TabButton;
