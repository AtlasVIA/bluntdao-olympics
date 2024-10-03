"use client";

import React from "react";
import { LeaderboardTable } from "../common";
import { motion } from "framer-motion";

const mockActivityData = [
  { rank: 1, event: "3-Point Contest", topScore: 28, participant: "John Doe" },
  { rank: 2, event: "Half-Court Shots", madeShots: 5, participant: "Jane Smith" },
  { rank: 3, event: "Muay Thai & Toke Off", performance: "9.5/10", participant: "Mike Johnson" },
  { rank: 4, event: "Skateboarding Tricks", score: 95, participant: "Sarah Williams" },
  { rank: 5, event: "Highest Ollie", height: "1.2m", participant: "Tom Brown" },
];

const ActivityData: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Activity Data</h1>
      <LeaderboardTable data={mockActivityData} columns={["Rank", "Event", "Top Score/Performance", "Participant"]} />
    </motion.div>
  );
};

export default ActivityData;
