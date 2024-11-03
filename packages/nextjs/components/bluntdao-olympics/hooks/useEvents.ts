"use client";

import { useEffect, useState } from "react";
import { mockEvents } from "../mockData";
import type { Event } from "../types";

interface UseEventsReturn {
  events: Event[] | null;
  isLoading: boolean;
  error: Error | null;
}

export const useEvents = (): UseEventsReturn => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(mockEvents);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch events"));
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, isLoading, error };
};
