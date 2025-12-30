FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY . .

ARG VITE_BASE_MEDIA_URL
ENV VITE_BASE_MEDIA_URL=$VITE_BASE_MEDIA_URL

RUN pnpm install --frozen-lockfile

RUN pnpm --filter ./packages/shared build
RUN pnpm --filter ./packages/fetch-wrapper build

RUN pnpm db:client:generate

ENV SKIP_ENV_VALIDATION=true

RUN pnpm --filter ./apps/api build

RUN pnpm api:generate

RUN pnpm --filter ./apps/web build

FROM node:24-alpine AS production

WORKDIR /app

RUN corepack enable

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN pnpm install --prod --filter api...

COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./

ENV NODE_ENV=production
EXPOSE 5000

CMD ["sh", "-c", "pnpm start:prod"]