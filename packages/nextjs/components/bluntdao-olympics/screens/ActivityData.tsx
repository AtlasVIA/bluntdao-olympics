"use client";

import React from "react";
import { DataTable, LoadingState, PageContainer, StatCard } from "../common";
import { useActivities } from "../hooks";
import { type Event } from "../types";

export const ActivityData: React.FC = () => {
  const { activities, isLoading, error } = useActivities();

  if (isLoading) {
    return <LoadingState message="Loading activity data..." />;
  }

  if (error) {
    return <div className="text-error text-center p-8">Error loading activities: {error.message}</div>;
  }

  const columns = [
    { header: "Activity", accessor: "name" as keyof Event },
    { header: "Type", accessor: "type" as keyof Event },
    { header: "Duration", accessor: "duration" as keyof Event },
    { header: "Points", accessor: "points" as keyof Event },
    {
      header: "Date",
      accessor: "date" as keyof Event,
      render: (value: Event[keyof Event]) => new Date(value as number).toLocaleString(),
    },
  ];

  const totalActivities = activities?.length || 0;
  const completedActivities = activities?.filter((a: Event) => a.status === 2).length || 0;
  const inProgressActivities = activities?.filter((a: Event) => a.status === 1).length || 0;

  return (
    <PageContainer title="Activity Data" description="Track all participant activities">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Activities" value={totalActivities} description="All recorded activities" />
          <StatCard title="Completed" value={completedActivities} description="Successfully finished" />
          <StatCard title="In Progress" value={inProgressActivities} description="Currently active" />
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Activity History</h2>
          <DataTable columns={columns} data={activities || []} />
        </div>
      </div>
    </PageContainer>
  );
};
