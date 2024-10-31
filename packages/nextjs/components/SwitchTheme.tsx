"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const body = document.body;
    if (resolvedTheme === "dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return (
    <div className={`flex space-x-2 text-sm ${className}`}>
      <input
        id="theme-toggle"
        type="checkbox"
        className="hidden"
        checked={resolvedTheme === "dark"}
        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
      <label
        htmlFor="theme-toggle"
        className={`
          transition-colors duration-200
          cursor-pointer
          text-gray-500 hover:text-gray-600
          dark:text-gray-400 dark:hover:text-gray-300
        `}
      >
        {resolvedTheme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
      </label>
    </div>
  );
};
