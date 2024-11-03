"use client";

import React, { useState } from "react";
import { DataTable, LoadingState } from "../../common";
import type { Column } from "../../common/DataTable";
import { mockParticipants } from "../../mockData";
import { Participant } from "../../types";

export const ParticipantManagement = () => {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const [loading, setLoading] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);

  const columns: Array<Column<Participant>> = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Address",
      accessor: "participantAddress",
    },
    {
      header: "Is Judge",
      accessor: "isJudge",
      render: value => (value ? "Yes" : "No"),
    },
    {
      header: "Total Events",
      accessor: "totalEvents",
    },
    {
      header: "Gold Medals",
      accessor: "goldMedals",
    },
    {
      header: "Silver Medals",
      accessor: "silverMedals",
    },
    {
      header: "Bronze Medals",
      accessor: "bronzeMedals",
    },
    {
      header: "Actions",
      accessor: "participantAddress",
      render: (_, row) => (
        <div className="flex space-x-2">
          <button onClick={() => setEditingParticipant(row)} className="btn btn-sm btn-primary">
            Edit
          </button>
          <button onClick={() => handleDelete(row.participantAddress)} className="btn btn-sm btn-error">
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (participantAddress: string) => {
    if (!window.confirm("Are you sure you want to delete this participant?")) return;
    setLoading(true);
    try {
      // In a real app, you would make an API call here
      setParticipants(prev => prev.filter(p => p.participantAddress !== participantAddress));
    } catch (error) {
      console.error("Failed to delete participant:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const newParticipant: Participant = {
        participantAddress: formData.get("participantAddress") as string,
        name: formData.get("name") as string,
        isJudge: formData.get("isJudge") === "true",
        totalEvents: 0,
        goldMedals: 0,
        silverMedals: 0,
        bronzeMedals: 0,
        createdAt: BigInt(Date.now()),
      };

      if (editingParticipant) {
        // Update existing participant
        setParticipants(prev =>
          prev.map(p => (p.participantAddress === editingParticipant.participantAddress ? newParticipant : p)),
        );
      } else {
        // Add new participant
        setParticipants(prev => [...prev, newParticipant]);
      }
      setEditingParticipant(null);
    } catch (error) {
      console.error("Failed to save participant:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Participants</h2>
        {!editingParticipant && (
          <button onClick={() => setEditingParticipant({} as Participant)} className="btn btn-primary">
            Add Participant
          </button>
        )}
      </div>

      {editingParticipant !== null && (
        <form onSubmit={handleSubmit} className="bg-base-300 p-4 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">
            {editingParticipant.participantAddress ? "Edit" : "Add"} Participant
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={editingParticipant.name}
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Wallet Address</span>
              </label>
              <input
                type="text"
                name="participantAddress"
                defaultValue={editingParticipant.participantAddress}
                required
                pattern="^0x[a-fA-F0-9]{40}$"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                name="isJudge"
                defaultValue={editingParticipant.isJudge ? "true" : "false"}
                className="select select-bordered"
              >
                <option value="false">Participant</option>
                <option value="true">Judge</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setEditingParticipant(null)} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      )}

      <DataTable data={participants} columns={columns} />
    </div>
  );
};
