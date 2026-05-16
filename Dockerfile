FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY . .

ARG VITE_IMAGES_URL
ENV VITE_IMAGES_URL=$VITE_IMAGES_URL

RUN pnpm install --frozen-lockfile

RUN pnpm build

RUN pnpm deploy --filter api --prod /app/deploy

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /app/deploy ./
COPY --from=builder /app/entrypoint.sh ./
RUN chmod +x entrypoint.sh

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "dist/server.js"]