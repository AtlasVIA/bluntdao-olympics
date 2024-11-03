"use client";

import { PageContainer } from "../../../components/bluntdao-olympics/common";
import { Leaderboard } from "../../../components/bluntdao-olympics/leaderboard";

export const LeaderboardView = () => {
  return (
    <PageContainer title="Leaderboard" description="View competition rankings and achievements">
      <Leaderboard />
    </PageContainer>
  );
};
