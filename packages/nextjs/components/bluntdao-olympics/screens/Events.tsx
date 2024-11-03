"use client";

import React from "react";
import { DataTable, PageContainer, StatCard } from "../common";
import { useEvents } from "../hooks";
import { EVENT_STATUS, type Event, type EventStatus } from "../types";
import { useAccount } from "wagmi";

type EventColumn = {
  header: string;
  accessor: keyof Event;
  render?: (value: Event[keyof Event], row: Event) => React.ReactNode;
};

const columns: EventColumn[] = [
  {
    header: "Event Name",
    accessor: "name",
  },
  {
    header: "Status",
    accessor: "status",
    render: value => {
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
    accessor: "description",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    render: value => {
      const time = value as bigint;
      return new Date(Number(time) * 1000).toLocaleString();
    },
  },
  {
    header: "End Time",
    accessor: "endTime",
    render: value => {
      const time = value as bigint;
      return new Date(Number(time) * 1000).toLocaleString();
    },
  },
];

export const Events: React.FC = () => {
  const { isConnected } = useAccount();
  const { events, isLoading } = useEvents();

  if (isLoading) {
    return (
      <PageContainer title="Loading" description="Loading events data">
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </PageContainer>
    );
  }

  const activeEvents = events?.filter(e => e.status === EVENT_STATUS.IN_PROGRESS) || [];
  const completedEvents = events?.filter(e => e.status === EVENT_STATUS.COMPLETED) || [];
  const upcomingEvents = events?.filter(e => e.status === EVENT_STATUS.UPCOMING) || [];

  return (
    <PageContainer title="Blunt Olympics Events" description="Track all competitions and events in the Blunt Olympics">
      <div className="space-y-8">
        {/* Events Overview */}
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
            <p className="text-lg">Connect your wallet to participate in events and track your progress.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
