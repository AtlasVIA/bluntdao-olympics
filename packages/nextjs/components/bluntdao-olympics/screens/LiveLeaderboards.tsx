"use client";

import React, { useEffect, useState } from "react";
import { LeaderboardTable } from "../common";
import { motion } from "framer-motion";

const mockLiveData = [
  { rank: 1, participant: "John Doe", event: "3-Point Contest", score: 28 },
  { rank: 2, participant: "Jane Smith", event: "Muay Thai & Toke Off", score: 9.5 },
  { rank: 3, participant: "Mike Johnson", event: "Skateboarding", score: 95 },
  { rank: 4, participant: "Sarah Williams", event: "Half-Court Shots", score: 5 },
  { rank: 5, participant: "Tom Brown", event: "Highest Ollie", score: 1.2 },
];

const LiveLeaderboards: React.FC = () => {
  const [liveData, setLiveData] = useState(mockLiveData);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live updates by randomly changing scores
      const updatedData = liveData.map(item => ({
        ...item,
        score: item.score + (Math.random() - 0.5) * 2,
      }));
      setLiveData(updatedData.sort((a, b) => b.score - a.score).map((item, index) => ({ ...item, rank: index + 1 })));
    }, 5000);

    return () => clearInterval(interval);
  }, [liveData]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Live Leaderboards</h1>
      <LeaderboardTable data={liveData} columns={["Rank", "Participant", "Event", "Score"]} />
    </motion.div>
  );
};

export default LiveLeaderboards;
