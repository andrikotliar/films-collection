FROM node:24-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/api/package.json ./api/
COPY apps/web/package.json ./web/

RUN pnpm fetch

COPY . .

ARG VITE_BASE_MEDIA_URL
ENV VITE_BASE_MEDIA_URL=$VITE_BASE_MEDIA_URL

RUN pnpm install --offline --frozen-lockfile
RUN pnpm db:client:generate
RUN pnpm build

FROM node:24-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./

ENV NODE_ENV=production
EXPOSE 5000

CMD ["sh", "-c", "pnpm start:prod"]