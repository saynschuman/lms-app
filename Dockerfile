# Specify the node base image
FROM node:18.17.0

# Создайте директорию приложения
WORKDIR /app

# Копируйте файлы проекта
COPY . .

# Запускайте приложение с помощью команды node
CMD ["node", ".next/standalone/server.js"]
