FROM node:18-alpine

WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install

# Volver a la raíz
WORKDIR /app

# Exponer puerto
EXPOSE 8080

# Comando de inicio
CMD ["node", "backend/src/index.js"]
