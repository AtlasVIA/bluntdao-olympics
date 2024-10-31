"use client";

import React, { Suspense, useState } from "react";
import { PageContainer, TabButton } from "../common";
import MedalTally from "../screens/MedalTally";
import CountryLeaderboard from "./CountryLeaderboard";
import LiveLeaderboards from "./LiveLeaderboards";
import ParticipantStats from "./ParticipantStats";
import TopParticipants from "./TopParticipants";
import { motion } from "framer-motion";

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("country");

  const tabs = [
    { id: "country", label: "Country Leaderboard", component: CountryLeaderboard },
    { id: "participants", label: "Participant Stats", component: ParticipantStats },
    { id: "top", label: "Top Participants", component: TopParticipants },
    { id: "live", label: "Live Leaderboards", component: LiveLeaderboards },
    { id: "medal", label: "Medal Tally", component: MedalTally },
  ];

  return (
    <PageContainer
      title="Blunt Olympics Leaderboard"
      description="Explore various leaderboards and statistics from the Blunt Olympics. Use the tabs below to navigate between different views."
    >
      <div className="mb-6 flex flex-wrap">
        {tabs.map(tab => (
          <TabButton key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </TabButton>
        ))}
      </div>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--primary-green))]"></div>
            </div>
          }
        >
          {React.createElement(tabs.find(tab => tab.id === activeTab)?.component || (() => null))}
        </Suspense>
      </motion.div>
    </PageContainer>
  );
};

export default Leaderboard;
