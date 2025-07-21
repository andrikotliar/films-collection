FROM node:24-alpine AS builder

WORKDIR /app

COPY . .

WORKDIR /app/server

RUN npm ci
RUN npm run build
RUN npm run db:client:generate

WORKDIR /app/client

RUN npm ci
RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/server/prisma ./prisma
COPY --from=builder /app/server/package.json ./
COPY --from=builder /app/dataset ./dataset

ENV NODE_ENV=production
EXPOSE 5000

CMD ["sh", "-c", "npm run db:deploy && npm start"]