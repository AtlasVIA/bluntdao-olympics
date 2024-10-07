"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const cards = [
    {
      href: "/medal-tally",
      title: "Medal Tally",
      description: "View the breakdown of medals by event and country",
      icon: "🏅",
    },
    {
      href: "/leaderboard",
      title: "Leaderboard",
      description: "Comprehensive leaderboards including country rankings, participant stats, and live updates",
      icon: "🏆",
    },
    {
      href: "/consumption-stats",
      title: "Consumption Stats",
      description: "View statistics on cannabis consumption during the events",
      icon: "🌿",
    },
    {
      href: "/activity-data",
      title: "Activity Data",
      description: "Explore detailed data for each competition",
      icon: "📈",
    },
    {
      href: "/popular-activities",
      title: "Popular Activities",
      description: "Discover the most engaging sesh activities",
      icon: "🎉",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-shadow text-weed-primary dark:text-weed-light p-4 rounded-lg bg-weed-light dark:bg-weed-dark border-2 border-weed"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to BluntDAO Olympics 🍁
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={card.href}
              className="card hover:bg-weed-dark dark:hover:bg-weed-light hover:text-white dark:hover:text-weed-dark transition-colors duration-300 hover-lift block"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{card.icon}</span>
                <h2 className="text-2xl font-semibold text-weed-primary dark:text-weed-light">{card.title}</h2>
              </div>
              <p className="text-weed-secondary dark:text-weed-light">{card.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
