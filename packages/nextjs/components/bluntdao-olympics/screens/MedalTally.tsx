"use client";

import { PageContainer, StatCard } from "../common";
import { useEvents, useParticipants } from "../hooks";
import { EVENT_STATUS } from "../types";
import { useAccount } from "wagmi";

export const MedalTally = () => {
  const { address, isConnected } = useAccount();
  const { participants, isLoading: participantsLoading } = useParticipants();
  const { events, isLoading: eventsLoading } = useEvents();

  if (participantsLoading || eventsLoading) {
    return (
      <PageContainer title="Loading" description="Loading event results">
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </PageContainer>
    );
  }

  const userStats =
    isConnected && address && participants
      ? participants.find(p => p.participantAddress.toLowerCase() === address.toLowerCase())
      : null;

  const completedEvents = events?.filter(e => e.status === EVENT_STATUS.COMPLETED) || [];

  // Sort participants by weighted score (3 for gold, 2 for silver, 1 for bronze)
  const sortedParticipants = [...(participants || [])].sort((a, b) => {
    const scoreA = a.goldMedals * 3 + a.silverMedals * 2 + a.bronzeMedals;
    const scoreB = b.goldMedals * 3 + b.silverMedals * 2 + b.bronzeMedals;
    return scoreB - scoreA;
  });

  const topPerformers = sortedParticipants.slice(0, 5);

  // Get user's rank safely
  const userRank = address
    ? sortedParticipants.findIndex(p => p.participantAddress.toLowerCase() === address.toLowerCase()) + 1
    : 0;

  return (
    <PageContainer
      title={isConnected ? "Your Event Results" : "Event Results"}
      description="Track achievements and event completions in the Blunt Olympics"
    >
      <div className="space-y-8">
        {/* Personal Stats Section */}
        {isConnected && userStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Events Completed"
              stat={userStats.totalEvents.toString()}
              description="Total events you've participated in"
            />
            <StatCard
              title="Achievement Rate"
              stat={`${Math.round((userStats.totalEvents / (completedEvents.length || 1)) * 100)}%`}
              description="Your event completion rate"
            />
            <StatCard title="Global Rank" stat={`#${userRank}`} description="Your position among all participants" />
          </div>
        )}

        {/* Top Performers Section */}
        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🏆 Top Performers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPerformers.map((participant, index) => (
              <div key={participant.participantAddress} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">#{index + 1}</span>
                    <div>
                      <h3 className="card-title">{participant.name}</h3>
                      <p className="text-sm opacity-70">{participant.totalEvents} events completed</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-500">{participant.goldMedals}</div>
                      <div className="text-xs">1st</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-400">{participant.silverMedals}</div>
                      <div className="text-xs">2nd</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-amber-600">{participant.bronzeMedals}</div>
                      <div className="text-xs">3rd</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events Section */}
        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🎯 Recent Event Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedEvents.slice(0, 6).map(event => (
              <div key={event.eventId} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-primary">{event.name}</h3>
                  <p className="text-sm">{event.description}</p>
                  <p className="text-sm opacity-70">
                    Completed {new Date(Number(event.endTime) * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isConnected && (
          <div className="text-center mt-8 p-6 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join the Blunt Olympics!</h2>
            <p className="text-lg">Connect your wallet to track your personal achievements and event results.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
