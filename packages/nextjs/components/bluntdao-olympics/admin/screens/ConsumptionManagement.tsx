"use client";

import React, { useState } from "react";
import { Column, DataTable, LoadingState } from "../../common";
import { mockConsumptionStats, mockTopStrains } from "../../mockData";
import { CONSUMPTION_METHOD, ConsumptionStats, Strain } from "../../types";

interface ConsumptionRecord extends Record<string, unknown> {
  id: string;
  participantAddress: string;
  strain: string;
  method: number;
  amount: number;
  timestamp: bigint;
}

type ConsumptionColumn = Column<ConsumptionRecord, keyof ConsumptionRecord>;

export const ConsumptionManagement = () => {
  const [consumptionStats] = useState<ConsumptionStats>(mockConsumptionStats);
  const [topStrains] = useState<Strain[]>(mockTopStrains);
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ConsumptionRecord | null>(null);
  const [consumptionRecords, setConsumptionRecords] = useState<ConsumptionRecord[]>([
    {
      id: "1",
      participantAddress: "0x1234567890123456789012345678901234567890",
      strain: "OG Kush",
      method: CONSUMPTION_METHOD.JOINT,
      amount: 1.5,
      timestamp: BigInt(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      participantAddress: "0x2345678901234567890123456789012345678901",
      strain: "Blue Dream",
      method: CONSUMPTION_METHOD.BONG,
      amount: 2.0,
      timestamp: BigInt(Date.now() - 12 * 60 * 60 * 1000),
    },
  ]);

  const columns: ConsumptionColumn[] = [
    {
      header: "Participant",
      accessor: "participantAddress",
      render: value => {
        const address = value as string;
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
      },
    },
    {
      header: "Strain",
      accessor: "strain",
    },
    {
      header: "Method",
      accessor: "method",
      render: value => {
        const method = value as number;
        switch (method) {
          case CONSUMPTION_METHOD.JOINT:
            return "Joint";
          case CONSUMPTION_METHOD.BONG:
            return "Bong";
          case CONSUMPTION_METHOD.PIPE:
            return "Pipe";
          case CONSUMPTION_METHOD.VAPORIZER:
            return "Vaporizer";
          default:
            return "Other";
        }
      },
    },
    {
      header: "Amount (g)",
      accessor: "amount",
    },
    {
      header: "Timestamp",
      accessor: "timestamp",
      render: value => new Date(Number(value as bigint)).toLocaleString(),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button onClick={() => setEditingRecord(record)} className="btn btn-sm btn-primary">
            Edit
          </button>
          <button onClick={() => handleDelete(record.id)} className="btn btn-sm btn-error">
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    setLoading(true);
    try {
      // In a real app, you would make an API call here
      setConsumptionRecords(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Failed to delete record:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const newRecord: ConsumptionRecord = {
        id: editingRecord?.id || Math.random().toString(36).slice(2),
        participantAddress: formData.get("participantAddress") as string,
        strain: formData.get("strain") as string,
        method: Number(formData.get("method")),
        amount: Number(formData.get("amount")),
        timestamp: BigInt(new Date(formData.get("timestamp") as string).getTime()),
      };

      if (editingRecord) {
        // Update existing record
        setConsumptionRecords(prev => prev.map(r => (r.id === editingRecord.id ? newRecord : r)));
      } else {
        // Add new record
        setConsumptionRecords(prev => [...prev, newRecord]);
      }
      setEditingRecord(null);
    } catch (error) {
      console.error("Failed to save record:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Consumption Management</h2>
        {!editingRecord && (
          <button onClick={() => setEditingRecord({} as ConsumptionRecord)} className="btn btn-primary">
            Add Record
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Total Consumption</div>
          <div className="stat-value">{consumptionStats.totalGrams}g</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Favorite Strain</div>
          <div className="stat-value text-lg">{consumptionStats.favoriteStrain}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Favorite Method</div>
          <div className="stat-value text-lg">
            {Object.entries(CONSUMPTION_METHOD).find(([, value]) => value === consumptionStats.favoriteMethod)?.[0]}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Event Count</div>
          <div className="stat-value">{consumptionStats.eventCount}</div>
        </div>
      </div>

      {editingRecord !== null && (
        <form onSubmit={handleSubmit} className="bg-base-300 p-4 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">{editingRecord.id ? "Edit" : "Add"} Consumption Record</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Participant Address</span>
              </label>
              <input
                type="text"
                name="participantAddress"
                defaultValue={editingRecord.participantAddress}
                required
                pattern="^0x[a-fA-F0-9]{40}$"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Strain</span>
              </label>
              <select name="strain" defaultValue={editingRecord.strain} className="select select-bordered" required>
                <option value="">Select a strain</option>
                {topStrains.map(strain => (
                  <option key={strain.name} value={strain.name}>
                    {strain.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Method</span>
              </label>
              <select name="method" defaultValue={editingRecord.method} className="select select-bordered" required>
                {Object.entries(CONSUMPTION_METHOD).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount (grams)</span>
              </label>
              <input
                type="number"
                name="amount"
                defaultValue={editingRecord.amount}
                required
                min="0"
                step="0.1"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Timestamp</span>
              </label>
              <input
                type="datetime-local"
                name="timestamp"
                defaultValue={
                  editingRecord.timestamp
                    ? new Date(Number(editingRecord.timestamp)).toISOString().slice(0, 16)
                    : new Date().toISOString().slice(0, 16)
                }
                required
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setEditingRecord(null)} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      )}

      <DataTable data={consumptionRecords} columns={columns} />
    </div>
  );
};
