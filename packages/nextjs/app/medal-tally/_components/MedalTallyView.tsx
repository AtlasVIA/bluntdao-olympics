"use client";

import React from "react";
import { DataCard, LoadingState, PageContainer } from "../../../components/bluntdao-olympics/common";
import { useMedals } from "../../../components/bluntdao-olympics/hooks";
import { type Medal, type Stats } from "../../../components/bluntdao-olympics/types";

const MedalTallyView: React.FC = () => {
  const { medals, stats, isLoading, error } = useMedals();

  if (isLoading) {
    return (
      <PageContainer title="Medal Tally" description="Current medal standings across all events">
        <LoadingState message="Loading medal data..." />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Medal Tally" description="Current medal standings across all events">
        <div className="text-error text-center p-8">Error loading medal data: {error.message}</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Medal Tally" description="Current medal standings across all events">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat: Stats, index: number) => (
          <DataCard
            key={index}
            title={stat.title}
            stats={[
              { label: "Value", value: stat.value },
              ...(stat.change
                ? [
                    {
                      label: "Change",
                      value: `${stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→"} ${stat.change}%`,
                    },
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      {medals && medals.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Medal Distribution</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Gold</th>
                  <th>Silver</th>
                  <th>Bronze</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {medals.map((medal: Medal, index: number) => (
                  <tr key={index}>
                    <td>{medal.eventId}</td>
                    <td>{medal.type === 3 ? 1 : 0}</td>
                    <td>{medal.type === 2 ? 1 : 0}</td>
                    <td>{medal.type === 1 ? 1 : 0}</td>
                    <td>1</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default MedalTallyView;
