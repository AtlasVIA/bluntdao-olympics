"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import type { Column, Tab } from "../common";
import { FaClock, FaFire, FaLeaf } from "react-icons/fa";

const tabs: Tab[] = [
  { key: "daily", label: "Daily Stats" },
  { key: "weekly", label: "Weekly Stats" },
  { key: "monthly", label: "Monthly Stats" },
];

const columns: Column[] = [
  { key: "time", header: "Time" },
  { key: "amount", header: "Amount (g)" },
  { key: "method", header: "Method" },
  {
    key: "change",
    header: "Change",
    render: (value: number) => (
      <span className={value > 0 ? "text-green-500" : "text-red-500"}>
        {value > 0 ? "+" : ""}
        {value}%
      </span>
    ),
  },
];

const mockData = {
  stats: {
    totalConsumption: "420g",
    averagePerDay: "42g",
    topMethod: "Blunts",
  },
  details: [
    { time: "Morning", amount: 120, method: "Joints", change: 5 },
    { time: "Afternoon", amount: 150, method: "Blunts", change: -2 },
    { time: "Evening", amount: 180, method: "Bongs", change: 8 },
  ],
};

const ConsumptionStats: React.FC = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [isLoading] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading consumption stats..." />;
  }

  return (
    <PageContainer
      title="Consumption Stats"
      description="Track consumption statistics across all Blunt Olympics events"
    >
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataCard title="Total Consumption" value={mockData.stats.totalConsumption} icon={<FaLeaf />} />
          <DataCard title="Average Per Day" value={mockData.stats.averagePerDay} icon={<FaClock />} />
          <DataCard title="Top Method" value={mockData.stats.topMethod} icon={<FaFire />} />
        </div>

        <DataTable columns={columns} data={mockData.details} className="mt-6" />
      </div>
    </PageContainer>
  );
};

export default ConsumptionStats;
