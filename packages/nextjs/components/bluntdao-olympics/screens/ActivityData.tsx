"use client";

import React from "react";
import { LeaderboardTable, PageContainer } from "../common";
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
    <PageContainer
      title="Activity Data"
      description="Detailed performance data from various Blunt Olympics events and competitions."
    >
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LeaderboardTable data={mockActivityData} columns={["Rank", "Event", "Top Score/Performance", "Participant"]} />
      </motion.div>
    </PageContainer>
  );
};

export default ActivityData;
