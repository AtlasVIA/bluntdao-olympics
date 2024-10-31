"use client";

import React, { useEffect, useState } from "react";
import { LeaderboardTable, PageContainer } from "../common";
import { motion } from "framer-motion";
import { FaCircle } from "react-icons/fa";

const mockLiveData = [
  { rank: 1, participant: "John Doe", event: "3-Point Contest", score: 28 },
  { rank: 2, participant: "Jane Smith", event: "Muay Thai & Toke Off", score: 9.5 },
  { rank: 3, participant: "Mike Johnson", event: "Skateboarding", score: 95 },
  { rank: 4, participant: "Sarah Williams", event: "Half-Court Shots", score: 5 },
  { rank: 5, participant: "Tom Brown", event: "Highest Ollie", score: 1.2 },
];

const LiveLeaderboards: React.FC = () => {
  const [liveData, setLiveData] = useState(mockLiveData);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      // Simulate live updates by randomly changing scores
      const updatedData = liveData.map(item => ({
        ...item,
        score: item.score + (Math.random() - 0.5) * 2,
      }));
      setLiveData(updatedData.sort((a, b) => b.score - a.score).map((item, index) => ({ ...item, rank: index + 1 })));
      setTimeout(() => setIsUpdating(false), 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [liveData]);

  return (
    <PageContainer
      title="Live Leaderboards"
      description="Real-time updates of ongoing  Olympics events and competitions."
    >
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2 text-sm text-weed-secondary">
          <FaCircle
            className={`h-2 w-2 ${
              isUpdating ? "text-[rgb(var(--primary-green))]" : "text-[rgb(var(--accent-green))]"
            } ${isUpdating ? "animate-pulse" : ""}`}
          />
          <span>Live Updates</span>
        </div>
      </div>

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LeaderboardTable data={liveData} columns={["Rank", "Participant", "Event", "Score"]} />
      </motion.div>
    </PageContainer>
  );
};

export default LiveLeaderboards;
