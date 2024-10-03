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
      color: "bg-blue-500",
    },
    {
      href: "/country-leaderboard",
      title: "Country Leaderboard",
      description: "See which countries are leading in the Olympics",
      color: "bg-green-500",
    },
    {
      href: "/participant-stats",
      title: "Participant Stats",
      description: "Check out individual athlete performances",
      color: "bg-purple-500",
    },
    {
      href: "/consumption-stats",
      title: "Consumption Stats",
      description: "View statistics on cannabis consumption during the events",
      color: "bg-red-500",
    },
    {
      href: "/activity-data",
      title: "Activity Data",
      description: "Explore detailed data for each competition",
      color: "bg-yellow-500",
    },
    {
      href: "/top-participants",
      title: "Top Participants",
      description: "See the best performers across all events",
      color: "bg-pink-500",
    },
    {
      href: "/popular-activities",
      title: "Popular Activities",
      description: "Discover the most engaging sesh activities",
      color: "bg-indigo-500",
    },
    {
      href: "/live-leaderboards",
      title: "Live Leaderboards",
      description: "Get real-time updates on event standings",
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-shadow bluntdao-gradient text-white p-4 rounded-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to BluntDAO Olympics
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={card.href} className={`card ${card.color} text-white hover-lift`}>
              <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
              <p>{card.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
