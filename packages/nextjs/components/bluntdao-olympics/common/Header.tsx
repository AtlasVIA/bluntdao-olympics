"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SwitchTheme } from "../../SwitchTheme";
import { AnimatePresence, motion } from "framer-motion";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/medal-tally", label: "Medal Tally" },
    { href: "/country-leaderboard", label: "Country Leaderboard" },
    { href: "/participant-stats", label: "Participant Stats" },
    { href: "/consumption-stats", label: "Consumption Stats" },
    { href: "/activity-data", label: "Activity Data" },
    { href: "/top-participants", label: "Top Participants" },
    { href: "/popular-activities", label: "Popular Activities" },
    { href: "/live-leaderboards", label: "Live Leaderboards" },
  ];

  return (
    <header className="bg-weed-dark dark:bg-weed-light text-weed-light dark:text-weed-dark p-4 sticky top-0 z-50 shadow-md border-b-2 border-[rgb(var(--accent-green))]">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-weed-primary hover:text-weed-secondary transition-colors flex items-center"
        >
          <span className="mr-2">🍁</span>
          BluntDAO Olympics
        </Link>
        <div className="flex items-center">
          <nav className="hidden md:block mr-4">
            <ul className="flex flex-wrap justify-end space-x-2">
              {menuItems.map(item => (
                <li key={item.href} className="my-1">
                  <Link
                    href={item.href}
                    className="hover:text-weed-primary transition-colors py-2 px-3 rounded hover:bg-[rgba(var(--primary-green),0.1)] text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <SwitchTheme className="mr-4" />
          <button
            className="md:hidden text-weed-primary"
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
            className="md:hidden mt-4 bg-weed-dark dark:bg-weed-light rounded-lg shadow-lg border border-[rgba(var(--accent-green),0.5)]"
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
                    className="block py-2 px-4 hover:bg-[rgba(var(--primary-green),0.1)] hover:text-weed-primary rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
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
