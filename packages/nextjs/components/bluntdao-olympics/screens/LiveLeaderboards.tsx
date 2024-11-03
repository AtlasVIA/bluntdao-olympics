"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import { useParticipants } from "../hooks";
import { type Tab } from "../types";
import { FaGlobe, FaTrophy, FaUsers } from "react-icons/fa";

interface LeaderboardData extends Record<string, unknown> {
  participantAddress: string;
  name: string;
  isJudge: boolean;
  totalEvents: number;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  createdAt: bigint;
  rank: number;
  score: number;
  medals: number;
}

const tabs: Tab[] = [
  { id: "overall", label: "Overall Rankings" },
  { id: "events", label: "Event Rankings" },
  { id: "teams", label: "Team Rankings" },
];

type LeaderboardColumn = {
  header: string;
  accessor: keyof LeaderboardData;
  render?: (value: LeaderboardData[keyof LeaderboardData], row: LeaderboardData) => React.ReactNode;
};

const columns: LeaderboardColumn[] = [
  {
    header: "Rank",
    accessor: "rank",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Score",
    accessor: "score",
    render: value => <span className="font-bold text-primary">{value as number}</span>,
  },
  {
    header: "Events",
    accessor: "totalEvents",
  },
  {
    header: "Medals",
    accessor: "medals",
    render: value => (
      <div className="flex items-center gap-1">
        <FaTrophy className="text-yellow-500" />
        <span>{value as number}</span>
      </div>
    ),
  },
];

export const LiveLeaderboards: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const { participants, isLoading, error } = useParticipants();

  if (isLoading) {
    return <LoadingState message="Loading live leaderboards..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading leaderboard data: {error.message}</div>;
  }

  const leaderboardData: LeaderboardData[] = (participants || [])
    .map((participant, index) => ({
      ...participant,
      rank: index + 1,
      score: participant.goldMedals * 3 + participant.silverMedals * 2 + participant.bronzeMedals,
      medals: participant.goldMedals + participant.silverMedals + participant.bronzeMedals,
    }))
    .sort((a, b) => b.score - a.score);

  const stats = [
    {
      id: "1",
      title: "Total Participants",
      label: "Total Active Participants",
      value: participants?.length || 0,
    },
    {
      id: "2",
      title: "Active Events",
      label: "Currently Running Events",
      value: "5", // TODO: Get from events data
    },
    {
      id: "3",
      title: "Total Medals",
      label: "Medals Awarded",
      value: leaderboardData.reduce((sum, p) => sum + p.medals, 0),
    },
  ];

  return (
    <PageContainer title="Live Leaderboards" description="Real-time rankings and standings from the Blunt Olympics">
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(stat => (
            <DataCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={
                stat.label.includes("Total") ? (
                  <FaUsers />
                ) : stat.label.includes("Countries") ? (
                  <FaGlobe />
                ) : (
                  <FaTrophy />
                )
              }
            />
          ))}
        </div>

        <DataTable<LeaderboardData> columns={columns} data={leaderboardData} className="mt-6" />
      </div>
    </PageContainer>
  );
};
