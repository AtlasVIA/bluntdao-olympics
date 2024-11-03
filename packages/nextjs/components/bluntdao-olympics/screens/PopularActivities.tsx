"use client";

import React, { useState } from "react";
import { DataCard, LoadingState, PageContainer, TabGroup } from "../common";
import { useActivities } from "../hooks";
import { type Stats, type Tab } from "../types";
import { FaCalendar, FaFire, FaTrophy } from "react-icons/fa";

const tabs: Tab[] = [
  { id: "trending", label: "Trending" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
];

export const PopularActivities: React.FC = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const { stats, isLoading, error } = useActivities();

  if (isLoading) {
    return <LoadingState message="Loading popular activities..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading activities: {error.message}</div>;
  }

  return (
    <PageContainer title="Popular Activities" description="Discover trending and upcoming events">
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat: Stats) => (
            <DataCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={
                stat.label.includes("Active") ? (
                  <FaFire />
                ) : stat.label.includes("Total") ? (
                  <FaTrophy />
                ) : (
                  <FaCalendar />
                )
              }
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
