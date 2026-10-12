import { articleKinds, type Article, type DeckContext } from "@prize-map/types";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

const deckContextSchema = z.strictObject({
  archetype: z.string().min(1),
  version: z.string().min(1),
  event: z.string().min(1).optional(),
  record: z.string().min(1).optional(),
});

const articleFrontmatterSchema = z.strictObject({
  title: z.string().min(1),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-safe kebab case"),
  excerpt: z.string().min(1),
  date: z.iso.date(),
  updated: z.iso.date(),
  kind: z.enum(articleKinds),
  format: z.enum(["standard", "expanded", "mixed"]),
  tags: z.array(z.string().min(1)).min(1),
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
  deck: deckContextSchema.optional(),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export interface ParsedArticle {
  article: Article;
  sourcePath: string;
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

  if (!body.trim()) {
    throw new Error(`${sourcePath}: article body cannot be empty`);
  }

  return {
    sourcePath,
    article: {
      ...parsed.data,
      deck: parsed.data.deck as DeckContext | undefined,
      body: body.trim(),
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
