"use client";

import React from "react";
import Link from "next/link";
import { PageContainer } from "../common";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaChartBar, FaFire, FaLeaf, FaMedal, FaTrophy } from "react-icons/fa";

interface FeatureCard {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stats?: {
    value: string;
    label: string;
  };
}

const Home: React.FC = () => {
  const featureCards: FeatureCard[] = [
    {
      href: "/medal-tally",
      title: "Medal Tally",
      description: "View the breakdown of medals by event and country",
      icon: <FaMedal className="text-3xl" />,
      stats: {
        value: "156",
        label: "Medals Awarded",
      },
    },
    {
      href: "/leaderboard",
      title: "Leaderboard",
      description: "Comprehensive leaderboards including country rankings and stats",
      icon: <FaTrophy className="text-3xl" />,
      stats: {
        value: "32",
        label: "Countries",
      },
    },
    {
      href: "/consumption-stats",
      title: "Consumption Stats",
      description: "View statistics on cannabis consumption during the events",
      icon: <FaLeaf className="text-3xl" />,
      stats: {
        value: "420kg",
        label: "Total Consumption",
      },
    },
    {
      href: "/activity-data",
      title: "Activity Data",
      description: "Explore detailed data for each competition",
      icon: <FaChartBar className="text-3xl" />,
      stats: {
        value: "24",
        label: "Events",
      },
    },
    {
      href: "/popular-activities",
      title: "Activities",
      description: "Discover the most engaging sesh activities",
      icon: <FaFire className="text-3xl" />,
      stats: {
        value: "1.2K",
        label: "Participants",
      },
    },
  ];

  return (
    <PageContainer
      title="Blunt Olympics"
      description="Welcome to the Blunt Olympics - Where High Scores Meet Higher Times!"
    >
      <div className="space-y-8">
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://olympics.bluntdao.org"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg gap-2 text-xl px-8 py-4 flex items-center hover-lift"
          >
            <FaCalendarAlt className="text-2xl" />
            Join the Olympics on Lu.ma
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <div className="card hover-lift h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-weed-primary">{card.icon}</div>
                    <h2 className="text-2xl font-semibold text-weed-primary dark:text-weed-light">{card.title}</h2>
                  </div>
                  <p className="text-weed-secondary dark:text-weed-light mb-4">{card.description}</p>
                  {card.stats && (
                    <div className="mt-auto pt-4 border-t border-weed-light dark:border-weed-dark">
                      <div className="text-2xl font-bold text-weed-primary">{card.stats.value}</div>
                      <div className="text-sm text-weed-secondary">{card.stats.label}</div>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-weed-secondary dark:text-weed-light text-lg">
            Join thousands of participants from around the world in this unique celebration of community and culture.
          </p>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Home;
