# syntax=docker/dockerfile:1
# образ линукс Alpine с версией node 14
FROM node:19.5.0-alpine

# рабочая директория
WORKDIR /app

# копирование package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# установка зависимостей
RUN npm install

# копирование всего остального приложения в контейнер
COPY . .

# открыть порт в контейнере
EXPOSE 5000

# запуск сервера
CMD ["npm", "start"]

