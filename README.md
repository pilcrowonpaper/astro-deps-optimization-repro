# Astro + Oslo reproduction

```
pnpm i
pnpm dev
```

## Context

Oslo an ESM module that uses [`@node-rs/argon2`](https://www.npmjs.com/package/@node-rs/argon2) and [`@node-rs/bcrypt`](https://www.npmjs.com/package/@node-rs/bcrypt), both of which uses `.node` files.

## Issue

When you run `pnpm`, you get these errors:

```
✘ [ERROR] No loader is configured for ".node" files: node_modules/.pnpm/@node-rs+argon2-darwin-x64@1.7.0/node_modules/@node-rs/argon2-darwin-x64/argon2.darwin-x64.node

    node_modules/.pnpm/@node-rs+argon2@1.7.0/node_modules/@node-rs/argon2/index.js:159:36:
      159 │             nativeBinding = require('@node-rs/argon2-darwin-x64')
          ╵                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

✘ [ERROR] No loader is configured for ".node" files: node_modules/.pnpm/@node-rs+bcrypt-darwin-x64@1.9.0/node_modules/@node-rs/bcrypt-darwin-x64/bcrypt.darwin-x64.node

    node_modules/.pnpm/@node-rs+bcrypt@1.9.0/node_modules/@node-rs/bcrypt/binding.js:153:36:
      153 │             nativeBinding = require('@node-rs/bcrypt-darwin-x64')
```

This can be fixed by adding updating the Vite config the exclude `oslo` from optimization, but I'm not sure why this isn't being done automatically.

```ts
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    optimizeDeps: {
      exclude: ["oslo"],
    },
  },
});
```

It might be a Vite issue, but

- This is not an issue when importing `oslo/password` in `.astro` files.
- Nuxt, SolidStart, and SvelteKit doesn't seem to have the same issue (Remix seems to have the same issue tho).
- Using `@node-rs/argon2` directly works fine.
- No errors when running `pnpm build`