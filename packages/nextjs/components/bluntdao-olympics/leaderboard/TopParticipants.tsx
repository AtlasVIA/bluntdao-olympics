"use client";

import React from "react";

interface TopParticipantData {
  rank: number;
  name: string;
  country: string;
  bestEvent: string;
  totalPoints: number;
}

const TopParticipants: React.FC = () => {
  const topParticipantsData: TopParticipantData[] = [
    { rank: 1, name: "Bob Marley", country: "Jamaica", bestEvent: "Joint Rolling", totalPoints: 95 },
    { rank: 2, name: "Willie Nelson", country: "USA", bestEvent: "Smoke Ring Blowing", totalPoints: 92 },
    { rank: 3, name: "Snoop Dogg", country: "USA", bestEvent: "Freestyle Rhyming", totalPoints: 90 },
    { rank: 4, name: "Cheech Marin", country: "USA", bestEvent: "Munchies Marathon", totalPoints: 88 },
    { rank: 5, name: "Seth Rogen", country: "Canada", bestEvent: "Bong Crafting", totalPoints: 85 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Rank</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Country</th>
            <th className="py-2 px-4 text-left">Best Event</th>
            <th className="py-2 px-4 text-center">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {topParticipantsData.map(participant => (
            <tr key={participant.rank} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{participant.rank}</td>
              <td className="py-2 px-4 font-semibold">{participant.name}</td>
              <td className="py-2 px-4">{participant.country}</td>
              <td className="py-2 px-4">{participant.bestEvent}</td>
              <td className="py-2 px-4 text-center font-bold">{participant.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopParticipants;
