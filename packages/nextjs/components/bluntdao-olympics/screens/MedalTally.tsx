"use client";

import React from "react";
import { LeaderboardTable, PageContainer } from "../common";

const mockMedalData = [
  { rank: 1, country: "Blazeland", gold: 10, silver: 5, bronze: 3, total: 18 },
  { rank: 2, country: "Tokeville", gold: 8, silver: 7, bronze: 6, total: 21 },
  { rank: 3, country: "Ganjapolis", gold: 7, silver: 8, bronze: 9, total: 24 },
  { rank: 4, country: "Hempshire", gold: 6, silver: 6, bronze: 7, total: 19 },
  { rank: 5, country: "Weedington", gold: 5, silver: 9, bronze: 4, total: 18 },
];

const MedalTally = () => {
  return (
    <PageContainer
      title=" Olympics Medal Tally"
      description="Track the medal count and standings for participating countries in the Blunt Olympics."
    >
      <div className="card">
        <LeaderboardTable data={mockMedalData} columns={["Rank", "Country", "Gold", "Silver", "Bronze", "Total"]} />
      </div>
    </PageContainer>
  );
};

export default MedalTally;
