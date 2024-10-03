"use client";

import React from "react";
import { LeaderboardTable } from "../common";
import { motion } from "framer-motion";

const mockPopularActivities = [
  { rank: 1, activity: "DIY Bong Crafting", participants: 150 },
  { rank: 2, activity: "Gravity Bong Jump Rope", participants: 120 },
  { rank: 3, activity: "Joint Rolling Competition", participants: 100 },
  { rank: 4, activity: "Cannabis Trivia", participants: 80 },
  { rank: 5, activity: "Munchies Eating Contest", participants: 75 },
];

const PopularActivities: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Most Popular Sesh Activities</h1>
      <LeaderboardTable data={mockPopularActivities} columns={["Rank", "Activity", "Participants"]} />
    </motion.div>
  );
};

export default PopularActivities;
