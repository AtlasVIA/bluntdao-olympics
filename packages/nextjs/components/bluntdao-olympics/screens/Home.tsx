"use client";

import React from "react";
import { LoadingState, PageContainer, StatCard } from "../common";
import { useEvents, useParticipants } from "../hooks";
import { EVENT_STATUS } from "../types";
import { useAccount } from "wagmi";

export const Home: React.FC = () => {
  const { isConnected } = useAccount();
  const { events, isLoading: eventsLoading } = useEvents();
  const { participants, isLoading: participantsLoading } = useParticipants();

  const isLoading = eventsLoading || participantsLoading;

  if (isLoading) {
    return <LoadingState message="Loading data..." />;
  }

  const totalParticipants = participants?.length || 0;
  const totalEvents = events?.length || 0;
  const activeEvents = events?.filter(e => e.status === EVENT_STATUS.IN_PROGRESS).length || 0;

  return (
    <PageContainer
      title="Welcome to Blunt Olympics"
      description="The premier competitive cannabis consumption platform"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Participants" stat={totalParticipants.toString()} description="Athletes competing" />
          <StatCard title="Total Events" stat={totalEvents.toString()} description="Competitions held" />
          <StatCard title="Active Events" stat={activeEvents.toString()} description="Currently running" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">🎯 Getting Started</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Connect your wallet to participate</li>
                <li>Join ongoing events</li>
                <li>Track your progress on leaderboards</li>
                <li>Earn medals and recognition</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">🌟 Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Real-time leaderboards</li>
                <li>Multiple event categories</li>
                <li>Achievement tracking</li>
                <li>Community rankings</li>
              </ul>
            </div>
          </div>
        </div>

        {!isConnected && (
          <div className="text-center p-6 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Compete?</h2>
            <p className="text-lg mb-6">Connect your wallet to join the Blunt Olympics!</p>
            <button className="btn btn-primary">Connect Wallet</button>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
