"use client";

import { LoadingState, PageContainer, StatCard } from "../common";
import { useConsumption, useEvents, useParticipants } from "../hooks";
import { EVENT_STATUS, type Event } from "../types";
import { useAccount } from "wagmi";

export const Home = () => {
  const { address, isConnected } = useAccount();
  const { participants, isLoading: participantsLoading, error: participantsError } = useParticipants();
  const { events, isLoading: eventsLoading, error: eventsError } = useEvents();
  const { globalStats, topStrains, isLoading: consumptionLoading, error: consumptionError } = useConsumption();

  const isLoading = participantsLoading || eventsLoading || consumptionLoading;
  const error = participantsError || eventsError || consumptionError;

  if (isLoading) {
    return (
      <PageContainer title="Loading" description="Loading data">
        <LoadingState message="Loading Blunt Olympics data..." />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Error" description="Failed to load data">
        <div className="text-error text-center p-8">Error loading data: {error.message}</div>
      </PageContainer>
    );
  }

  const userStats =
    isConnected && address && participants
      ? participants.find(p => p.participantAddress.toLowerCase() === address.toLowerCase())
      : null;

  const upcomingEvents = events
    ?.filter((e: Event) => e.status === EVENT_STATUS.UPCOMING)
    .sort((a: Event, b: Event) => Number(a.startTime - b.startTime))
    .slice(0, 3);

  const activeEvents = events?.filter((e: Event) => e.status === EVENT_STATUS.IN_PROGRESS);

  const calculateTimeRemaining = (timestamp: bigint, type: "start" | "end"): string => {
    const now = BigInt(Math.floor(Date.now() / 1000));
    const diff = Number(type === "start" ? timestamp - now : timestamp - now);
    const hours = Math.floor(diff / 3600);

    if (hours < 24) {
      return `${hours} hours`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} days`;
    }
  };

  return (
    <PageContainer
      title={isConnected ? "Your Blunt Olympics Dashboard" : "Blunt Olympics Overview"}
      description="Real-time statistics from the Blunt Olympics"
    >
      <div className="space-y-8">
        {/* Active Events Section */}
        {activeEvents && activeEvents.length > 0 && (
          <div className="bg-base-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🔥 Live Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeEvents.map((event: Event) => (
                <div key={event.eventId} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-primary">{event.name}</h3>
                    <p className="text-sm">{event.description}</p>
                    <p className="text-sm opacity-70">Ends in {calculateTimeRemaining(event.endTime, "end")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isConnected && userStats ? (
            <>
              <StatCard
                title="Your Events"
                stat={userStats.totalEvents.toString()}
                description="Total events participated in"
              />
              <StatCard
                title="Total Medals"
                stat={(userStats.goldMedals + userStats.silverMedals + userStats.bronzeMedals).toString()}
                description={`${userStats.goldMedals} Gold, ${userStats.silverMedals} Silver, ${userStats.bronzeMedals} Bronze`}
              />
              <StatCard
                title="Participation Rate"
                stat={`${Math.round((userStats.totalEvents / (events?.length || 1)) * 100)}%`}
                description="Events you've participated in"
              />
            </>
          ) : (
            <>
              <StatCard
                title="Total Participants"
                stat={participants?.length.toString() || "0"}
                description="Active participants"
              />
              <StatCard
                title="Total Consumption"
                stat={`${globalStats?.totalGrams || 0}g`}
                description="Across all events"
              />
              <StatCard
                title="Active Events"
                stat={(activeEvents?.length || 0).toString()}
                description="Currently running events"
              />
            </>
          )}
        </div>

        {/* Upcoming Events Section */}
        {upcomingEvents && upcomingEvents.length > 0 && (
          <div className="bg-base-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🗓️ Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event: Event) => (
                <div key={event.eventId} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-primary">{event.name}</h3>
                    <p className="text-sm">{event.description}</p>
                    <p className="text-sm opacity-70">Starts in {calculateTimeRemaining(event.startTime, "start")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Strains Section */}
        {topStrains && topStrains.length > 0 && (
          <div className="bg-base-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🌿 Top Strains</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {topStrains.map(strain => (
                <div key={strain.name} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-sm">{strain.name}</h3>
                    <p className="text-2xl font-bold">{strain.usageCount}</p>
                    <p className="text-xs opacity-70">times used</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isConnected && (
          <div className="text-center mt-8 p-6 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join the Blunt Olympics!</h2>
            <p className="text-lg">
              Connect your wallet to start participating and tracking your personal achievements.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
