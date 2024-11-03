"use client";

import React from "react";
import { PageContainer, StatCard } from "../../components/bluntdao-olympics/common";
import { useEvents, useParticipants } from "../../components/bluntdao-olympics/hooks";
import { EVENT_STATUS } from "../../components/bluntdao-olympics/types";
import { useAccount } from "wagmi";

const HomeView: React.FC = () => {
  const { isConnected } = useAccount();
  const { events, isLoading: eventsLoading } = useEvents();
  const { participants, isLoading: participantsLoading } = useParticipants();

  const isLoading = eventsLoading || participantsLoading;

  if (isLoading) {
    return (
      <PageContainer title="Loading..." description="Please wait while we fetch the data">
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </PageContainer>
    );
  }

  const totalParticipants = participants?.length || 0;
  const totalEvents = events?.length || 0;
  const activeEvents = events?.filter(e => e.status === EVENT_STATUS.IN_PROGRESS).length || 0;

  return (
    <PageContainer
      title="🏆 Blunt Olympics"
      description="Welcome to the premier competitive cannabis consumption platform!"
    >
      <div className="space-y-8">
        <div className="hero bg-base-200 rounded-lg p-8">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold mb-4">🏆 Blunt Olympics</h1>
              <p className="text-xl mb-6">Welcome to the premier competitive cannabis consumption platform!</p>
              {!isConnected && <button className="btn btn-primary">Connect Wallet to Participate</button>}
            </div>
          </div>
        </div>

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
      </div>
    </PageContainer>
  );
};

export default HomeView;
