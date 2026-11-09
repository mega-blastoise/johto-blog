import type {
  Decklist,
  DecklistCard,
  DecklistSection,
  DecklistSectionKind,
} from "@prize-map/types";

export const DECK_SIZE = 60;

const decklistFence = /^```decklist[^\S\n]*\n([\s\S]*?)\n```[^\S\n]*$/gmu;
const sectionHeader = /^(pok[ée]mon|trainer|energy)\s*:\s*(\d+)$/iu;
const totalLine = /^total cards\s*:\s*(\d+)$/iu;
const cardLine = /^(\d+)\s+(.+)$/u;
// "Name SET 123" as exported by PTCG Live. Set codes are short uppercase tokens
// (TWM, PR-SV); collector numbers may carry a prefix (TG01, GG35).
const setAndNumber =
  /^(.*\S)\s+([A-Z][A-Z0-9-]{1,5})\s+([A-Z]{0,3}\d+[a-z]?)$/u;

function sectionKind(label: string): DecklistSectionKind {
  const normalized = label.toLowerCase();
  if (normalized.startsWith("pok")) return "pokemon";
  return normalized === "trainer" ? "trainer" : "energy";
}

function parseCard(count: number, rest: string): DecklistCard {
  const match = setAndNumber.exec(rest);
  if (!match) return { count, name: rest.trim() };
  const [, name = rest, set, number] = match;
  return { count, name, set, number };
}

/** Parses a PTCG Live export (or the same shape typed by hand) and checks it is a legal 60. */
export function parseDecklist(source: string): Decklist {
  const sections: DecklistSection[] = [];
  let current:
    | { kind: DecklistSectionKind; declared: number; cards: DecklistCard[] }
    | undefined;
  let declaredTotal: number | undefined;

  const closeSection = () => {
    if (!current) return;
    const counted = current.cards.reduce((sum, card) => sum + card.count, 0);
    if (counted !== current.declared) {
      throw new Error(
        `decklist ${current.kind} header says ${current.declared} but the cards add up to ${counted}`,
      );
    }
    sections.push({ kind: current.kind, count: counted, cards: current.cards });
    current = undefined;
  };

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const header = sectionHeader.exec(line);
    if (header) {
      closeSection();
      const kind = sectionKind(header[1] ?? "");
      if (sections.some((section) => section.kind === kind)) {
        throw new Error(`decklist has more than one ${kind} section`);
      }
      current = { kind, declared: Number(header[2]), cards: [] };
      continue;
    }

    const total = totalLine.exec(line);
    if (total) {
      closeSection();
      declaredTotal = Number(total[1]);
      continue;
    }

    const card = cardLine.exec(line);
    if (!card) {
      throw new Error(`decklist line is not "<count> <card>": ${line}`);
    }
    if (!current) {
      throw new Error(
        `decklist card appears before a "Pokémon:", "Trainer:" or "Energy:" header: ${line}`,
      );
    }
    const count = Number(card[1]);
    if (count < 1)
      throw new Error(`decklist card count must be at least 1: ${line}`);
    current.cards.push(parseCard(count, card[2] ?? ""));
  }
  closeSection();

  const total = sections.reduce((sum, section) => sum + section.count, 0);
  if (declaredTotal !== undefined && declaredTotal !== total) {
    throw new Error(
      `decklist "Total Cards: ${declaredTotal}" does not match the ${total} cards listed`,
    );
  }
  if (total !== DECK_SIZE) {
    throw new Error(
      `decklist has ${total} cards; a deck must have exactly ${DECK_SIZE}`,
    );
  }

  return { sections, total, export: source.trim() };
}

/** Returns the bodies of every ```decklist fence in a Markdown document. */
export function findDecklistBlocks(markdown: string): string[] {
  return Array.from(
    markdown.matchAll(decklistFence),
    (match) => match[1] ?? "",
  );
}
