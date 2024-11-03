"use client";

import { useEffect, useState } from "react";
import { mockMedalStats, mockMedals } from "../mockData";
import type { MedalTally, Stats } from "../types";

export const useMedals = () => {
  const [medals, setMedals] = useState<MedalTally>({
    totalGold: 0,
    totalSilver: 0,
    totalBronze: 0,
    countries: [],
  });
  const [stats, setStats] = useState<Stats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMedals = async () => {
      try {
        // Transform mock data into MedalTally structure
        const medalTally: MedalTally = {
          totalGold: mockMedals.filter(m => m.type === 3).length,
          totalSilver: mockMedals.filter(m => m.type === 2).length,
          totalBronze: mockMedals.filter(m => m.type === 1).length,
          countries: [
            {
              country: "USA",
              gold: 2,
              silver: 1,
              bronze: 3,
              total: 6,
            },
            {
              country: "Canada",
              gold: 1,
              silver: 2,
              bronze: 1,
              total: 4,
            },
          ],
        };

        setMedals(medalTally);
        setStats(mockMedalStats);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchMedals();
  }, []);

  return { medals, stats, isLoading, error };
};

export default useMedals;
