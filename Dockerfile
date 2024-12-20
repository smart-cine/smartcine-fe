FROM oven/bun:alpine AS base

# STAGE DEPS: Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# We need curl and bash to install bun
RUN apk add --no-cache libc6-compat curl bash 
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lockb* ./
RUN if [ -f bun.lockb ]; then bun install --frozen-lockfile \
  else echo "Lockfile not found." && exit 1; \
  fi


# STAGE BUILDER: Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN if [ -f bun.lockb ]; then bun run build; \
  else echo "Build error" && exit 1; \
  fi


# STAGE RUNNER: Production image, copy all the files and run nestjs server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE ${PORT}

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
