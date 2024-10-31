"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import type { Column, Tab } from "../common";
import { FaMedal, FaStopwatch, FaTrophy } from "react-icons/fa";

const tabs: Tab[] = [
  { key: "overview", label: "Overview" },
  { key: "achievements", label: "Achievements" },
  { key: "history", label: "Event History" },
];

const columns: Column[] = [
  { key: "date", header: "Date" },
  { key: "event", header: "Event" },
  {
    key: "performance",
    header: "Performance",
    render: (value: string) => <span className="font-medium text-weed-primary">{value}</span>,
  },
  {
    key: "rank",
    header: "Rank",
    render: (value: number) => <span className="font-bold text-yellow-500">#{value}</span>,
  },
  { key: "points", header: "Points" },
];

const mockData = {
  stats: {
    totalEvents: "15",
    bestRank: "#1",
    totalPoints: "2,450",
  },
  history: [
    { date: "2024-02-01", event: "Blunt Rolling", performance: "Perfect Roll", rank: 1, points: 500 },
    { date: "2024-02-02", event: "Cloud Chasing", performance: "Epic Clouds", rank: 2, points: 450 },
    { date: "2024-02-03", event: "Joint Art", performance: "Masterpiece", rank: 1, points: 500 },
    { date: "2024-02-04", event: "Speed Smoking", performance: "4:20 min", rank: 3, points: 400 },
    { date: "2024-02-05", event: "Smoke Rings", performance: "Perfect O's", rank: 2, points: 450 },
  ],
};

const ParticipantStats: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading participant stats..." />;
  }

  return (
    <PageContainer title="Participant Stats" description="Track individual participant performance and achievements">
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataCard title="Events Participated" value={mockData.stats.totalEvents} icon={<FaStopwatch />} />
          <DataCard title="Best Rank" value={mockData.stats.bestRank} icon={<FaTrophy />} />
          <DataCard title="Total Points" value={mockData.stats.totalPoints} icon={<FaMedal />} />
        </div>

        <DataTable columns={columns} data={mockData.history} className="mt-6" />
      </div>
    </PageContainer>
  );
};

export default ParticipantStats;
