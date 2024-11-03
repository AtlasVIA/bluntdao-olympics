"use client";

import React from "react";
import { PageContainer } from "../../../components/bluntdao-olympics/common";
import CountryLeaderboard from "../../../components/bluntdao-olympics/leaderboard/CountryLeaderboard";
import LiveLeaderboards from "../../../components/bluntdao-olympics/leaderboard/LiveLeaderboards";
import ParticipantStats from "../../../components/bluntdao-olympics/leaderboard/ParticipantStats";
import TopParticipants from "../../../components/bluntdao-olympics/leaderboard/TopParticipants";

const LeaderboardView: React.FC = () => {
  return (
    <PageContainer title="Leaderboards" description="Track rankings, medals, and achievements across all events">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LiveLeaderboards />
        <CountryLeaderboard />
        <TopParticipants />
        <ParticipantStats />
      </div>
    </PageContainer>
  );
};

export default LeaderboardView;
