"use client";

import { useEffect, useState } from "react";
import { mockParticipants } from "../mockData";
import type { Participant } from "../types";

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        // Simulating API call with mock data
        setParticipants(mockParticipants);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return { participants, isLoading, error };
};

export default useParticipants;
