const distDirectory = `${import.meta.dir}/../dist`;

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function contentType(pathname: string): string {
  const extension = pathname.slice(pathname.lastIndexOf("."));
  return contentTypes[extension] ?? "application/octet-stream";
}

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  async fetch(request) {
    const url = new URL(request.url);
    const safePath = decodeURIComponent(url.pathname).replace(/\.\.+/gu, "");
    const relativePath = safePath.endsWith("/")
      ? `${safePath}index.html`
      : safePath;
    const candidatePath = `${distDirectory}${relativePath}`;
    const candidate = Bun.file(candidatePath);
    const exists = await candidate.exists();
    const file = exists ? candidate : Bun.file(`${distDirectory}/index.html`);

    return new Response(request.method === "HEAD" ? null : file, {
      headers: {
        "content-type": contentType(exists ? candidatePath : "/index.html"),
      },
    });
  },
});

console.info(`Prize Map is listening on ${server.url}`);
