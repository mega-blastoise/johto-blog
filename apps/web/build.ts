import { posts } from "@prize-map/content-data";
import { mkdir } from "node:fs/promises";

const applicationDirectory = import.meta.dir;
const outputDirectory = `${applicationDirectory}/dist`;

interface PageMetadata {
  title: string;
  description: string;
}

function metadataFor(route: string): PageMetadata {
  const slug = /^\/posts\/([^/]+)\/$/u.exec(route)?.[1];
  const article = slug ? posts.find((post) => post.slug === slug) : undefined;

  if (article) {
    return {
      title: `${article.title} · Prize Map`,
      description: article.excerpt,
    };
  }

  if (route === "/field/") {
    return {
      title: "Field Notes · Prize Map",
      description:
        "Timestamped competitive Pokémon TCG metagame reads and deck-selection implications.",
    };
  }

  if (route === "/about/") {
    return {
      title: "The Prize Map Protocol",
      description:
        "How Prize Map keeps competitive Pokémon TCG notes useful after the event.",
    };
  }

  return {
    title: "Prize Map · Competitive Pokémon TCG",
    description:
      "Deck reports, matchup plans, and format reads for competitive Pokémon Trading Card Game players.",
  };
}

function documentFor(route: string): string {
  const { description, title } = metadataFor(route);
  const safeDescription = description
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${safeDescription}" />
    <meta name="theme-color" content="#0d1117" />
    <title>${title}</title>
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
    naming: "app.[ext]",
    sourcemap: "external",
  });

  if (!result.success) {
    throw new AggregateError(result.logs, "Web bundle failed");
  }

  const routes = [
    "/",
    "/field/",
    "/about/",
    ...posts.map((post) => `/posts/${post.slug}/`),
  ];
  await Promise.all(
    routes.map(async (route) => {
      const outputPath =
        route === "/"
          ? `${outputDirectory}/index.html`
          : `${outputDirectory}${route}index.html`;
      await mkdir(outputPath.slice(0, outputPath.lastIndexOf("/")), {
        recursive: true,
      });
      await Bun.write(outputPath, documentFor(route));
    }),
  );

  console.info(`Built static Prize Map with ${routes.length} routes.`);
}

await build();
