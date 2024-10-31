"use client";

import React from "react";
import Link from "next/link";
import { PageContainer } from "../common";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

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
      title: "Activities",
      description: "Discover the most engaging sesh activities",
      icon: "🎉",
    },
  ];

  return (
    <PageContainer title="Blunt Olympics">
      <div className="flex justify-center mb-8">
        <motion.a
          href="https://olympics.bluntdao.org"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg gap-2 text-xl px-8 py-4 flex items-center hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaCalendarAlt className="text-2xl" />
          Join the Olympics on Lu.ma
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Link href={card.href} className="card hover-lift block">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{card.icon}</span>
                <h2 className="text-2xl font-semibold text-weed-primary dark:text-weed-light">{card.title}</h2>
              </div>
              <p className="text-weed-secondary dark:text-weed-light">{card.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
};

export default Home;
