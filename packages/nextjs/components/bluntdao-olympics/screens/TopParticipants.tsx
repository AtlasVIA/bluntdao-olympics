"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import type { Column, Tab } from "../common";
import { FaMedal, FaStar, FaTrophy } from "react-icons/fa";

const tabs: Tab[] = [
  { key: "overall", label: "Overall Rankings" },
  { key: "weekly", label: "Weekly Stars" },
  { key: "monthly", label: "Monthly Champions" },
];

const columns: Column[] = [
  { key: "rank", header: "Rank" },
  { key: "participant", header: "Participant" },
  {
    key: "score",
    header: "Score",
    render: (value: number) => <span className="font-bold text-weed-primary">{value}</span>,
  },
  { key: "events", header: "Events" },
  {
    key: "medals",
    header: "Medals",
    render: (value: number) => (
      <div className="flex items-center gap-1">
        <FaMedal className="text-yellow-500" />
        <span>{value}</span>
      </div>
    ),
  },
];

const mockData = {
  stats: {
    totalParticipants: "256",
    topScore: "2,850",
    totalMedals: "45",
  },
  participants: [
    { rank: 1, participant: "John Doe", score: 2850, events: 12, medals: 5 },
    { rank: 2, participant: "Jane Smith", score: 2750, events: 10, medals: 4 },
    { rank: 3, participant: "Mike Johnson", score: 2600, events: 11, medals: 3 },
    { rank: 4, participant: "Sarah Williams", score: 2500, events: 9, medals: 3 },
    { rank: 5, participant: "Tom Brown", score: 2400, events: 8, medals: 2 },
  ],
};

const TopParticipants: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const [isLoading] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading top participants..." />;
  }

  return (
    <PageContainer
      title="Top Participants"
      description="Celebrating our highest achieving participants in the Blunt Olympics"
    >
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataCard title="Total Participants" value={mockData.stats.totalParticipants} icon={<FaTrophy />} />
          <DataCard title="Highest Score" value={mockData.stats.topScore} icon={<FaStar />} />
          <DataCard title="Medals Awarded" value={mockData.stats.totalMedals} icon={<FaMedal />} />
        </div>

        <DataTable columns={columns} data={mockData.participants} className="mt-6" />
      </div>
    </PageContainer>
  );
};

export default TopParticipants;
