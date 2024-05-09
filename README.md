# Route handler

A proof of concept of how to do file based routing in with bun.

I uploaded this to [JSR](https://jsr.io/@randreu28/route-handler), the compettior of npm beacuse I could simply upload typescript code without having to bundle it.

It's also only compatible with bun, and JSR makes a great job marking packages as compatible with x or y runtimes.

## Installation

```bash
bunx jsr add @randreu28/route-handler
```

To run:

```ts
//index.ts
import fileServer from "@randreu28/route-handler";

fileServer("/my-routes");
```

This will make it so that any file in `/my-routes` will be a route handler, like so:

```ts
// my-routes/index.ts
export function GET(req: Request) {
  return new Response("This will be ported to GET localhost:3000/");
}

export function POST(req: Request) {
  return new Response("This will be ported to POST localhost:3000/");
}
```

```ts
// my-routes/blog.ts
export function GET(req: Request) {
  return new Response("this will be ported to GET localhost:3000/blog");
}

export function POST(req: Request) {
  return new Response("this will be ported to POST localhost:3000/blog");
}
```

This takes inspiration from next.js route handlers.

This project was created using `bun init` in bun v1.1.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
