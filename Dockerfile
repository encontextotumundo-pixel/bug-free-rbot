FROM node:18-alpine

WORKDIR /app

# Copiar TODO el proyecto
COPY . .

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install

# Establecer variable de entorno para la ubicación raíz del proyecto
ENV PROJECT_ROOT=/app

# Exponer puerto
EXPOSE 8080

# Comando de inicio (ejecutar desde /app/backend)
CMD ["node", "src/index.js"]
