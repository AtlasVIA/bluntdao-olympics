"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import type { Column, Tab } from "../common";
import { FaMedal, FaStar, FaTrophy } from "react-icons/fa";

const tabs: Tab[] = [
  { key: "overall", label: "Overall Standings" },
  { key: "gold", label: "Gold Medals" },
  { key: "silver", label: "Silver Medals" },
  { key: "bronze", label: "Bronze Medals" },
];

const columns: Column[] = [
  { key: "rank", header: "Rank" },
  { key: "country", header: "Country" },
  {
    key: "gold",
    header: "Gold",
    render: (value: number) => <span className="font-medium text-yellow-500">{value}</span>,
  },
  {
    key: "silver",
    header: "Silver",
    render: (value: number) => <span className="font-medium text-gray-400">{value}</span>,
  },
  {
    key: "bronze",
    header: "Bronze",
    render: (value: number) => <span className="font-medium text-amber-700">{value}</span>,
  },
  {
    key: "total",
    header: "Total",
    render: (value: number) => <span className="font-bold text-weed-primary">{value}</span>,
  },
];

const mockData = {
  stats: {
    totalMedals: "100",
    leadingCountry: "Blazeland",
    goldMedals: "35",
  },
  medals: [
    { rank: 1, country: "Blazeland", gold: 10, silver: 5, bronze: 3, total: 18 },
    { rank: 2, country: "Tokeville", gold: 8, silver: 7, bronze: 6, total: 21 },
    { rank: 3, country: "Ganjapolis", gold: 7, silver: 8, bronze: 9, total: 24 },
    { rank: 4, country: "Hempshire", gold: 6, silver: 6, bronze: 7, total: 19 },
    { rank: 5, country: "Weedington", gold: 5, silver: 9, bronze: 4, total: 18 },
  ],
};

const MedalTally: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const [isLoading] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading medal tally..." />;
  }

  return (
    <PageContainer
      title="Olympics Medal Tally"
      description="Track the medal count and standings for participating countries in the Blunt Olympics"
    >
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataCard title="Total Medals" value={mockData.stats.totalMedals} icon={<FaTrophy />} />
          <DataCard title="Leading Country" value={mockData.stats.leadingCountry} icon={<FaMedal />} />
          <DataCard title="Gold Medals Awarded" value={mockData.stats.goldMedals} icon={<FaStar />} />
        </div>

        <DataTable columns={columns} data={mockData.medals} className="mt-6" />
      </div>
    </PageContainer>
  );
};

export default MedalTally;
