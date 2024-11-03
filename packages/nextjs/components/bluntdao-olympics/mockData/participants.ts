import { Participant } from "../types";

export const mockParticipants: Participant[] = [
  {
    participantAddress: "0x1234567890123456789012345678901234567890",
    name: "Blazing Bob",
    isJudge: true,
    totalEvents: 15,
    goldMedals: 5,
    silverMedals: 3,
    bronzeMedals: 2,
    createdAt: BigInt(Date.now() - 90 * 24 * 60 * 60 * 1000),
  },
  {
    participantAddress: "0x2345678901234567890123456789012345678901",
    name: "Mary Jane",
    isJudge: false,
    totalEvents: 12,
    goldMedals: 3,
    silverMedals: 4,
    bronzeMedals: 3,
    createdAt: BigInt(Date.now() - 85 * 24 * 60 * 60 * 1000),
  },
  {
    participantAddress: "0x3456789012345678901234567890123456789012",
    name: "Hash Master",
    isJudge: false,
    totalEvents: 18,
    goldMedals: 6,
    silverMedals: 2,
    bronzeMedals: 4,
    createdAt: BigInt(Date.now() - 80 * 24 * 60 * 60 * 1000),
  },
];
