FROM node:18-alpine

WORKDIR /app

# Copiar TODO el proyecto (excepto lo que está en .dockerignore)
COPY . .

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install

# Volver a la raíz del proyecto
WORKDIR /app

# Crear carpeta de datos si no existe
RUN mkdir -p /app/data

# Exponer puerto
EXPOSE 8080

# Mostrar qué se copió (para debug)
RUN ls -la /app/data/

# Comando de inicio
CMD ["node", "backend/src/index.js"]
