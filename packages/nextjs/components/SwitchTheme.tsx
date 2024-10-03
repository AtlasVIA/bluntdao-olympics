"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  const handleToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <button
        onClick={handleToggle}
        className={`w-12 h-6 rounded-full p-1 bg-weed-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-weed-secondary ${
          isDarkMode ? "bg-opacity-50" : "bg-opacity-100"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            isDarkMode ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <span className="ml-2">
        {isDarkMode ? (
          <MoonIcon className="h-5 w-5 text-weed-primary" />
        ) : (
          <SunIcon className="h-5 w-5 text-weed-primary" />
        )}
      </span>
    </div>
  );
};
