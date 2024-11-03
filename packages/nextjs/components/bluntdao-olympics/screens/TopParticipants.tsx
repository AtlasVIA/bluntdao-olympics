"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import type { Column } from "../common/DataTable";
import { useParticipants } from "../hooks";
import type { Participant, Tab } from "../types";
import { FaMedal, FaStar, FaTrophy } from "react-icons/fa";

interface ParticipantRow extends Record<string, unknown> {
  rank: number;
  name: string;
  score: number;
  events: number;
  medals: number;
}

const tabs: Tab[] = [
  { id: "overall", label: "Overall Rankings" },
  { id: "weekly", label: "Weekly Stars" },
  { id: "monthly", label: "Monthly Champions" },
];

const columns: Array<Column<ParticipantRow>> = [
  { header: "Rank", accessor: "rank" },
  { header: "Name", accessor: "name" },
  {
    header: "Score",
    accessor: "score",
    render: value => <span className="font-bold text-weed-primary">{value as number}</span>,
  },
  { header: "Events", accessor: "events" },
  {
    header: "Medals",
    accessor: "medals",
    render: value => (
      <div className="flex items-center gap-1">
        <FaMedal className="text-yellow-500" />
        <span>{value as number}</span>
      </div>
    ),
  },
];

const calculateStats = (participants: Participant[]) => [
  {
    id: "total-participants",
    label: "Total Participants",
    value: participants.length,
    icon: <FaTrophy />,
  },
  {
    id: "avg-events",
    label: "Average Events",
    value: Math.round(participants.reduce((acc, p) => acc + p.totalEvents, 0) / participants.length),
    icon: <FaStar />,
  },
  {
    id: "total-medals",
    label: "Total Medals",
    value: participants.reduce((acc, p) => acc + p.goldMedals + p.silverMedals + p.bronzeMedals, 0),
    icon: <FaMedal />,
  },
];

const TopParticipants: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const { participants, isLoading, error } = useParticipants();

  if (isLoading) {
    return <LoadingState message="Loading top participants..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading participant data: {error.message}</div>;
  }

  if (!participants) {
    return <div>No participants found.</div>;
  }

  const stats = calculateStats(participants);

  const participantRows: ParticipantRow[] = participants.map((p, index) => ({
    rank: index + 1,
    name: p.name,
    score: p.goldMedals * 3 + p.silverMedals * 2 + p.bronzeMedals,
    events: p.totalEvents,
    medals: p.goldMedals + p.silverMedals + p.bronzeMedals,
  }));

  return (
    <PageContainer title="Top Participants" description="Celebrating our highest achieving participants">
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(stat => (
            <DataCard key={stat.id} title={stat.label} value={stat.value} icon={stat.icon} />
          ))}
        </div>

        <DataTable columns={columns} data={participantRows} className="mt-6" />
      </div>
    </PageContainer>
  );
};

export default TopParticipants;
