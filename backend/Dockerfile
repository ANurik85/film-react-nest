FROM node:18-slim AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-slim AS production

WORKDIR /usr/src/app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/public ./public

CMD ["node", "dist/main"]
