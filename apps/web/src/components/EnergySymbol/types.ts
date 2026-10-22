export const energyTypes = [
  "fire",
  "water",
  "grass",
  "lightning",
  "psychic",
  "fighting",
  "darkness",
  "metal",
  "colorless",
] as const;

export type EnergyType = (typeof energyTypes)[number];

export interface EnergySymbolProps {
  type: EnergyType;
  size?: "sm" | "md" | "lg";
}
