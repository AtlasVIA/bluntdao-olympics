import { useEffect, useState } from "react";
import { mockConsumptionStats, mockMethodDistribution, mockTopStrains } from "../mockData/consumption";
import type { ConsumptionStats, Strain } from "../types";

interface UseConsumptionReturn {
  globalStats: ConsumptionStats | null;
  methodDistribution: Record<number, number>;
  topStrains: Strain[];
  isLoading: boolean;
  error: Error | null;
}

export function useConsumption(): UseConsumptionReturn {
  const [globalStats, setGlobalStats] = useState<ConsumptionStats | null>(null);
  const [methodDistribution, setMethodDistribution] = useState<Record<number, number>>({});
  const [topStrains, setTopStrains] = useState<Strain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setGlobalStats(mockConsumptionStats);
        setMethodDistribution(mockMethodDistribution);
        setTopStrains(mockTopStrains);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    globalStats,
    methodDistribution,
    topStrains,
    isLoading,
    error,
  };
}
