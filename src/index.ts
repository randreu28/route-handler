type Module = {
  GET?: (req: Request) => Promise<Response>;
  PUT?: (req: Request) => Promise<Response>;
  POST?: (req: Request) => Promise<Response>;
  DELETE?: (req: Request) => Promise<Response>;
};

async function main(baseRoute: string) {
  const server = Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);
      const path = url.pathname;

      const modulePath =
        baseRoute + path + (path.endsWith("/") ? "index.ts" : "");
      const routeHandler: Module | undefined = await import(modulePath).catch(
        () => undefined
      );
      const method = routeHandler?.[req.method as keyof Module];

      if (routeHandler && method) {
        return method(req);
      }

      return new Response("404 Not Found", { status: 404 });
    },
  });
  console.log(`Server running on port ${server.port}`);
}

main(process.argv.at(2) || ".");
