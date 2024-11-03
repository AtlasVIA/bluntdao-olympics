import { useEffect, useState } from "react";
import { mockEvents } from "../mockData";
import type { Event, Stats } from "../types";

interface UseActivitiesReturn {
  activities: Event[];
  stats: Stats[];
  isLoading: boolean;
  error: Error | null;
}

export function useActivities(): UseActivitiesReturn {
  const [activities, setActivities] = useState<Event[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        const sortedEvents = [...mockEvents].sort((a, b) => Number(b.createdAt - a.createdAt));

        setActivities(sortedEvents);
        setStats([
          {
            id: "1",
            title: "Total Events",
            label: "Total Active Events",
            value: mockEvents.length.toString(),
          },
          {
            id: "2",
            title: "Active Events",
            label: "Currently Running Events",
            value: mockEvents.filter(e => e.status === 1).length.toString(),
          },
          {
            id: "3",
            title: "Upcoming Events",
            label: "Scheduled Events",
            value: mockEvents.filter(e => e.status === 0).length.toString(),
          },
        ]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { activities, stats, isLoading, error };
}
