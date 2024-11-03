"use client";

import { DataTable, LoadingState, PageContainer, StatCard } from "../common";
import { useConsumption, useEvents, useParticipants } from "../hooks";
import { CONSUMPTION_METHOD, type ConsumptionMethod, EVENT_STATUS, type Event, type Participant } from "../types";
import { useAccount } from "wagmi";

interface LeaderboardRow extends Participant {
  rank: number;
  score: number;
  latestEvent: string;
}

export const Leaderboard = () => {
  const { address, isConnected } = useAccount();
  const { participants, isLoading: participantsLoading, error: participantsError } = useParticipants();
  const { events, isLoading: eventsLoading, error: eventsError } = useEvents();
  const { stats, isLoading: consumptionLoading, error: consumptionError } = useConsumption();

  const isLoading = participantsLoading || eventsLoading || consumptionLoading;
  const error = participantsError || eventsError || consumptionError;

  if (isLoading) {
    return (
      <PageContainer title="Loading" description="Loading leaderboard data">
        <LoadingState message="Loading leaderboard data..." />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Error" description="Failed to load leaderboard data">
        <div className="text-error text-center p-8">Error loading data: {error.message}</div>
      </PageContainer>
    );
  }

  const calculateScore = (participant: Participant): number =>
    participant.goldMedals * 3 + participant.silverMedals * 2 + participant.bronzeMedals;

  const getLatestEvent = (): Event | undefined =>
    events?.filter(e => e.status === EVENT_STATUS.COMPLETED).sort((a, b) => Number(b.endTime - a.endTime))[0];

  // Sort participants by different metrics
  const byEvents = [...(participants || [])].sort((a, b) => b.totalEvents - a.totalEvents);
  const byScore = [...(participants || [])].sort((a, b) => calculateScore(b) - calculateScore(a));

  // Get user's rankings if connected
  const userRankings =
    isConnected && address
      ? {
          eventRank: byEvents.findIndex(p => p.participantAddress.toLowerCase() === address.toLowerCase()) + 1,
          scoreRank: byScore.findIndex(p => p.participantAddress.toLowerCase() === address.toLowerCase()) + 1,
        }
      : null;

  const activeEvents = events?.filter((e: Event) => e.status === EVENT_STATUS.IN_PROGRESS) || [];

  const latestEvent = getLatestEvent();
  const leaderboardData: LeaderboardRow[] = byScore.slice(0, 10).map((participant, index) => ({
    ...participant,
    rank: index + 1,
    score: calculateScore(participant),
    latestEvent: latestEvent?.name || "N/A",
  }));

  const columns = [
    {
      header: "Rank",
      accessor: "rank" as keyof LeaderboardRow,
    },
    {
      header: "Name",
      accessor: "name" as keyof LeaderboardRow,
    },
    {
      header: "Events",
      accessor: "totalEvents" as keyof LeaderboardRow,
    },
    {
      header: "Score",
      accessor: "score" as keyof LeaderboardRow,
    },
    {
      header: "Latest Event",
      accessor: "latestEvent" as keyof LeaderboardRow,
    },
  ];

  return (
    <PageContainer title="Blunt Olympics Leaderboard" description="Real-time rankings and achievements">
      <div className="space-y-8">
        {/* User Stats */}
        {isConnected && userRankings && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Your Event Rank"
              value={`#${userRankings.eventRank}`}
              description="Based on participation"
            />
            <StatCard
              title="Your Overall Rank"
              value={`#${userRankings.scoreRank}`}
              description="Based on performance"
            />
            <StatCard title="Live Events" value={activeEvents.length.toString()} description="Currently running" />
          </div>
        )}

        {/* Main Leaderboard */}
        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🏆 Top Performers</h2>
          <DataTable<LeaderboardRow> data={leaderboardData} columns={columns} />
        </div>

        {/* Consumption Stats */}
        {stats?.methodDistribution && (
          <div className="bg-base-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🔥 Most Popular Methods</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(stats.methodDistribution).map(([methodKey, percentage]) => {
                const method = parseInt(methodKey) as ConsumptionMethod;
                const methodName =
                  Object.entries(CONSUMPTION_METHOD)
                    .find(([, value]) => value === method)?.[0]
                    ?.toLowerCase() || "unknown";

                return (
                  <div key={methodKey} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h3 className="card-title text-sm capitalize">{methodName}</h3>
                      <p className="text-2xl font-bold">{percentage}%</p>
                      <p className="text-xs opacity-70">of all sessions</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Strains */}
        {stats?.topStrains && (
          <div className="bg-base-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🌿 Top Strains</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {stats.topStrains.map((strain, index) => (
                <div key={strain.name} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">#{index + 1}</span>
                      <h3 className="card-title text-sm">{strain.name}</h3>
                    </div>
                    <p className="text-2xl font-bold mt-2">{strain.usageCount}</p>
                    <p className="text-xs opacity-70">times used</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isConnected && (
          <div className="text-center mt-8 p-6 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join the Competition!</h2>
            <p className="text-lg">Connect your wallet to see your rankings and track your progress.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
