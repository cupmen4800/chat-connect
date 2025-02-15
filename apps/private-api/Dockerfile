FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN npm install -g corepack@latest

FROM base AS builder
RUN apt-get update -y
# Set working directory
WORKDIR /app
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN pnpm add -g turbo@^2

COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN pnpx turbo prune private-api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apt-get update -y
RUN apt-get install -y openssl
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN cd ./apps/private-api/ && pnpx prisma generate
RUN pnpx turbo run build --filter=private-api

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN apt-get update -y
RUN apt-get install -y openssl
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono
USER hono

COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/apps/private-api/package.json ./apps/private-api/package.json
COPY --from=installer --chown=hono:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=hono:nodejs /app/apps/private-api/node_modules ./apps/private-api/node_modules
COPY --from=installer --chown=hono:nodejs /app/apps/private-api/dist ./apps/private-api/dist

ENV PORT 3002
EXPOSE 3002

CMD node ./apps/private-api/dist/src/index.js
