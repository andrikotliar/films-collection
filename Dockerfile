FROM node:24-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/

RUN pnpm fetch

COPY . .

WORKDIR /app/server

RUN pnpm install --offline --frozen-lockfile
RUN pnpm build:all
RUN pnpm db:client:generate

WORKDIR /app/client

ARG VITE_BASE_MEDIA_URL
ENV VITE_BASE_MEDIA_URL=$VITE_BASE_MEDIA_URL
RUN pnpm install --offline --frozen-lockfile
RUN pnpm build:all

FROM node:24-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/server/prisma ./prisma
COPY --from=builder /app/server/package.json ./

ENV NODE_ENV=production
EXPOSE 5000

CMD ["sh", "-c", "pnpm db:deploy && pnpm start"]