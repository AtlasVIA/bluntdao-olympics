"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import type { Column, Tab } from "../common";
import { FaFlag, FaMedal, FaTrophy } from "react-icons/fa";

const tabs: Tab[] = [
  { key: "overall", label: "Overall Rankings" },
  { key: "medals", label: "Medal Count" },
  { key: "participants", label: "Participants" },
];

const columns: Column[] = [
  { key: "rank", header: "Rank" },
  { key: "country", header: "Country" },
  {
    key: "points",
    header: "Points",
    render: (value: number) => <span className="font-bold text-weed-primary">{value}</span>,
  },
  {
    key: "medals",
    header: "Total Medals",
    render: (value: number) => <span className="font-medium text-yellow-500">{value}</span>,
  },
  { key: "participants", header: "Participants" },
];

const mockData = {
  stats: {
    totalCountries: "32",
    topCountry: "Blazeland",
    totalParticipants: "1,024",
  },
  countries: [
    { rank: 1, country: "Blazeland", points: 2850, medals: 15, participants: 64 },
    { rank: 2, country: "Tokeville", points: 2750, medals: 12, participants: 58 },
    { rank: 3, country: "Ganjapolis", points: 2600, medals: 10, participants: 52 },
    { rank: 4, country: "Hempshire", points: 2500, medals: 8, participants: 48 },
    { rank: 5, country: "Weedington", points: 2400, medals: 7, participants: 44 },
  ],
};

const CountryLeaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const [isLoading] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading country rankings..." />;
  }

  return (
    <PageContainer
      title="Country Leaderboard"
      description="Track the performance of participating countries in the Blunt Olympics"
    >
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataCard title="Participating Countries" value={mockData.stats.totalCountries} icon={<FaFlag />} />
          <DataCard title="Leading Country" value={mockData.stats.topCountry} icon={<FaTrophy />} />
          <DataCard title="Total Participants" value={mockData.stats.totalParticipants} icon={<FaMedal />} />
        </div>

        <DataTable columns={columns} data={mockData.countries} className="mt-6" />
      </div>
    </PageContainer>
  );
};

export default CountryLeaderboard;
