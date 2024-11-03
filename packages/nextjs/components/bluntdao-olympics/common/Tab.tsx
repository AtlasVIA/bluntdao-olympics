import { ReactNode } from "react";

interface TabProps {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const Tab = ({ children, isActive, onClick }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"
      }`}
    >
      {children}
    </button>
  );
};
