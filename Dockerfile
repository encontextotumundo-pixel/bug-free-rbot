FROM node:18-alpine

WORKDIR /app

# Copiar TODO el proyecto
COPY . .

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install

# Exponer puerto
EXPOSE 8080

# Comando de inicio (ejecutar desde /app/backend)
CMD ["node", "src/index.js"]
