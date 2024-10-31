"use client";

import React from "react";
import { LeaderboardTable, PageContainer } from "../common";
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
    <PageContainer
      title="Most Popular Sesh Activities"
      description="Discover the most engaging and popular activities in the Blunt Olympics, ranked by participant count."
    >
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LeaderboardTable data={mockPopularActivities} columns={["Rank", "Activity", "Participants"]} />
      </motion.div>
    </PageContainer>
  );
};

export default PopularActivities;
