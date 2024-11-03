import React from "react";
import { type Tab } from "../types";

interface TabGroupProps {
  children?: React.ReactNode;
  className?: string;
  tabs?: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const TabGroup: React.FC<TabGroupProps> = ({ children, className = "", tabs, activeTab, onTabChange }) => {
  if (tabs) {
    return (
      <div className={`flex gap-2 p-1 rounded-xl bg-base-100 ${className}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id ? "bg-primary text-primary-content" : "hover:bg-base-200"
            }`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return <div className={`flex gap-2 p-1 rounded-xl bg-base-100 ${className}`}>{children}</div>;
};

export default TabGroup;
