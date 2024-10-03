"use client";

import React, { useEffect, useState } from "react";
import { StatCard } from "../common";
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!participantData) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">No participant data available</p>
      </div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <h1 className="text-4xl font-bold mb-8 text-center">Participant Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <StatCard title="Personal Info">
            <p>
              <strong>Name:</strong> {participantData.name}
            </p>
            <p>
              <strong>Country:</strong> {participantData.country}
            </p>
            <p>
              <strong>Events Participated:</strong> {participantData.eventsParticipated}
            </p>
          </StatCard>
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Medals">
            <p>
              <strong>Gold:</strong> {participantData.medals.gold}
            </p>
            <p>
              <strong>Silver:</strong> {participantData.medals.silver}
            </p>
            <p>
              <strong>Bronze:</strong> {participantData.medals.bronze}
            </p>
          </StatCard>
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Personal Bests">
            <ul className="list-disc list-inside">
              {participantData.personalBests.map((best, index) => (
                <li key={index}>{best}</li>
              ))}
            </ul>
          </StatCard>
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Awards">
            <ul className="list-disc list-inside">
              {participantData.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </StatCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ParticipantStats;
