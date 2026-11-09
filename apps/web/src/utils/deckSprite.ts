import { sprites, starterSprites } from "@/assets/johto-gbc/sprites";

/**
 * Decorative party sprite for a Dex entry. The vendored set is Johto-only, so
 * built entries cycle the starters and unbuilt ones show an empty Poké Ball.
 */
export function deckSprite(number: number, built: boolean): string {
  if (!built) return sprites.pokeBall;
  return (
    starterSprites[(number - 1) % starterSprites.length] ?? sprites.pokeBall
  );
}

/** Party-screen HP bar fill for a tier read: tier 1 is full health. */
export function tierHealth(tier?: 1 | 2 | 3): {
  width: string;
  tone: "high" | "mid" | "low";
} {
  if (tier === 1) return { width: "100%", tone: "high" };
  if (tier === 2) return { width: "66%", tone: "high" };
  if (tier === 3) return { width: "38%", tone: "mid" };
  return { width: "12%", tone: "low" };
}
