import { posts } from "@prize-map/content-data";
import { mkdir } from "node:fs/promises";

import copy from "./src/content/en.json";

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
      title: `${article.title} · ${copy.site.name}`,
      description: article.excerpt,
    };
  }

  if (route === "/posts/") {
    return {
      title: copy.meta.postsTitle,
      description: copy.meta.postsDescription,
    };
  }

  if (route === "/field/") {
    return {
      title: copy.meta.fieldTitle,
      description: copy.meta.fieldDescription,
    };
  }

  if (route === "/about/") {
    return {
      title: copy.meta.protocolTitle,
      description: copy.meta.protocolDescription,
    };
  }

  return {
    title: copy.meta.homeTitle,
    description: copy.meta.homeDescription,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

function documentFor(route: string): string {
  const { description, title } = metadataFor(route);
  const safeDescription = escapeHtml(description);
  const safeTitle = escapeHtml(title);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${safeDescription}" />
    <meta name="theme-color" content="#060a14" />
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

  const routes = [
    "/",
    "/posts/",
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
