"use client";

import React, { useEffect, useState } from "react";
import { PageContainer, StatCard } from "../common";
import { motion } from "framer-motion";

interface ParticipantData {
  name: string;
  country: string;
  eventsParticipated: number;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
  personalBests: string[];
  awards: string[];
}

const mockParticipantData: ParticipantData = {
  name: "Bob Marley",
  country: "Blazeland",
  eventsParticipated: 5,
  medals: { gold: 2, silver: 1, bronze: 1 },
  personalBests: ["Highest Ollie: 2.5m", "3-Point Contest: 28 points"],
  awards: ["MVP - Skateboarding", "Best Play - Basketball"],
};

const ParticipantStats: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [participantData, setParticipantData] = useState<ParticipantData | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setParticipantData(mockParticipantData);
      setLoading(false);
    }, 1000);
  }, []);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <PageContainer
      title="Participant Stats"
      description="Detailed statistics and achievements of Blunt Olympics participants."
    >
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--primary-green))]"></div>
        </div>
      ) : !participantData ? (
        <div className="card text-center py-8">
          <p className="text-xl text-weed-secondary">No participant data available</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div variants={itemVariants}>
            <StatCard title="Personal Info">
              <div className="space-y-2 text-weed-secondary">
                <p>
                  <strong className="text-weed-primary">Name:</strong> {participantData.name}
                </p>
                <p>
                  <strong className="text-weed-primary">Country:</strong> {participantData.country}
                </p>
                <p>
                  <strong className="text-weed-primary">Events Participated:</strong>{" "}
                  {participantData.eventsParticipated}
                </p>
              </div>
            </StatCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard title="Medals">
              <div className="space-y-2 text-weed-secondary">
                <p>
                  <strong className="text-weed-primary">Gold:</strong> {participantData.medals.gold}
                </p>
                <p>
                  <strong className="text-weed-primary">Silver:</strong> {participantData.medals.silver}
                </p>
                <p>
                  <strong className="text-weed-primary">Bronze:</strong> {participantData.medals.bronze}
                </p>
              </div>
            </StatCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard title="Personal Bests">
              <ul className="space-y-2 text-weed-secondary">
                {participantData.personalBests.map((best, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-weed-primary">•</span>
                    {best}
                  </li>
                ))}
              </ul>
            </StatCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard title="Awards">
              <ul className="space-y-2 text-weed-secondary">
                {participantData.awards.map((award, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-weed-primary">•</span>
                    {award}
                  </li>
                ))}
              </ul>
            </StatCard>
          </motion.div>
        </motion.div>
      )}
    </PageContainer>
  );
};

export default ParticipantStats;
