import {
  articleKinds,
  gameFormats,
  matchupResults,
  type Article,
  type DeckContext,
  type Decklist,
} from "@prize-map/types";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

import { findDecklistBlocks, parseDecklist } from "./decklist";

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-safe kebab case");

const deckContextSchema = z.strictObject({
  archetype: slugSchema,
  version: z.string().min(1),
  event: z.string().min(1).optional(),
  record: z.string().min(1).optional(),
});

const matchupSchema = z.strictObject({
  vs: slugSchema,
  result: z.enum(matchupResults),
  note: z.string().min(1).optional(),
});

const articleFrontmatterSchema = z
  .strictObject({
    title: z.string().min(1),
    slug: slugSchema,
    excerpt: z.string().min(1),
    date: z.iso.date(),
    updated: z.iso.date(),
    kind: z.enum(articleKinds),
    format: z.enum(gameFormats),
    tags: z.array(z.string().min(1)).min(1),
    featured: z.boolean().default(false),
    visible: z.boolean().default(true),
    deck: deckContextSchema.optional(),
    matchups: z.array(matchupSchema).optional(),
    counters: z.array(slugSchema).optional(),
    set: z.string().min(1).optional(),
    rotation: z.number().int().min(2000).optional(),
    event: slugSchema.optional(),
  })
  .superRefine((value, context) => {
    const onlyFor = (
      field: "deck" | "matchups" | "counters" | "set" | "rotation" | "event",
      kind: Article["kind"],
    ) => {
      if (value[field] !== undefined && value.kind !== kind) {
        context.addIssue({
          code: "custom",
          message: `"${field}" is only allowed on ${kind} posts`,
          path: [field],
        });
      }
    };
    onlyFor("deck", "deck-build");
    onlyFor("matchups", "deck-build");
    onlyFor("counters", "deck-build");
    onlyFor("set", "set-release");
    onlyFor("rotation", "rotation");
    onlyFor("event", "event");

    if (value.kind === "deck-build" && !value.deck) {
      context.addIssue({
        code: "custom",
        message:
          'deck-build posts need a "deck" block with archetype and version',
        path: ["deck"],
      });
    }
    if (value.updated < value.date) {
      context.addIssue({
        code: "custom",
        message: '"updated" cannot be earlier than "date"',
        path: ["updated"],
      });
    }
  });

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export interface ParsedArticle {
  article: Article;
  sourcePath: string;
}

function extractDecklist(
  kind: Article["kind"],
  body: string,
  sourcePath: string,
): Decklist | undefined {
  const blocks = findDecklistBlocks(body);
  if (kind !== "deck-build") {
    if (blocks.length > 0) {
      throw new Error(
        `${sourcePath}: only deck-build posts can contain a decklist block`,
      );
    }
    return undefined;
  }
  if (blocks.length !== 1) {
    throw new Error(
      `${sourcePath}: deck-build posts need exactly one \`\`\`decklist block (found ${blocks.length})`,
    );
  }
  try {
    return parseDecklist(blocks[0] ?? "");
  } catch (error) {
    throw new Error(`${sourcePath}: ${(error as Error).message}`, {
      cause: error,
    });
  }
}

export function parseArticle(
  source: string,
  sourcePath = "<inline>",
): ParsedArticle {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/u.exec(source);
  if (!match) {
    throw new Error(
      `${sourcePath}: expected a YAML frontmatter block delimited by ---`,
    );
  }

  const [, rawFrontmatter, body] = match;
  if (rawFrontmatter === undefined || body === undefined) {
    throw new Error(
      `${sourcePath}: failed to separate frontmatter from article body`,
    );
  }

  const parsed = articleFrontmatterSchema.safeParse(parseYaml(rawFrontmatter));
  if (!parsed.success) {
    throw new Error(
      `${sourcePath}: invalid frontmatter\n${z.prettifyError(parsed.error)}`,
    );
  }

  const trimmedBody = body.trim();
  if (!trimmedBody) {
    throw new Error(`${sourcePath}: article body cannot be empty`);
  }

  const { matchups = [], counters = [], deck, ...frontmatter } = parsed.data;

  return {
    sourcePath,
    article: {
      ...frontmatter,
      deck: deck as DeckContext | undefined,
      matchups,
      counters,
      decklist: extractDecklist(frontmatter.kind, trimmedBody, sourcePath),
      body: trimmedBody,
    },
  };
}

export function estimateReadingTime(body: string): string {
  const wordCount = body.trim().split(/\s+/u).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(wordCount / 230))} min read`;
}

export function sortArticles(articles: readonly Article[]): Article[] {
  return [...articles].sort((a, b) => b.updated.localeCompare(a.updated));
}
