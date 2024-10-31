"use client";

import React from "react";
import { LeaderboardTable, PageContainer } from "../common";
import { motion } from "framer-motion";

const mockTopParticipants = [
  { rank: 1, name: "John Doe", totalMedals: 5, topPerformance: "Gold in 3-Point Contest" },
  { rank: 2, name: "Jane Smith", totalMedals: 4, topPerformance: "Gold in Muay Thai & Toke Off" },
  { rank: 3, name: "Mike Johnson", totalMedals: 3, topPerformance: "Silver in Skateboarding" },
  { rank: 4, name: "Sarah Williams", totalMedals: 3, topPerformance: "Bronze in Half-Court Shots" },
  { rank: 5, name: "Tom Brown", totalMedals: 2, topPerformance: "Gold in Highest Ollie" },
];

const TopParticipants: React.FC = () => {
  return (
    <PageContainer
      title="Top Participants"
      description="Meet the leading athletes of the Blunt Olympics, ranked by their medal count and outstanding performances."
    >
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LeaderboardTable data={mockTopParticipants} columns={["Rank", "Name", "Total Medals", "Top Performance"]} />
      </motion.div>
    </PageContainer>
  );
};

export default TopParticipants;
