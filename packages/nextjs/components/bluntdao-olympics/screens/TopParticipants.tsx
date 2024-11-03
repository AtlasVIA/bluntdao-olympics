"use client";

import React, { useState } from "react";
import { DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import { useParticipants } from "../hooks";
import { type Tab } from "../types";

export const TopParticipants: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { participants, isLoading, error } = useParticipants();

  if (isLoading) {
    return <LoadingState message="Loading top participants..." />;
  }

  if (error) {
    return <div className="text-error text-center p-8">Error loading participants: {error.message}</div>;
  }

  const tabs: Tab[] = [
    { id: "all", label: "All Time" },
    { id: "month", label: "This Month" },
    { id: "week", label: "This Week" },
  ];

  const columns = [
    {
      header: "Rank",
      accessor: "rank",
      render: (_: any, row: any) => {
        const rank = participants?.indexOf(row) + 1;
        return (
          <div className="flex items-center gap-2">
            <span className="font-bold">{rank}</span>
            {rank <= 3 && <span>{rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}</span>}
          </div>
        );
      },
    },
    {
      header: "Participant",
      accessor: "name",
    },
    {
      header: "Score",
      accessor: "score",
    },
    {
      header: "Events",
      accessor: "eventCount",
    },
    {
      header: "Medals",
      accessor: "medals",
      render: (value: any) => (
        <div className="flex items-center gap-1">
          <span>{value?.gold || 0}🥇</span>
          <span>{value?.silver || 0}🥈</span>
          <span>{value?.bronze || 0}🥉</span>
        </div>
      ),
    },
  ];

  return (
    <PageContainer title="Top Participants" description="Leading athletes in the Blunt Olympics">
      <div className="space-y-6">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="justify-center" />

        <div className="bg-base-200 p-6 rounded-lg">
          <DataTable columns={columns} data={participants || []} />
        </div>
      </div>
    </PageContainer>
  );
};
