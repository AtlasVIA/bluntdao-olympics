"use client";

import React, { useState } from "react";
import { Column, DataTable, LoadingState } from "../../common";
import { mockEvents, mockParticipants } from "../../mockData";
import { EVENT_STATUS, Event, MEDAL_TYPE, Participant } from "../../types";

interface ScoringRecord extends Record<string, unknown> {
  id: string;
  eventId: string;
  participantAddress: string;
  score: number;
  medalType: number;
  notes: string;
  timestamp: bigint;
}

type ScoringColumn = Column<ScoringRecord, keyof ScoringRecord>;

export const ScoringManagement = () => {
  const [events] = useState<Event[]>(mockEvents);
  const [participants] = useState<Participant[]>(mockParticipants);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editingScore, setEditingScore] = useState<ScoringRecord | null>(null);
  const [scoringRecords, setScoringRecords] = useState<ScoringRecord[]>([
    {
      id: "1",
      eventId: "0x3333",
      participantAddress: "0x1234567890123456789012345678901234567890",
      score: 95,
      medalType: MEDAL_TYPE.GOLD,
      notes: "Exceptional performance",
      timestamp: BigInt(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      eventId: "0x3333",
      participantAddress: "0x2345678901234567890123456789012345678901",
      score: 88,
      medalType: MEDAL_TYPE.SILVER,
      notes: "Great technique",
      timestamp: BigInt(Date.now() - 12 * 60 * 60 * 1000),
    },
  ]);

  const columns: ScoringColumn[] = [
    {
      header: "Participant",
      accessor: "participantAddress",
      render: (value: unknown) => {
        const address = value as string;
        const participant = participants.find(p => p.participantAddress === address);
        return participant?.name || address;
      },
    },
    {
      header: "Score",
      accessor: "score",
    },
    {
      header: "Medal",
      accessor: "medalType",
      render: (value: unknown) => {
        const medal = value as number;
        switch (medal) {
          case MEDAL_TYPE.GOLD:
            return <span className="badge badge-warning">Gold</span>;
          case MEDAL_TYPE.SILVER:
            return <span className="badge badge-secondary">Silver</span>;
          case MEDAL_TYPE.BRONZE:
            return <span className="badge badge-error">Bronze</span>;
          default:
            return <span className="badge">None</span>;
        }
      },
    },
    {
      header: "Notes",
      accessor: "notes",
    },
    {
      header: "Timestamp",
      accessor: "timestamp",
      render: (value: unknown) => new Date(Number(value as bigint)).toLocaleString(),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (_, record: ScoringRecord) => (
        <div className="flex space-x-2">
          <button onClick={() => setEditingScore(record)} className="btn btn-sm btn-primary">
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
    if (!window.confirm("Are you sure you want to delete this score?")) return;
    setLoading(true);
    try {
      // In a real app, you would make an API call here
      setScoringRecords(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Failed to delete score:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedEvent) return;

    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const newRecord: ScoringRecord = {
        id: editingScore?.id || Math.random().toString(36).slice(2),
        eventId: selectedEvent.eventId,
        participantAddress: formData.get("participantAddress") as string,
        score: Number(formData.get("score")),
        medalType: Number(formData.get("medalType")),
        notes: formData.get("notes") as string,
        timestamp: BigInt(Date.now()),
      };

      if (editingScore) {
        // Update existing score
        setScoringRecords(prev => prev.map(r => (r.id === editingScore.id ? newRecord : r)));
      } else {
        // Add new score
        setScoringRecords(prev => [...prev, newRecord]);
      }
      setEditingScore(null);
    } catch (error) {
      console.error("Failed to save score:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  const activeEvents = events.filter(e => e.status === EVENT_STATUS.IN_PROGRESS);
  const currentEventScores = selectedEvent ? scoringRecords.filter(r => r.eventId === selectedEvent.eventId) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Scoring Management</h2>
      </div>

      {/* Event Selection */}
      <div className="bg-base-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Select Active Event</h3>
        <div className="grid grid-cols-3 gap-4">
          {activeEvents.map(event => (
            <button
              key={event.eventId}
              onClick={() => setSelectedEvent(event)}
              className={`btn ${selectedEvent?.eventId === event.eventId ? "btn-primary" : ""}`}
            >
              {event.name}
            </button>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Scores for {selectedEvent.name}</h3>
            {!editingScore && (
              <button onClick={() => setEditingScore({} as ScoringRecord)} className="btn btn-primary">
                Add Score
              </button>
            )}
          </div>

          {editingScore !== null && (
            <form onSubmit={handleSubmit} className="bg-base-300 p-4 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold">{editingScore.id ? "Edit" : "Add"} Score</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Participant</span>
                  </label>
                  <select
                    name="participantAddress"
                    defaultValue={editingScore.participantAddress}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select a participant</option>
                    {participants
                      .filter(p => !p.isJudge)
                      .map(participant => (
                        <option key={participant.participantAddress} value={participant.participantAddress}>
                          {participant.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Score (0-100)</span>
                  </label>
                  <input
                    type="number"
                    name="score"
                    defaultValue={editingScore.score}
                    required
                    min="0"
                    max="100"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Medal</span>
                  </label>
                  <select
                    name="medalType"
                    defaultValue={editingScore.medalType}
                    className="select select-bordered"
                    required
                  >
                    <option value={MEDAL_TYPE.NONE}>No Medal</option>
                    <option value={MEDAL_TYPE.GOLD}>Gold</option>
                    <option value={MEDAL_TYPE.SILVER}>Silver</option>
                    <option value={MEDAL_TYPE.BRONZE}>Bronze</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Notes</span>
                  </label>
                  <input type="text" name="notes" defaultValue={editingScore.notes} className="input input-bordered" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setEditingScore(null)} className="btn">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          )}

          <DataTable data={currentEventScores} columns={columns} />
        </>
      )}
    </div>
  );
};
