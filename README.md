# Astro + `.node` reproduction

Astro fails to start dev server when using packages with `.node` files.

```
pnpm i
pnpm dev
```

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

This can be fixed by adding updating the Vite config the exclude `@node-rs/argon2` from optimization.

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
      exclude: ["@node-rs/argon2"],
    },
  },
});
```
