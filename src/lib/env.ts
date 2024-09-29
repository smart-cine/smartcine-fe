// Src/env.mjs
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {},
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production']),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_API_VERSION: z.string().optional().default(''),
    NEXT_PUBLIC_API_TEST_TOKEN: z.string().optional(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_VERSION: process.env.API_VERSION,
    NEXT_PUBLIC_API_TEST_TOKEN: process.env.API_TEST_TOKEN,
  },
});
