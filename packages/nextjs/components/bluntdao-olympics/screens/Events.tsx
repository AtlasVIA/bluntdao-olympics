"use client";

import React from "react";
import { DataTable, LoadingState, PageContainer, StatCard } from "../common";
import { useEvents } from "../hooks";
import { EVENT_STATUS, type Event, type EventStatus } from "../types";
import { useAccount } from "wagmi";

export const Events: React.FC = () => {
  const { isConnected } = useAccount();
  const { events, isLoading, error } = useEvents();

  if (isLoading) {
    return <LoadingState message="Loading events..." />;
  }

  if (error) {
    return <div className="text-error text-center p-8">Error loading events: {error.message}</div>;
  }

  const activeEvents = events?.filter((e: Event) => e.status === EVENT_STATUS.IN_PROGRESS) || [];
  const completedEvents = events?.filter((e: Event) => e.status === EVENT_STATUS.COMPLETED) || [];
  const upcomingEvents = events?.filter((e: Event) => e.status === EVENT_STATUS.UPCOMING) || [];

  const getStatusDisplay = (status: EventStatus) => {
    const statusMap = {
      [EVENT_STATUS.IN_PROGRESS]: { text: "IN PROGRESS", class: "text-success" },
      [EVENT_STATUS.COMPLETED]: { text: "COMPLETED", class: "text-info" },
      [EVENT_STATUS.UPCOMING]: { text: "UPCOMING", class: "text-warning" },
      [EVENT_STATUS.CANCELLED]: { text: "CANCELLED", class: "text-error" },
    };
    return statusMap[status] || { text: "UNKNOWN", class: "text-base-content" };
  };

  const columns = [
    { header: "Event Name", accessor: "name" as keyof Event },
    {
      header: "Status",
      accessor: "status" as keyof Event,
      render: (value: Event[keyof Event]) => {
        const status = getStatusDisplay(value as EventStatus);
        return <span className={status.class}>{status.text}</span>;
      },
    },
    { header: "Description", accessor: "description" as keyof Event },
    {
      header: "Start Date",
      accessor: "startTime" as keyof Event,
      render: (value: Event[keyof Event]) => new Date(Number(value)).toLocaleString(),
    },
    {
      header: "End Date",
      accessor: "endTime" as keyof Event,
      render: (value: Event[keyof Event]) => new Date(Number(value)).toLocaleString(),
    },
  ];

  return (
    <PageContainer title="Events" description="Current and upcoming events">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Active Events" value={activeEvents.length} description="Currently in progress" />
          <StatCard title="Completed Events" value={completedEvents.length} description="Successfully finished" />
          <StatCard title="Upcoming Events" value={upcomingEvents.length} description="Scheduled to start" />
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Event List</h2>
          <DataTable columns={columns} data={events || []} />
        </div>

        {!isConnected && (
          <div className="text-center mt-8 p-6 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join the Events!</h2>
            <p className="text-lg">Connect your wallet to participate in events.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
