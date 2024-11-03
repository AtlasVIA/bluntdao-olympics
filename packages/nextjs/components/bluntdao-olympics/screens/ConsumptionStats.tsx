"use client";

import { LoadingState, PageContainer, StatCard } from "../common";
import { useConsumption } from "../hooks";
import ParticipantStats from "../leaderboard/ParticipantStats";
import { CONSUMPTION_METHOD, type ConsumptionMethod } from "../types";
import { useAccount } from "wagmi";

export const ConsumptionStats = () => {
  const { isConnected } = useAccount();
  const { topStrains, methodDistribution, globalStats, isLoading, error } = useConsumption();

  if (isLoading) {
    return (
      <PageContainer title="Loading" description="Loading consumption statistics">
        <LoadingState message="Loading consumption data..." />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Error" description="Failed to load consumption statistics">
        <div className="text-error text-center p-8">Error loading consumption data: {error.message}</div>
      </PageContainer>
    );
  }

  const getMostPopularMethod = (): string => {
    if (!methodDistribution) return "N/A";
    const entries = Object.entries(methodDistribution);
    if (entries.length === 0) return "N/A";

    const [methodKey] = entries.sort(([, a], [, b]) => b - a)[0];
    const methodName = Object.entries(CONSUMPTION_METHOD).find(([, value]) => value === parseInt(methodKey))?.[0];

    return methodName?.toLowerCase() || "N/A";
  };

  return (
    <PageContainer
      title="Consumption Statistics"
      description="Detailed breakdown of consumption methods and preferences"
    >
      <div className="space-y-8">
        {/* Participant Stats */}
        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🏆 Participant Rankings</h2>
          <ParticipantStats />
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Consumption"
            stat={`${globalStats?.totalGrams || 0}g`}
            description="Across all events"
          />
          <StatCard title="Most Popular Method" stat={getMostPopularMethod()} description="Based on usage frequency" />
          <StatCard
            title="Top Strain"
            stat={topStrains?.[0]?.name || "N/A"}
            description={`Used ${topStrains?.[0]?.usageCount || 0} times`}
          />
        </div>

        {/* Consumption Methods */}
        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🔥 Consumption Methods</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(methodDistribution || {}).map(([methodKey, percentage]) => {
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

        {/* Top Strains */}
        <div className="bg-base-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🌿 Popular Strains</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(topStrains || []).map((strain, index) => (
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

        {!isConnected && (
          <div className="text-center mt-8 p-6 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Track Your Consumption!</h2>
            <p className="text-lg">Connect your wallet to see your personal consumption statistics and preferences.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
