"use client";

import React from "react";

interface ParticipantData {
  id: number;
  name: string;
  country: string;
  eventsParticipated: number;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  totalPoints: number;
}

const ParticipantStats: React.FC = () => {
  const participantData: ParticipantData[] = [
    {
      id: 1,
      name: "Bob Marley",
      country: "Jamaica",
      eventsParticipated: 3,
      goldMedals: 2,
      silverMedals: 1,
      bronzeMedals: 0,
      totalPoints: 8,
    },
    {
      id: 2,
      name: "Willie Nelson",
      country: "USA",
      eventsParticipated: 4,
      goldMedals: 1,
      silverMedals: 2,
      bronzeMedals: 1,
      totalPoints: 8,
    },
    {
      id: 3,
      name: "Snoop Dogg",
      country: "USA",
      eventsParticipated: 5,
      goldMedals: 1,
      silverMedals: 1,
      bronzeMedals: 2,
      totalPoints: 7,
    },
    {
      id: 4,
      name: "Cheech Marin",
      country: "USA",
      eventsParticipated: 3,
      goldMedals: 1,
      silverMedals: 1,
      bronzeMedals: 1,
      totalPoints: 6,
    },
    {
      id: 5,
      name: "Seth Rogen",
      country: "Canada",
      eventsParticipated: 4,
      goldMedals: 0,
      silverMedals: 2,
      bronzeMedals: 2,
      totalPoints: 6,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Country</th>
            <th className="py-2 px-4 text-center">Events</th>
            <th className="py-2 px-4 text-center">Gold</th>
            <th className="py-2 px-4 text-center">Silver</th>
            <th className="py-2 px-4 text-center">Bronze</th>
            <th className="py-2 px-4 text-center">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {participantData.map(participant => (
            <tr key={participant.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{participant.name}</td>
              <td className="py-2 px-4">{participant.country}</td>
              <td className="py-2 px-4 text-center">{participant.eventsParticipated}</td>
              <td className="py-2 px-4 text-center">{participant.goldMedals}</td>
              <td className="py-2 px-4 text-center">{participant.silverMedals}</td>
              <td className="py-2 px-4 text-center">{participant.bronzeMedals}</td>
              <td className="py-2 px-4 text-center font-bold">{participant.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantStats;
