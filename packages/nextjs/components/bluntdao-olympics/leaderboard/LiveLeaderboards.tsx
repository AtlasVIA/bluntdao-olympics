"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface Participant {
  id: number;
  name: string;
  country: string;
  score: number;
}

const LiveLeaderboards: React.FC = () => {
  const isMounted = useRef(false);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "Bob Marley", country: "Jamaica", score: 420 },
    { id: 2, name: "Willie Nelson", country: "USA", score: 410 },
    { id: 3, name: "Snoop Dogg", country: "USA", score: 400 },
    { id: 4, name: "Cheech Marin", country: "USA", score: 390 },
    { id: 5, name: "Seth Rogen", country: "Canada", score: 380 },
  ]);

  const updateParticipants = useCallback(() => {
    setParticipants(prevParticipants => {
      return prevParticipants
        .map(participant => ({
          ...participant,
          score: participant.score + Math.floor(Math.random() * 10),
        }))
        .sort((a, b) => b.score - a.score);
    });
  }, []);

  useEffect(() => {
    isMounted.current = true;
    let interval: NodeJS.Timeout;

    if (typeof window !== "undefined") {
      interval = setInterval(() => {
        if (isMounted.current) {
          updateParticipants();
        }
      }, 3000);
    }

    return () => {
      isMounted.current = false;
      if (interval) clearInterval(interval);
    };
  }, [updateParticipants]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Live Leaderboard: Joint Rolling Championship</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Rank</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Country</th>
              <th className="py-2 px-4 text-center">Score</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={participant.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 font-semibold">{participant.name}</td>
                <td className="py-2 px-4">{participant.country}</td>
                <td className="py-2 px-4 text-center font-bold">
                  {participant.score}
                  <span className="ml-2 text-green-500">▲</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-600">Scores update every 3 seconds</p>
    </div>
  );
};

export default LiveLeaderboards;
