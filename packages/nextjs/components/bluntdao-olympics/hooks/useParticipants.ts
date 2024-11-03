"use client";

import { useEffect, useState } from "react";
import { mockParticipants } from "../mockData";
import { Participant } from "../types";

interface UseParticipantsReturn {
  participants: Participant[] | null;
  isLoading: boolean;
  error: Error | null;
}

export const useParticipants = (): UseParticipantsReturn => {
  const [participants, setParticipants] = useState<Participant[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In production, this would be replaced with actual blockchain data fetching
        setParticipants(mockParticipants);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch participants"));
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return { participants, isLoading, error };
};
