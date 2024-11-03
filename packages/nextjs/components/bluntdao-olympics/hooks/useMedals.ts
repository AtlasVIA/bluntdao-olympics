import { useEffect, useState } from "react";
import { mockMedalStats, mockMedals } from "../mockData";
import { Medal, Stats } from "../types";

interface UseMedalsReturn {
  medals: Medal[];
  stats: Stats[];
  isLoading: boolean;
  error: Error | null;
}

export const useMedals = (): UseMedalsReturn => {
  const [medals, setMedals] = useState<Medal[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchMedals = async () => {
      try {
        setMedals(mockMedals);
        setStats(mockMedalStats);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch medals"));
        setIsLoading(false);
      }
    };

    fetchMedals();
  }, []);

  return { medals, stats, isLoading, error };
};
