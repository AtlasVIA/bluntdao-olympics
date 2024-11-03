"use client";

import React, { useState } from "react";
import { DataCard, DataTable, LoadingState, PageContainer, TabGroup } from "../common";
import { useActivities } from "../hooks";
import { EVENT_STATUS, type Event, type EventStatus, type Tab } from "../types";
import { FaClock, FaFire, FaUsers } from "react-icons/fa";

const tabs: Tab[] = [
  { id: "all", label: "All Events" },
  { id: "active", label: "Active Events" },
  { id: "upcoming", label: "Upcoming Events" },
];

const getStatusDisplay = (status: EventStatus) => {
  const statusClasses: Record<EventStatus, string> = {
    [EVENT_STATUS.IN_PROGRESS]: "text-green-500",
    [EVENT_STATUS.COMPLETED]: "text-blue-500",
    [EVENT_STATUS.UPCOMING]: "text-yellow-500",
    [EVENT_STATUS.CANCELLED]: "text-red-500",
  };
  const statusText: Record<EventStatus, string> = {
    [EVENT_STATUS.IN_PROGRESS]: "IN PROGRESS",
    [EVENT_STATUS.COMPLETED]: "COMPLETED",
    [EVENT_STATUS.UPCOMING]: "UPCOMING",
    [EVENT_STATUS.CANCELLED]: "CANCELLED",
  };
  return <span className={statusClasses[status]}>{statusText[status]}</span>;
};

const getColumns = () => [
  {
    header: "Event",
    accessor: "name" as keyof Event,
  },
  {
    header: "Description",
    accessor: "description" as keyof Event,
  },
  {
    header: "Status",
    accessor: "status" as keyof Event,
    render: (value: Event[keyof Event]) => getStatusDisplay(value as EventStatus),
  },
  {
    header: "Start Time",
    accessor: "startTime" as keyof Event,
    render: (value: Event[keyof Event]) => new Date(Number(value as bigint)).toLocaleString(),
  },
];

export const PopularActivities: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { activities, stats, isLoading, error } = useActivities();

  if (isLoading) {
    return <LoadingState message="Loading events data..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading events data: {error.message}</div>;
  }

  const filteredActivities = activities.filter(activity => {
    if (activeTab === "active") return activity.status === EVENT_STATUS.IN_PROGRESS;
    if (activeTab === "upcoming") return activity.status === EVENT_STATUS.UPCOMING;
    return true;
  });

  return (
    <PageContainer title="Events" description="Discover upcoming and ongoing events in the Blunt Olympics">
      <div className="space-y-8">
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(stat => (
            <DataCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={
                stat.label.includes("Total") ? <FaFire /> : stat.label.includes("Active") ? <FaUsers /> : <FaClock />
              }
            />
          ))}
        </div>

        <DataTable<Event> columns={getColumns()} data={filteredActivities} className="mt-6" />
      </div>
    </PageContainer>
  );
};
