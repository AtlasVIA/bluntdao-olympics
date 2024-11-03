"use client";

import React, { useState } from "react";
import { Column, DataTable, LoadingState } from "../../common";
import { mockEvents } from "../../mockData";
import { EVENT_STATUS, Event } from "../../types";

export const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const columns: Column<Event>[] = [
    {
      header: "Name",
      accessor: "name" as const,
    },
    {
      header: "Description",
      accessor: "description" as const,
    },
    {
      header: "Status",
      accessor: "status" as const,
      render: value => {
        const status = value as number;
        switch (status) {
          case EVENT_STATUS.UPCOMING:
            return <span className="badge badge-info">Upcoming</span>;
          case EVENT_STATUS.IN_PROGRESS:
            return <span className="badge badge-success">In Progress</span>;
          case EVENT_STATUS.COMPLETED:
            return <span className="badge badge-neutral">Completed</span>;
          case EVENT_STATUS.CANCELLED:
            return <span className="badge badge-error">Cancelled</span>;
          default:
            return <span className="badge">Unknown</span>;
        }
      },
    },
    {
      header: "Start Time",
      accessor: "startTime" as const,
      render: value => new Date(Number(value)).toLocaleString(),
    },
    {
      header: "End Time",
      accessor: "endTime" as const,
      render: value => new Date(Number(value)).toLocaleString(),
    },
    {
      header: "Actions",
      accessor: "eventId" as const,
      render: (_, event) => (
        <div className="flex space-x-2">
          <button onClick={() => setEditingEvent(event)} className="btn btn-sm btn-primary">
            Edit
          </button>
          <button onClick={() => handleDelete(event.eventId)} className="btn btn-sm btn-error">
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setLoading(true);
    try {
      // In a real app, you would make an API call here
      setEvents(prev => prev.filter(e => e.eventId !== eventId));
    } catch (error) {
      console.error("Failed to delete event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const startTime = new Date(formData.get("startTime") as string);
      const endTime = new Date(formData.get("endTime") as string);

      const newEvent: Event = {
        eventId: editingEvent?.eventId || `0x${Math.random().toString(16).slice(2)}`,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        startTime: BigInt(startTime.getTime()),
        endTime: BigInt(endTime.getTime()),
        status: Number(formData.get("status")) as (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS],
        createdAt: editingEvent?.createdAt || BigInt(Date.now()),
      };

      if (editingEvent) {
        // Update existing event
        setEvents(prev => prev.map(e => (e.eventId === editingEvent.eventId ? newEvent : e)));
      } else {
        // Add new event
        setEvents(prev => [...prev, newEvent]);
      }
      setEditingEvent(null);
    } catch (error) {
      console.error("Failed to save event:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        {!editingEvent && (
          <button onClick={() => setEditingEvent({} as Event)} className="btn btn-primary">
            Add Event
          </button>
        )}
      </div>

      {editingEvent !== null && (
        <form onSubmit={handleSubmit} className="bg-base-300 p-4 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold">{editingEvent.eventId ? "Edit" : "Add"} Event</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={editingEvent.name}
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                name="description"
                defaultValue={editingEvent.description}
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Start Time</span>
              </label>
              <input
                type="datetime-local"
                name="startTime"
                defaultValue={
                  editingEvent.startTime ? new Date(Number(editingEvent.startTime)).toISOString().slice(0, 16) : ""
                }
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">End Time</span>
              </label>
              <input
                type="datetime-local"
                name="endTime"
                defaultValue={
                  editingEvent.endTime ? new Date(Number(editingEvent.endTime)).toISOString().slice(0, 16) : ""
                }
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select name="status" defaultValue={editingEvent.status} className="select select-bordered">
                <option value={EVENT_STATUS.UPCOMING}>Upcoming</option>
                <option value={EVENT_STATUS.IN_PROGRESS}>In Progress</option>
                <option value={EVENT_STATUS.COMPLETED}>Completed</option>
                <option value={EVENT_STATUS.CANCELLED}>Cancelled</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setEditingEvent(null)} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      )}

      <DataTable data={events} columns={columns} />
    </div>
  );
};
