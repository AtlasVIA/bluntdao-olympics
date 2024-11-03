"use client";

import { useEffect, useState } from "react";
import { mockConsumptionStats } from "../mockData";
import type { ConsumptionStats } from "../types";

interface ConsumptionHookResult {
  stats: ConsumptionStats | null;
  isLoading: boolean;
  error: Error | null;
}

export const useConsumption = (): ConsumptionHookResult => {
  const [stats, setStats] = useState<ConsumptionStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConsumptionStats = async () => {
      try {
        // Simulating API call with mock data
        setStats(mockConsumptionStats);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchConsumptionStats();
  }, []);

  return { stats, isLoading, error };
};
