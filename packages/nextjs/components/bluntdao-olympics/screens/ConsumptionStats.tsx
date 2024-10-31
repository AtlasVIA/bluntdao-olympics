"use client";

import React from "react";
import { PageContainer, StatCard } from "../common";
import { motion } from "framer-motion";

const mockConsumptionData = {
  totalBlunts: 1000,
  totalJoints: 1500,
  totalSpliffs: 750,
  bowlsCleared: 2000,
  averagePerParticipant: 5.5,
};

const ConsumptionStats: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageContainer
      title="Consumption Stats"
      description="Track the consumption statistics across all Blunt Olympics events and participants."
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatCard title="Total Blunts Smoked">
            <p className="text-3xl font-bold text-weed-primary">{mockConsumptionData.totalBlunts}</p>
          </StatCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard title="Total Joints Smoked">
            <p className="text-3xl font-bold text-weed-primary">{mockConsumptionData.totalJoints}</p>
          </StatCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard title="Total Spliffs Smoked">
            <p className="text-3xl font-bold text-weed-primary">{mockConsumptionData.totalSpliffs}</p>
          </StatCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard title="Bowls Cleared">
            <p className="text-3xl font-bold text-weed-primary">{mockConsumptionData.bowlsCleared}</p>
          </StatCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard title="Average Per Participant">
            <p className="text-3xl font-bold text-weed-primary">{mockConsumptionData.averagePerParticipant}</p>
          </StatCard>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default ConsumptionStats;
