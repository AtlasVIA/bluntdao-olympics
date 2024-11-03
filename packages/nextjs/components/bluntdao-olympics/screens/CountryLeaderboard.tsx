"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import { useMedals } from "../hooks";
import { type Medal, type Tab } from "../types";
import { FaFlag, FaMedal, FaTrophy } from "react-icons/fa";

interface CountryMedalData extends Record<string, unknown> {
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

const tabs: Tab[] = [
  { id: "overall", label: "Overall Rankings" },
  { id: "medals", label: "Medal Count" },
  { id: "participants", label: "Participants" },
];

type CountryColumn = {
  header: string;
  accessor: keyof CountryMedalData;
  render?: (value: CountryMedalData[keyof CountryMedalData], row: CountryMedalData) => React.ReactNode;
};

const columns: CountryColumn[] = [
  {
    header: "Country",
    accessor: "country",
  },
  {
    header: "Gold",
    accessor: "gold",
    render: value => <span className="font-medium text-yellow-500">{value as number}</span>,
  },
  {
    header: "Silver",
    accessor: "silver",
    render: value => <span className="font-medium text-gray-400">{value as number}</span>,
  },
  {
    header: "Bronze",
    accessor: "bronze",
    render: value => <span className="font-medium text-amber-700">{value as number}</span>,
  },
  {
    header: "Total",
    accessor: "total",
    render: value => <span className="font-bold text-primary">{value as number}</span>,
  },
];

export const CountryLeaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const { medals, stats, isLoading, error } = useMedals();

  if (isLoading) {
    return <LoadingState message="Loading country rankings..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading country data: {error.message}</div>;
  }

  // Group medals by country
  const countryMedals = medals.reduce((acc: Record<string, CountryMedalData>, medal: Medal) => {
    const country = "Global"; // TODO: Add country mapping
    if (!acc[country]) {
      acc[country] = {
        country,
        gold: 0,
        silver: 0,
        bronze: 0,
        total: 0,
      };
    }

    if (medal.type === 3) acc[country].gold++;
    else if (medal.type === 2) acc[country].silver++;
    else if (medal.type === 1) acc[country].bronze++;
    acc[country].total++;

    return acc;
  }, {});

  const countryData = Object.values(countryMedals);

  return (
    <PageContainer title="Country Leaderboard" description="Track the performance of participating countries">
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(stat => (
            <DataCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={
                stat.label.includes("Countries") ? (
                  <FaFlag />
                ) : stat.label.includes("Leading") ? (
                  <FaTrophy />
                ) : (
                  <FaMedal />
                )
              }
            />
          ))}
        </div>

        <DataTable<CountryMedalData> columns={columns} data={countryData} className="mt-6" />
      </div>
    </PageContainer>
  );
};
