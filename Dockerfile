FROM node:18-alpine

WORKDIR /app

# Copiar archivos críticos primero
COPY package.json package-lock.json* ./
COPY backend/package.json backend/package-lock.json* ./backend/
COPY public ./public
COPY data ./data
COPY 5.html resultados.xlsx railway.json ./
COPY backend/src ./backend/src

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install

# Volver a la raíz
WORKDIR /app

# Exponer puerto
EXPOSE 8080

# Comando de inicio
CMD ["node", "backend/src/index.js"]
