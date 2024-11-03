"use client";

import { DataTable, PageContainer } from "../../common";
import type { Column } from "../../common/DataTable";
import { CONSUMPTION_METHOD, type ConsumptionMethod } from "../../types";

interface ConsumptionRecord extends Record<string, unknown> {
  id: string;
  method: ConsumptionMethod;
  strain: string;
  amount: number;
  participant: string;
  event: string;
  timestamp: string;
}

export const ConsumptionManagement = () => {
  const mockData: ConsumptionRecord[] = [
    {
      id: "1",
      method: CONSUMPTION_METHOD.JOINT,
      strain: "OG Kush",
      amount: 1.5,
      participant: "John Doe",
      event: "420 Games",
      timestamp: new Date().toISOString(),
    },
    // Add more mock data as needed
  ];

  const columns: Array<Column<ConsumptionRecord>> = [
    {
      header: "Method",
      accessor: "method",
      render: value => {
        const methodName = Object.entries(CONSUMPTION_METHOD)
          .find(([, v]) => v === value)?.[0]
          ?.toLowerCase();
        return <span className="capitalize">{methodName}</span>;
      },
    },
    {
      header: "Strain",
      accessor: "strain",
      render: value => <span className="capitalize">{value as string}</span>,
    },
    {
      header: "Amount (g)",
      accessor: "amount",
      render: value => (value as number).toFixed(2),
    },
    {
      header: "Participant",
      accessor: "participant",
    },
    {
      header: "Event",
      accessor: "event",
    },
    {
      header: "Timestamp",
      accessor: "timestamp",
      render: value => new Date(value as string).toLocaleString(),
    },
  ];

  return (
    <PageContainer title="Consumption Management" description="Track and manage consumption records">
      <div className="space-y-8">
        <DataTable data={mockData} columns={columns} />
      </div>
    </PageContainer>
  );
};
