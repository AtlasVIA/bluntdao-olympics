"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import { useParticipants } from "../hooks";
import { type Tab } from "../types";
import { FaMedal, FaStopwatch, FaTrophy } from "react-icons/fa";

interface ParticipantStatsData extends Record<string, unknown> {
  participantAddress: string;
  name: string;
  isJudge: boolean;
  totalEvents: number;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  createdAt: bigint;
  score: number;
  medals: number;
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "achievements", label: "Achievements" },
  { id: "history", label: "Event History" },
];

type ParticipantColumn = {
  header: string;
  accessor: keyof ParticipantStatsData;
  render?: (value: ParticipantStatsData[keyof ParticipantStatsData], row: ParticipantStatsData) => React.ReactNode;
};

const columns: ParticipantColumn[] = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Events",
    accessor: "totalEvents",
  },
  {
    header: "Score",
    accessor: "score",
    render: value => <span className="font-medium text-primary">{value as number}</span>,
  },
  {
    header: "Medals",
    accessor: "medals",
    render: value => <span className="font-bold text-yellow-500">{value as number}</span>,
  },
];

export const ParticipantStats: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { participants, isLoading, error } = useParticipants();

  if (isLoading) {
    return <LoadingState message="Loading participant stats..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading participant data: {error.message}</div>;
  }

  const stats = [
    {
      id: "1",
      title: "Total Events",
      label: "Total Events Completed",
      value: participants?.reduce((sum, p) => sum + p.totalEvents, 0) || 0,
    },
    {
      id: "2",
      title: "Average Score",
      label: "Average Participant Score",
      value: participants?.length
        ? Math.round(
            participants.reduce((sum, p) => sum + (p.goldMedals * 3 + p.silverMedals * 2 + p.bronzeMedals), 0) /
              participants.length,
          )
        : 0,
    },
    {
      id: "3",
      title: "Total Medals",
      label: "Total Medals Awarded",
      value: participants?.reduce((sum, p) => sum + p.goldMedals + p.silverMedals + p.bronzeMedals, 0) || 0,
    },
  ];

  const participantStats: ParticipantStatsData[] = (participants || []).map(p => ({
    ...p,
    score: p.goldMedals * 3 + p.silverMedals * 2 + p.bronzeMedals,
    medals: p.goldMedals + p.silverMedals + p.bronzeMedals,
  }));

  return (
    <PageContainer title="Participant Stats" description="Track individual participant performance and achievements">
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(stat => (
            <DataCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={
                stat.label.includes("Total Events") ? (
                  <FaStopwatch />
                ) : stat.label.includes("Average") ? (
                  <FaTrophy />
                ) : (
                  <FaMedal />
                )
              }
            />
          ))}
        </div>

        <DataTable<ParticipantStatsData> columns={columns} data={participantStats} className="mt-6" />
      </div>
    </PageContainer>
  );
};
