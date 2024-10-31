"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import type { Column, Tab } from "../common";
import { FaFire, FaMedal, FaTrophy } from "react-icons/fa";

const tabs: Tab[] = [
  { key: "all", label: "All Activities" },
  { key: "competitive", label: "Competitive Events" },
  { key: "recreational", label: "Recreational Events" },
];

const columns: Column[] = [
  { key: "rank", header: "Rank" },
  { key: "event", header: "Event" },
  {
    key: "performance",
    header: "Performance",
    render: (value: string | number) => <span className="font-medium text-weed-primary">{value}</span>,
  },
  { key: "participant", header: "Participant" },
];

const mockData = {
  stats: {
    totalParticipants: "156",
    averageScore: "8.7/10",
    topEvent: "3-Point Contest",
  },
  activities: [
    { rank: 1, event: "3-Point Contest", performance: "28 points", participant: "John Doe" },
    { rank: 2, event: "Half-Court Shots", performance: "5 shots", participant: "Jane Smith" },
    { rank: 3, event: "Muay Thai & Toke Off", performance: "9.5/10", participant: "Mike Johnson" },
    { rank: 4, event: "Skateboarding Tricks", performance: "95 points", participant: "Sarah Williams" },
    { rank: 5, event: "Highest Ollie", performance: "1.2m", participant: "Tom Brown" },
  ],
};

const ActivityData: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading activity data..." />;
  }

  return (
    <PageContainer
      title="Activity Data"
      description="Detailed performance data from various Blunt Olympics events and competitions"
    >
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataCard title="Total Participants" value={mockData.stats.totalParticipants} icon={<FaTrophy />} />
          <DataCard title="Average Score" value={mockData.stats.averageScore} icon={<FaMedal />} />
          <DataCard title="Most Popular Event" value={mockData.stats.topEvent} icon={<FaFire />} />
        </div>

        <DataTable columns={columns} data={mockData.activities} className="mt-6" />
      </div>
    </PageContainer>
  );
};

export default ActivityData;
