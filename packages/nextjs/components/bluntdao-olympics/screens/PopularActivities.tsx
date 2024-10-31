"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import type { Column, Tab } from "../common";
import { FaFire, FaStar, FaUsers } from "react-icons/fa";

const tabs: Tab[] = [
  { key: "all", label: "All Activities" },
  { key: "trending", label: "Trending" },
  { key: "upcoming", label: "Upcoming" },
];

const columns: Column[] = [
  { key: "rank", header: "Rank" },
  { key: "activity", header: "Activity" },
  {
    key: "participants",
    header: "Participants",
    render: (value: number) => <span className="font-medium text-weed-primary">{value}</span>,
  },
  {
    key: "rating",
    header: "Rating",
    render: (value: number) => (
      <div className="flex items-center">
        <FaStar className="text-yellow-500 mr-1" />
        <span>{value.toFixed(1)}</span>
      </div>
    ),
  },
  { key: "category", header: "Category" },
];

const mockData = {
  stats: {
    totalActivities: "24",
    mostPopular: "Blunt Rolling",
    avgParticipants: "45",
  },
  activities: [
    { rank: 1, activity: "Blunt Rolling", participants: 120, rating: 4.8, category: "Skills" },
    { rank: 2, activity: "Cloud Chasing", participants: 95, rating: 4.6, category: "Competition" },
    { rank: 3, activity: "Joint Art", participants: 85, rating: 4.7, category: "Creative" },
    { rank: 4, activity: "Speed Smoking", participants: 75, rating: 4.3, category: "Competition" },
    { rank: 5, activity: "Smoke Rings", participants: 70, rating: 4.5, category: "Skills" },
  ],
};

const PopularActivities: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading popular activities..." />;
  }

  return (
    <PageContainer
      title="Popular Activities"
      description="Discover the most popular and trending activities in the Blunt Olympics"
    >
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataCard title="Total Activities" value={mockData.stats.totalActivities} icon={<FaFire />} />
          <DataCard title="Most Popular" value={mockData.stats.mostPopular} icon={<FaStar />} />
          <DataCard title="Avg. Participants" value={mockData.stats.avgParticipants} icon={<FaUsers />} />
        </div>

        <DataTable columns={columns} data={mockData.activities} className="mt-6" />
      </div>
    </PageContainer>
  );
};

export default PopularActivities;
