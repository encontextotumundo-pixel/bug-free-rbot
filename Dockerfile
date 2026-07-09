FROM node:18-alpine

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY backend/package.json backend/package-lock.json* ./backend/

# Copiar datos y archivos necesarios
COPY data ./data
COPY public ./public
COPY 5.html resultados.xlsx railway.json ./

# Copiar código del backend
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
