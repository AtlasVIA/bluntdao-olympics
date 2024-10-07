"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SwitchTheme } from "../../SwitchTheme";
import { AnimatePresence, motion } from "framer-motion";
import { FaChartBar, FaFire, FaHome, FaMedal, FaRunning, FaTrophy } from "react-icons/fa";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/medal-tally", label: "Medal Tally", icon: FaMedal },
    { href: "/leaderboard", label: "Leaderboard", icon: FaTrophy },
    { href: "/consumption-stats", label: "Consumption Stats", icon: FaChartBar },
    { href: "/activity-data", label: "Activity Data", icon: FaRunning },
    { href: "/popular-activities", label: "Popular Activities", icon: FaFire },
  ];

  return (
    <header className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 p-6 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-green-600 dark:text-green-300 hover:text-green-700 dark:hover:text-green-200 transition-colors flex items-center"
        >
          <span className="mr-2">🍁</span>
          BluntDAO Olympics
        </Link>
        <div className="flex items-center">
          <nav className="hidden lg:block mr-4">
            <ul className="flex flex-wrap justify-end space-x-2">
              {menuItems.map(item => (
                <li key={item.href} className="my-1">
                  <Link
                    href={item.href}
                    className="flex items-center hover:bg-green-300 dark:hover:bg-green-700 transition-colors py-2 px-3 rounded text-sm"
                  >
                    <item.icon className="mr-2 text-lg" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <SwitchTheme className="mr-4" />
          <button
            className="lg:hidden text-green-600 dark:text-green-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="lg:hidden mt-4 bg-green-100 dark:bg-green-900 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col space-y-2 p-4">
              {menuItems.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center py-2 px-4 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="mr-3 text-xl" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
