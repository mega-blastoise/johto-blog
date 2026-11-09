import { decks, events, posts, sets } from "@prize-map/content-data";
import { mkdir } from "node:fs/promises";

import copy from "./src/content/en.json";

const applicationDirectory = import.meta.dir;
const outputDirectory = `${applicationDirectory}/dist`;

interface PageMetadata {
  title: string;
  description: string;
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(
    /\{(\w+)\}/gu,
    (token, key: string) => values[key] ?? token,
  );
}

/** Every static route the site emits, with the <title> and description its HTML shell carries. */
function routeTable(): Map<string, PageMetadata> {
  const routes = new Map<string, PageMetadata>([
    [
      "/",
      { title: copy.meta.homeTitle, description: copy.meta.homeDescription },
    ],
    [
      "/decks/",
      { title: copy.meta.decksTitle, description: copy.meta.decksDescription },
    ],
    [
      "/sets/",
      { title: copy.meta.setsTitle, description: copy.meta.setsDescription },
    ],
    [
      "/events/",
      {
        title: copy.meta.eventsTitle,
        description: copy.meta.eventsDescription,
      },
    ],
    [
      "/journal/",
      {
        title: copy.meta.journalTitle,
        description: copy.meta.journalDescription,
      },
    ],
    [
      "/about/",
      { title: copy.meta.aboutTitle, description: copy.meta.aboutDescription },
    ],
    // Pre-/journal/ URL, redirected client-side.
    [
      "/posts/",
      {
        title: copy.meta.journalTitle,
        description: copy.meta.journalDescription,
      },
    ],
  ]);

  for (const post of posts) {
    const metadata = {
      title: `${post.title} · ${copy.site.name}`,
      description: post.excerpt,
    };
    routes.set(`/journal/${post.slug}/`, metadata);
    routes.set(`/posts/${post.slug}/`, metadata);
  }
  for (const deck of decks) {
    routes.set(`/decks/${deck.slug}/`, {
      title: fill(copy.meta.deckTitle, { name: deck.name }),
      description: fill(copy.meta.deckDescription, { name: deck.name }),
    });
  }
  for (const set of sets) {
    routes.set(`/sets/${set.code.toLowerCase()}/`, {
      title: fill(copy.meta.setTitle, { name: set.name, code: set.code }),
      description: fill(copy.meta.setDescription, { name: set.name }),
    });
  }
  for (const event of events) {
    routes.set(`/events/${event.slug}/`, {
      title: fill(copy.meta.eventTitle, { name: event.name }),
      description: fill(copy.meta.eventDescription, { name: event.name }),
    });
  }
  return routes;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

function documentFor({ description, title }: PageMetadata): string {
  const safeDescription = escapeHtml(description);
  const safeTitle = escapeHtml(title);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${safeDescription}" />
    <meta name="theme-color" content="#f3efdc" />
    <title>${safeTitle}</title>
    <link rel="stylesheet" href="/app.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/app.js"></script>
  </body>
</html>`;
}

async function build(): Promise<void> {
  await Bun.$`rm -rf ${outputDirectory}`;
  await Bun.$`mkdir -p ${outputDirectory}`;

  const result = await Bun.build({
    entrypoints: [`${applicationDirectory}/src/main.tsx`],
    outdir: outputDirectory,
    target: "browser",
    format: "esm",
    minify: true,
    naming: {
      entry: "app.[ext]",
      chunk: "chunks/[name]-[hash].[ext]",
    },
    splitting: true,
    sourcemap: "external",
  });

  if (!result.success) {
    throw new AggregateError(result.logs, "Web bundle failed");
  }

  const routes = routeTable();
  await Promise.all(
    [...routes].map(async ([route, metadata]) => {
      const outputPath =
        route === "/"
          ? `${outputDirectory}/index.html`
          : `${outputDirectory}${route}index.html`;
      await mkdir(outputPath.slice(0, outputPath.lastIndexOf("/")), {
        recursive: true,
      });
      await Bun.write(outputPath, documentFor(metadata));
    }),
  );

  console.info(`Built static Prize Map with ${routes.size} routes.`);
}

await build();
