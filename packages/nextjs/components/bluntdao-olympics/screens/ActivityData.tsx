"use client";

import React from "react";
import { DataTable, PageContainer, StatCard } from "../common";
import { useEvents } from "../hooks";
import { EVENT_STATUS, type Event, type EventStatus, fromSolidityTimestamp } from "../types";
import { useAccount } from "wagmi";

export const ActivityData = () => {
  const { isConnected } = useAccount();
  const { events, isLoading } = useEvents();

  if (isLoading) {
    return (
      <PageContainer title="Loading" description="Loading activity data">
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </PageContainer>
    );
  }

  const activeEvents = events?.filter(e => e.status === EVENT_STATUS.IN_PROGRESS) || [];
  const completedEvents = events?.filter(e => e.status === EVENT_STATUS.COMPLETED) || [];
  const upcomingEvents = events?.filter(e => e.status === EVENT_STATUS.UPCOMING) || [];

  const columns = [
    {
      header: "Event Name",
      accessor: "name" as keyof Event,
    },
    {
      header: "Status",
      accessor: "status" as keyof Event,
      render: (value: Event[keyof Event]) => {
        const status = value as EventStatus;
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
      },
    },
    {
      header: "Description",
      accessor: "description" as keyof Event,
    },
    {
      header: "Start Time",
      accessor: "startTime" as keyof Event,
      render: (value: Event[keyof Event]) => {
        const time = value as bigint;
        return fromSolidityTimestamp(time).toLocaleString();
      },
    },
    {
      header: "End Time",
      accessor: "endTime" as keyof Event,
      render: (value: Event[keyof Event]) => {
        const time = value as bigint;
        return fromSolidityTimestamp(time).toLocaleString();
      },
    },
  ];

  return (
    <PageContainer
      title="Blunt Olympics Activity Data"
      description="Track all events and competitions in the Blunt Olympics"
    >
      <div className="space-y-8">
        {/* Activity Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Active Events" stat={activeEvents.length.toString()} description="Currently in progress" />
          <StatCard
            title="Completed Events"
            stat={completedEvents.length.toString()}
            description="Successfully finished"
          />
          <StatCard title="Upcoming Events" stat={upcomingEvents.length.toString()} description="Scheduled to start" />
        </div>

        {/* Events Table */}
        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Event History</h2>
          <DataTable<Event> data={events || []} columns={columns} />
        </div>

        {!isConnected && (
          <div className="text-center mt-8 p-6 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join the Blunt Olympics!</h2>
            <p className="text-lg">Connect your wallet to participate in events and track your activities.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
