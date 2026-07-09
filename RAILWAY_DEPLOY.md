# 🚀 Desplegar en Railway

Esta guía te ayuda a desplegar tu backend en Railway en 5 minutos.

## ✅ Prerequisitos

- Cuenta de GitHub
- Este repositorio en GitHub
- Cuenta de Railway (gratis)

## 📋 Pasos

### 1. Ir a Railway

```
https://railway.app
```

### 2. Crear Proyecto

- Click: **"New Project"**
- Selecciona: **"Deploy from GitHub"**
- Conecta tu repositorio

### 3. Configurar

En Railway → Variables de entorno:

```
PORT=8080
NODE_ENV=production
RATE_LIMIT_WINDOW=5
RATE_LIMIT_MAX_REQUESTS=10
```

### 4. Deploy

Railway automáticamente:
- Instala dependencias (`npm install`)
- Inicia tu app (`npm start`)

### 5. Obtener URL

Railway te muestra la URL así:

```
https://[tu-app].up.railway.app
```

Cópiala.

## 🔗 Actualizar tu código

**Archivo:** `public/js/personalization.js`

Cambia:
```javascript
const API_BASE_URL = 'https://sms-api-produccion.up.railway.app';
```

Por tu URL real de Railway:
```javascript
const API_BASE_URL = 'https://[tu-app].up.railway.app';
```

Luego haz git push y Railway se redeploy automáticamente.

## ✅ Verificar

```bash
curl https://[tu-app].up.railway.app/health
```

Deberías ver:
```json
{"status":"ok","timestamp":"..."}
```

## 📊 Ver Logs

En Railway → Logs (en tiempo real)

## 💰 Costo

- Primer mes: **GRATIS** ($5 crédito)
- Después: ~$2-3 USD/mes (máximo)

---

**¿Problemas?** Ver `PASOS_EXACTOS_BLOB_RAILWAY.md`
