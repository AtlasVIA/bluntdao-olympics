"use client";

import React from "react";
import { LeaderboardTable } from "../common";
import { motion } from "framer-motion";

const mockMedalData = [
  { rank: 1, country: "Blazeland", gold: 10, silver: 5, bronze: 3, total: 18 },
  { rank: 2, country: "Tokeville", gold: 8, silver: 7, bronze: 6, total: 21 },
  { rank: 3, country: "Ganjapolis", gold: 7, silver: 8, bronze: 9, total: 24 },
  { rank: 4, country: "Hempshire", gold: 6, silver: 6, bronze: 7, total: 19 },
  { rank: 5, country: "Weedington", gold: 5, silver: 9, bronze: 4, total: 18 },
];

const MedalTally: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Medal Tally</h1>
      <LeaderboardTable data={mockMedalData} columns={["Rank", "Country", "Gold", "Silver", "Bronze", "Total"]} />
    </motion.div>
  );
};

export default MedalTally;
