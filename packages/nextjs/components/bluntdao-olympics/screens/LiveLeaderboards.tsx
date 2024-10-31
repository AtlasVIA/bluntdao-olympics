"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import type { Column, Tab } from "../common";
import { FaGlobe, FaTrophy, FaUsers } from "react-icons/fa";

const tabs: Tab[] = [
  { key: "overall", label: "Overall Rankings" },
  { key: "events", label: "Event Rankings" },
  { key: "teams", label: "Team Rankings" },
];

const columns: Column[] = [
  { key: "rank", header: "Rank" },
  { key: "name", header: "Name" },
  { key: "country", header: "Country" },
  {
    key: "points",
    header: "Points",
    render: (value: number) => <span className="font-bold text-weed-primary">{value}</span>,
  },
  {
    key: "trend",
    header: "Trend",
    render: (value: string) => {
      const color = value === "up" ? "text-green-500" : value === "down" ? "text-red-500" : "text-gray-500";
      const arrow = value === "up" ? "↑" : value === "down" ? "↓" : "−";
      return <span className={`${color} font-bold`}>{arrow}</span>;
    },
  },
];

const mockData = {
  stats: {
    activeParticipants: "256",
    countriesRepresented: "32",
    topScore: "2,850",
  },
  rankings: [
    { rank: 1, name: "John Doe", country: "Blazeland", points: 2850, trend: "up" },
    { rank: 2, name: "Jane Smith", country: "Tokeville", points: 2750, trend: "up" },
    { rank: 3, name: "Mike Johnson", country: "Ganjapolis", points: 2600, trend: "down" },
    { rank: 4, name: "Sarah Williams", country: "Hempshire", points: 2500, trend: "same" },
    { rank: 5, name: "Tom Brown", country: "Weedington", points: 2400, trend: "up" },
  ],
};

const LiveLeaderboards: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const [isLoading] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading live leaderboards..." />;
  }

  return (
    <PageContainer title="Live Leaderboards" description="Real-time rankings and standings from the Blunt Olympics">
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataCard title="Active Participants" value={mockData.stats.activeParticipants} icon={<FaUsers />} />
          <DataCard title="Countries" value={mockData.stats.countriesRepresented} icon={<FaGlobe />} />
          <DataCard title="Top Score" value={mockData.stats.topScore} icon={<FaTrophy />} />
        </div>

        <DataTable columns={columns} data={mockData.rankings} className="mt-6" />
      </div>
    </PageContainer>
  );
};

export default LiveLeaderboards;
