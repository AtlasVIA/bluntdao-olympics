"use client";

import React from "react";
import { StatCard } from "../common";
import { motion } from "framer-motion";

const mockConsumptionData = {
  totalBlunts: 1000,
  totalJoints: 1500,
  totalSpliffs: 750,
  bowlsCleared: 2000,
  averagePerParticipant: 5.5,
};

const ConsumptionStats: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Consumption Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Blunts Smoked">
          <p className="text-3xl font-bold">{mockConsumptionData.totalBlunts}</p>
        </StatCard>
        <StatCard title="Total Joints Smoked">
          <p className="text-3xl font-bold">{mockConsumptionData.totalJoints}</p>
        </StatCard>
        <StatCard title="Total Spliffs Smoked">
          <p className="text-3xl font-bold">{mockConsumptionData.totalSpliffs}</p>
        </StatCard>
        <StatCard title="Bowls Cleared">
          <p className="text-3xl font-bold">{mockConsumptionData.bowlsCleared}</p>
        </StatCard>
        <StatCard title="Average Per Participant">
          <p className="text-3xl font-bold">{mockConsumptionData.averagePerParticipant}</p>
        </StatCard>
      </div>
    </motion.div>
  );
};

export default ConsumptionStats;
