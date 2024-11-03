// Type-safe status constants
export const EVENT_STATUS = {
  UPCOMING: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  CANCELLED: 3,
} as const;

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];

export const MEDAL_TYPE = {
  NONE: 0,
  BRONZE: 1,
  SILVER: 2,
  GOLD: 3,
} as const;

export type MedalType = (typeof MEDAL_TYPE)[keyof typeof MEDAL_TYPE];

export const CONSUMPTION_METHOD = {
  JOINT: 0,
  BONG: 1,
  PIPE: 2,
  VAPORIZER: 3,
  OTHER: 4,
} as const;

export type ConsumptionMethod = (typeof CONSUMPTION_METHOD)[keyof typeof CONSUMPTION_METHOD];

// Base Types
export interface Event extends Record<string, unknown> {
  eventId: string;
  name: string;
  description: string;
  startTime: bigint;
  endTime: bigint;
  status: EventStatus;
  createdAt: bigint;
}

export interface Participant extends Record<string, unknown> {
  participantAddress: string;
  name: string;
  isJudge: boolean;
  totalEvents: number;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  createdAt: bigint;
}

export interface Strain extends Record<string, unknown> {
  name: string;
  usageCount: number;
}

export interface ConsumptionStats extends Record<string, unknown> {
  totalGrams: number;
  favoriteStrain: string;
  favoriteMethod: ConsumptionMethod;
  eventCount: number;
  methodDistribution: Record<ConsumptionMethod, number>;
  topStrains: Strain[];
}

export interface Medal extends Record<string, unknown> {
  id: string;
  type: MedalType;
  eventId: string;
  participantAddress: string;
  createdAt: bigint;
}

export interface MedalTally extends Record<string, unknown> {
  totalGold: number;
  totalSilver: number;
  totalBronze: number;
  countries: Array<{
    country: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  }>;
}

export interface Stats extends Record<string, unknown> {
  id: string;
  title: string;
  value: string | number;
  label: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
}

export interface Tab extends Record<string, unknown> {
  id: string;
  label: string;
  icon?: string;
}

// Helper functions
export const toSolidityTimestamp = (date: Date): bigint => BigInt(Math.floor(date.getTime() / 1000));

export const fromSolidityTimestamp = (timestamp: bigint): Date => new Date(Number(timestamp) * 1000);
