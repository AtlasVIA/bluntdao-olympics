"use client";

import React from "react";
import { LeaderboardTable } from "../common";
import { motion } from "framer-motion";

const mockCountryData = [
  { rank: 1, country: "Blazeland", points: 1000, goldMedals: 10, silverMedals: 5, bronzeMedals: 3 },
  { rank: 2, country: "Tokeville", points: 950, goldMedals: 8, silverMedals: 7, bronzeMedals: 6 },
  { rank: 3, country: "Ganjapolis", points: 900, goldMedals: 7, silverMedals: 8, bronzeMedals: 9 },
  { rank: 4, country: "Hempshire", points: 850, goldMedals: 6, silverMedals: 6, bronzeMedals: 7 },
  { rank: 5, country: "Weedington", points: 800, goldMedals: 5, silverMedals: 9, bronzeMedals: 4 },
];

const CountryLeaderboard: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Country Leaderboard</h1>
      <LeaderboardTable data={mockCountryData} columns={["Rank", "Country", "Points", "Gold", "Silver", "Bronze"]} />
    </motion.div>
  );
};

export default CountryLeaderboard;
