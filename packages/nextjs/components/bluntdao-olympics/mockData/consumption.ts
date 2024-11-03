import { CONSUMPTION_METHOD, type ConsumptionStats, type Strain } from "../types";

export const mockConsumptionStats: ConsumptionStats = {
  totalGrams: 1250,
  favoriteStrain: "OG Kush",
  favoriteMethod: CONSUMPTION_METHOD.JOINT,
  eventCount: 25,
};

export const mockTopStrains: Strain[] = [
  { name: "OG Kush", usageCount: 150 },
  { name: "Blue Dream", usageCount: 120 },
  { name: "Girl Scout Cookies", usageCount: 100 },
  { name: "Sour Diesel", usageCount: 90 },
  { name: "Purple Haze", usageCount: 85 },
  { name: "White Widow", usageCount: 80 },
  { name: "Northern Lights", usageCount: 75 },
  { name: "Pineapple Express", usageCount: 70 },
];

export const mockMethodDistribution: Record<number, number> = {
  [CONSUMPTION_METHOD.JOINT]: 35,
  [CONSUMPTION_METHOD.BONG]: 25,
  [CONSUMPTION_METHOD.PIPE]: 20,
  [CONSUMPTION_METHOD.VAPORIZER]: 15,
  [CONSUMPTION_METHOD.OTHER]: 5,
};
