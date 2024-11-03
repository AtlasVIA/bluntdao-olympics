"use client";

import { useEffect, useState } from "react";
import { mockEvents } from "../mockData";
import type { Event, Stats } from "../types";

export const useActivities = () => {
  const [activities, setActivities] = useState<Event[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Simulating API call with mock data
        setActivities(mockEvents);
        setStats([
          {
            id: "1",
            title: "Total Activities",
            value: mockEvents.length,
            label: "Total Activities",
            trend: "up",
            change: 5,
          },
          {
            id: "2",
            title: "Active Events",
            value: mockEvents.filter(e => e.status === 1).length,
            label: "Currently Active Events",
            trend: "up",
            change: 2,
          },
        ]);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, stats, isLoading, error };
};

export default useActivities;
