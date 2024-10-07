"use client";

import React from "react";

interface CountryData {
  rank: number;
  country: string;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  totalPoints: number;
}

const CountryLeaderboard: React.FC = () => {
  const countryData: CountryData[] = [
    { rank: 1, country: "Jamaica", goldMedals: 5, silverMedals: 3, bronzeMedals: 2, totalPoints: 23 },
    { rank: 2, country: "Netherlands", goldMedals: 4, silverMedals: 4, bronzeMedals: 3, totalPoints: 23 },
    { rank: 3, country: "USA", goldMedals: 3, silverMedals: 5, bronzeMedals: 4, totalPoints: 23 },
    { rank: 4, country: "Canada", goldMedals: 3, silverMedals: 3, bronzeMedals: 5, totalPoints: 20 },
    { rank: 5, country: "Colombia", goldMedals: 2, silverMedals: 4, bronzeMedals: 3, totalPoints: 17 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Rank</th>
            <th className="py-2 px-4 text-left">Country</th>
            <th className="py-2 px-4 text-center">Gold</th>
            <th className="py-2 px-4 text-center">Silver</th>
            <th className="py-2 px-4 text-center">Bronze</th>
            <th className="py-2 px-4 text-center">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {countryData.map(country => (
            <tr key={country.rank} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{country.rank}</td>
              <td className="py-2 px-4">{country.country}</td>
              <td className="py-2 px-4 text-center">{country.goldMedals}</td>
              <td className="py-2 px-4 text-center">{country.silverMedals}</td>
              <td className="py-2 px-4 text-center">{country.bronzeMedals}</td>
              <td className="py-2 px-4 text-center font-bold">{country.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryLeaderboard;
