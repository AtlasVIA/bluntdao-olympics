"use client";

import React, { Suspense, useState } from "react";
import MedalTally from "../screens/MedalTally";
import CountryLeaderboard from "./CountryLeaderboard";
import LiveLeaderboards from "./LiveLeaderboards";
import ParticipantStats from "./ParticipantStats";
import TopParticipants from "./TopParticipants";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-green-600">BluntDAO Olympics Leaderboard</h1>
      <p className="text-gray-600 mb-6">
        Explore various leaderboards and statistics from the BluntDAO Olympics. Use the tabs below to navigate between
        different views.
      </p>
      <div className="mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-6 py-3 mr-2 rounded-t-lg font-semibold transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
          {React.createElement(tabs.find(tab => tab.id === activeTab)?.component || (() => null))}
        </Suspense>
      </div>
    </div>
  );
};

export default Leaderboard;
