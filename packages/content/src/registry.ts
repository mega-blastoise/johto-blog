import {
  eventTiers,
  type CardSet,
  type CompetitiveEvent,
  type DeckArchetype,
  type Rotation,
} from "@prize-map/types";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

import { slugSchema } from "./article";

const deckSchema = z.strictObject({
  slug: slugSchema,
  name: z.string().min(1),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
});

const setSchema = z
  .strictObject({
    code: z
      .string()
      .regex(
        /^[A-Z0-9][A-Z0-9-]{1,7}$/u,
        "Set code must be uppercase, e.g. TWM",
      ),
    name: z.string().min(1),
    released: z.iso.date(),
    legal: z.iso.date(),
    regulationMark: z
      .string()
      .regex(/^[A-Z]$/u)
      .optional(),
  })
  .refine((set) => set.legal >= set.released, {
    message: '"legal" cannot be earlier than "released"',
    path: ["legal"],
  });

const rotationSchema = z.strictObject({
  season: z.number().int().min(2000),
  date: z.iso.date(),
  marks: z.array(z.string().regex(/^[A-Z]$/u)).min(1),
});

const eventSchema = z
  .strictObject({
    slug: slugSchema,
    name: z.string().min(1),
    tier: z.enum(eventTiers),
    starts: z.iso.date(),
    ends: z.iso.date().optional(),
    format: z.enum(["standard", "expanded"]),
    location: z.string().min(1),
    url: z.url().optional(),
  })
  .refine((event) => !event.ends || event.ends >= event.starts, {
    message: '"ends" cannot be earlier than "starts"',
    path: ["ends"],
  });

function parseList<Schema extends z.ZodType>(
  schema: Schema,
  key: (item: z.infer<Schema>) => string | number,
  source: string,
  sourcePath: string,
): z.infer<Schema>[] {
  // A file holding only comments parses to null: treat it as an empty registry.
  const parsed = z.array(schema).safeParse(parseYaml(source) ?? []);
  if (!parsed.success) {
    throw new Error(
      `${sourcePath}: invalid entries\n${z.prettifyError(parsed.error)}`,
    );
  }
  const seen = new Set<string | number>();
  for (const item of parsed.data) {
    const id = key(item);
    if (seen.has(id)) throw new Error(`${sourcePath}: duplicate entry "${id}"`);
    seen.add(id);
  }
  return parsed.data;
}

export function parseDecks(
  source: string,
  sourcePath = "decks.yaml",
): DeckArchetype[] {
  return parseList(deckSchema, (deck) => deck.slug, source, sourcePath);
}

/** Sets come back oldest-legal first. */
export function parseSets(source: string, sourcePath = "sets.yaml"): CardSet[] {
  return parseList(setSchema, (set) => set.code, source, sourcePath).sort(
    (a, b) => a.legal.localeCompare(b.legal),
  );
}

export function parseRotations(
  source: string,
  sourcePath = "rotations.yaml",
): Rotation[] {
  return parseList(
    rotationSchema,
    (rotation) => rotation.season,
    source,
    sourcePath,
  ).sort((a, b) => a.date.localeCompare(b.date));
}

/** Events come back soonest first. */
export function parseEvents(
  source: string,
  sourcePath = "events.yaml",
): CompetitiveEvent[] {
  return parseList(eventSchema, (event) => event.slug, source, sourcePath).sort(
    (a, b) => a.starts.localeCompare(b.starts),
  );
}
