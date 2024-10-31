"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SwitchTheme } from "./SwitchTheme";
import { RainbowKitCustomConnectButton } from "./scaffold-eth/RainbowKitCustomConnectButton";
import { AnimatePresence, motion } from "framer-motion";
import { FaChartBar, FaFire, FaHome, FaMedal, FaRunning, FaTrophy } from "react-icons/fa";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/medal-tally", label: "Medal Tally", icon: FaMedal },
    { href: "/leaderboard", label: "Leaderboard", icon: FaTrophy },
    { href: "/consumption-stats", label: "Consumption Stats", icon: FaChartBar },
    { href: "/activity-data", label: "Activity Data", icon: FaRunning },
    { href: "/popular-activities", label: "Activities", icon: FaFire },
    {
      href: "https://olympics.bluntdao.org",
      label: "Join on Lu.ma",
      icon: FaHome,
      external: true,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const getLinkClassName = (isMenuLink: boolean, isCurrentPage: boolean) => {
    const baseClass = "flex items-center transition-colors";
    const menuClass = isMenuLink
      ? "py-2 px-6 hover:bg-secondary"
      : "py-2 px-3 rounded-md font-medium text-sm hover:bg-secondary";
    const activeClass = isCurrentPage ? "bg-secondary" : "";
    return `${baseClass} ${menuClass} ${activeClass} text-primary-content`;
  };

  return (
    <header className="bg-primary text-primary-content sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          <Image
            src="/bluntolympicscut.png"
            alt="Blunt Olympics Logo"
            width={160}
            height={64}
            priority
            className="w-auto h-[48px]"
          />
        </Link>
        <div className="flex items-center">
          <nav className="hidden lg:block mr-8">
            <ul className="flex items-center gap-1">
              {menuItems.map(item => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:bg-secondary transition-colors py-2 px-3 rounded-md font-medium text-sm text-primary-content"
                    >
                      <item.icon className="mr-2 text-lg" />
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <Link href={item.href} className={getLinkClassName(false, isActive(item.href))}>
                      <item.icon className="mr-2 text-lg" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <RainbowKitCustomConnectButton />
            <SwitchTheme className="ml-2" />
            <button
              className="lg:hidden ml-2 p-2 hover:bg-secondary rounded-md transition-colors text-primary-content"
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
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="lg:hidden bg-primary border-t border-secondary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col py-2">
              {menuItems.map(item => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center py-2 px-6 hover:bg-secondary transition-colors text-primary-content"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="mr-3 text-xl" />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={getLinkClassName(true, isActive(item.href))}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="mr-3 text-xl" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
