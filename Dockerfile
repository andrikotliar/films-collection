FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile --prod=false

RUN pnpm build:api

RUN pnpm deploy --filter api --prod /app/deploy

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /app/deploy ./

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "dist/server.js"]