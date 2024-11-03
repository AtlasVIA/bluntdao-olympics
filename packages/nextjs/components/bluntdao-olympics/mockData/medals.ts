import { Medal, Stats } from "../types";

export const mockMedals: Medal[] = [
  {
    id: "1",
    type: 3, // Gold
    eventId: "Speed Rolling Championship",
    participantAddress: "0x123",
    createdAt: BigInt(Date.now()),
  },
  {
    id: "2",
    type: 2, // Silver
    eventId: "Cross Joint Challenge",
    participantAddress: "0x456",
    createdAt: BigInt(Date.now()),
  },
];

export const mockMedalStats: Stats[] = [
  {
    id: "1",
    title: "Total Medals",
    label: "Total Medals Awarded",
    value: "156",
    change: 12,
    trend: "up",
  },
  {
    id: "2",
    title: "Gold Medals",
    label: "Gold Medals Awarded",
    value: "45",
    change: 8,
    trend: "up",
  },
  {
    id: "3",
    title: "Silver Medals",
    label: "Silver Medals Awarded",
    value: "52",
    change: -3,
    trend: "down",
  },
  {
    id: "4",
    title: "Bronze Medals",
    label: "Bronze Medals Awarded",
    value: "59",
    change: 15,
    trend: "up",
  },
];
