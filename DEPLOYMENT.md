# 🚀 Guía de Despliegue

## Despliegue Local (Desarrollo)

### 1. Instalación

```bash
cd backend
npm install
```

### 2. Iniciar Servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

---

## Despliegue en Producción

### Opción 1: Usando Node.js en tu servidor

#### Requisitos:
- Node.js 16+ instalado
- Puerto 3000 disponible (o el que configures)

#### Pasos:

1. **Subir archivos al servidor**
```bash
scp -r backend/ usuario@tuservidor.com:/app/
scp -r data/ usuario@tuservidor.com:/app/
scp 5.html usuario@tuservidor.com:/app/
```

2. **Conectar y configurar**
```bash
ssh usuario@tuservidor.com
cd /app
npm install --production
```

3. **Configurar variables de entorno**
```bash
nano backend/.env
```

4. **Iniciar servidor**
```bash
cd backend
npm start
```

5. **Usar PM2 para mantener el servicio activo**
```bash
npm install -g pm2
pm2 start src/index.js --name "sms-personalizer"
pm2 startup
pm2 save
```

---

### Opción 2: Docker

#### Crear Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install --production

COPY backend/src ./src
COPY data ./data

ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/index.js"]
```

#### Crear docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

#### Iniciar con Docker

```bash
docker-compose up -d
```

---

### Opción 3: Azure App Service

1. **Crear aplicación en Azure Portal**
2. **Configurar despliegue desde Git**
3. **Asignar dominio personalizado**
4. **Configurar SSL/HTTPS**
5. **Variables de entorno en Azure Portal**

---

## Configurar Dominio Personalizado

### Actualizar URL en personalization.js

```javascript
// Cambiar de:
const API_BASE_URL = 'http://localhost:3000';

// A:
const API_BASE_URL = 'https://tudominio.com/api';
```

### Configurar HTTPS

1. Obtener certificado SSL (Let's Encrypt recomendado)
2. Usar Nginx como proxy inverso:

```nginx
server {
    listen 443 ssl;
    server_name tudominio.com;

    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## Monitoreo y Logs

### Ver logs en vivo

```bash
pm2 logs sms-personalizer
```

### Ver eventos registrados

```bash
cat data/events.json | jq '.'
```

### Configurar rotación de logs

```bash
npm install -g pm2-logrotate
pm2 install pm2-logrotate
```

---

## Escalabilidad

### Múltiples instancias con PM2 Cluster Mode

```bash
pm2 start src/index.js -i 4 --name "sms-personalizer"
```

### Load Balancer (Nginx)

```nginx
upstream api_servers {
    server localhost:3001;
    server localhost:3002;
    server localhost:3003;
    server localhost:3004;
}

server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://api_servers;
    }
}
```

---

## Respaldo y Recuperación

### Hacer backup de datos

```bash
# Diariamente
0 2 * * * cp -r /app/data /backups/data-$(date +%Y%m%d).bak
```

### Restaurar desde backup

```bash
cp -r /backups/data-20260709.bak/* /app/data/
```

---

## Checklist de Despliegue

- [ ] Node.js 16+ instalado en servidor
- [ ] `.env` configurado correctamente
- [ ] Datos de clientes en `data/RESULTADOS.json`
- [ ] Puerto 3000 abierto (o configurado)
- [ ] HTTPS/SSL configurado
- [ ] PM2 o similar para persistencia
- [ ] Backup automático configurado
- [ ] Monitoreo de logs activo
- [ ] Rate limiting ajustado si es necesario
- [ ] Pruebas de carga realizadas

---

## Solución de Problemas

### Error: "Puerto 3000 ya en uso"

```bash
# Encontrar proceso
lsof -i :3000

# Matar proceso
kill -9 <PID>
```

### Error: "ENOENT: no such file or directory"

Asegúrate de que existan:
- `backend/src/index.js`
- `data/RESULTADOS.json`
- `data/events.json`

### Cliente no recibe datos

1. Verifica que el token sea válido
2. Revisa los logs: `pm2 logs`
3. Prueba con curl:

```bash
curl http://localhost:3000/api/client/d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9
```

---

**Última actualización:** 2026-07-09
