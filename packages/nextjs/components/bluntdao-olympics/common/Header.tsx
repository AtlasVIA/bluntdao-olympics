"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          BluntDAO Olympics
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex space-x-4">
            {menuItems.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gray-300 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="lg:hidden mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col space-y-2">
              {menuItems.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors"
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
