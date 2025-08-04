# File: backend/Dockerfile

# --- Этап 1: Сборка ---
FROM node:18-slim AS builder

WORKDIR /app

# ШАГ 1: Копируем ТОЛЬКО package.json.
# Мы намеренно НЕ копируем package-lock.json. Это заставит npm
# перестроить дерево зависимостей с нуля специально для Linux-окружения.
# Это ГАРАНТИРОВАННО решает проблему с опциональными нативными модулями.
COPY package.json ./

# ШАГ 2: Запускаем npm install.
# Без lock-файла, npm установит все зависимости, включая нужные для Linux.
RUN npm install

# ШАГ 3: Теперь копируем весь остальной код приложения.
COPY . .

# ШАГ 4: Запускаем сборку.
RUN npm run build

# --- Этап 2: Финальный образ ---
FROM node:18-slim AS production

WORKDIR /usr/src/app

# Копируем результат сборки и package.json для установки production-зависимостей
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Устанавливаем ТОЛЬКО production-зависимости в чистой среде
RUN npm ci --only=production

# Мы копируем папку 'public' из этапа 'builder' в текущую рабочую директорию.
COPY --from=builder /app/public ./public

# Команда для запуска приложения
CMD ["node", "dist/main"]
