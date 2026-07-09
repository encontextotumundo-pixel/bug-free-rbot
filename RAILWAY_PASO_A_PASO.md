# 🚀 Railway - Paso a Paso (CON SCREENSHOTS)

## Paso 1: Acceder a Railway Dashboard

**URL:** `https://dashboard.railway.app`

### Qué deberías ver:
```
┌─────────────────────────────────────┐
│  Railway                            │
│  ├─ New Project                     │
│  ├─ Projects                        │
│  └─ Settings                        │
└─────────────────────────────────────┘
```

---

## Paso 2: Crear o Verificar Proyecto

### Si NO tienes proyecto aún:
1. Click: **"New Project"**
2. Selecciona: **"Deploy from GitHub repo"**
3. Busca: Tu repositorio (ejemplo: `mi-sms`)
4. Confirma: **"Deploy now"**

### Si YA conectaste GitHub:
Deberías ver tu proyecto con estado **"Waiting for deployment"**

---

## Paso 3: Configurar Variables de Entorno

**En Railroad Dashboard:**

1. Click en tu proyecto
2. Vé a: **"Variables"** (en el menú lateral)
3. Agrega estas variables:

```
PORT                    8080
NODE_ENV                production
RATE_LIMIT_WINDOW       5
RATE_LIMIT_MAX_REQUESTS 10
```

**Pantalla debería verse así:**
```
┌──────────────────────────────────────┐
│  Variables                           │
├──────────────────────────────────────┤
│  PORT                  8080          │
│  NODE_ENV              production    │
│  RATE_LIMIT_WINDOW     5             │
│  RATE_LIMIT_MAX_REQUESTS 10          │
└──────────────────────────────────────┘
```

---

## Paso 4: Verificar Configuración de Despliegue

**En Railway Dashboard:**

1. Click: **"Deployments"** (menú lateral)
2. Deberías ver:
   - **Status:** Building / Deploying / Success
   - **Logs:** Mostrando progreso

**Espera hasta ver: ✅ "Deployment Successful"**

---

## Paso 5: Obtener tu URL de Railway

**En el Dashboard:**

1. Click en tu **Servicio** (lado izquierdo)
2. Vé a la pestaña: **"Settings"**
3. Busca: **"Domains"** o **"Public URL"**
4. Tu URL será algo como:
```
https://sms-api-produccion.up.railway.app
```

**Copia esta URL** (la necesitarás en el siguiente paso)

---

## Paso 6: Verificar que funciona

**En tu terminal:**

```bash
# Reemplaza con tu URL real de Railway
curl https://sms-api-produccion.up.railway.app/health
```

**Deberías ver:**
```json
{"status":"ok","timestamp":"2026-07-09T..."}
```

Si ves esto, ✅ **¡Railway está corriendo!**

---

## Paso 7: Ver Logs en vivo

**En Railway Dashboard:**

1. Click en tu proyecto
2. Vé a: **"Logs"**
3. Verás logs en tiempo real:

```
🚀 Servidor ejecutándose en puerto 8080
📍 URL: http://0.0.0.0:8080
🏥 Health check: http://0.0.0.0:8080/health
✅ Clientes cargados desde archivo guardado: 20
```

Si ves esto, ✅ **¡Todo está corriendo perfectamente!**

---

## Paso 8: Actualizar personalization.js

**Importante: Hazlo AHORA mientras tienes la URL**

### En tu PC local:

**Archivo:** `public/js/personalization.js`

**Busca esta línea (al principio):**
```javascript
// ESTO:
const API_BASE_URL = 'https://sms-api-produccion.up.railway.app';
```

**Reemplaza con tu URL REAL de Railway:**
```javascript
// POR ESTO (con tu URL real):
const API_BASE_URL = 'https://[TU-URL-REAL-DE-RAILWAY]';
```

**Ejemplo real:**
```javascript
// Si tu URL es: https://mi-sms-abc123.up.railway.app
// Cambias a:
const API_BASE_URL = 'https://mi-sms-abc123.up.railway.app';
```

---

## Paso 9: Git Push para actualizar Railway

**En tu terminal:**

```bash
cd "C:\Users\LENOVO\Documents\proyect exitoso"

# Agregar cambio
git add public/js/personalization.js

# Commit
git commit -m "Actualizar URL de Railway en personalization.js"

# Push
git push origin master
```

**¿Qué pasa después?**
- Railway detecta automáticamente el push
- Se redeploy automáticamente
- El proyecto se actualiza en segundos

---

## Paso 10: Verificar que la URL está actualizada

**En Railway Dashboard:**

1. Vé a **"Logs"**
2. Deberías ver:
```
🚀 Servidor ejecutándose en puerto 8080
✅ Clientes cargados desde archivo guardado: 20
```

**¡Listo!** Tu backend en Railway está corriendo con la URL actualizada.

---

## ✅ Checklist Railway

- [ ] Cuenta Railway creada
- [ ] GitHub conectado a Railway
- [ ] Proyecto aparece en Railway
- [ ] Variables configuradas (PORT=8080, NODE_ENV=production)
- [ ] Despliegue completado (Status: Success)
- [ ] Logs muestran "Servidor ejecutándose"
- [ ] URL de Railway obtenida
- [ ] personalization.js actualizado con URL real
- [ ] Git push realizado
- [ ] Redeploy completado

---

## 🆘 Solución de Problemas

### Error: "Deployment Failed"
**Solución:**
1. Vé a **Logs**
2. Lee el error específico
3. Probablemente falta alguna variable de entorno
4. Agrega la variable que falta en **Variables**
5. Railway se redeploy automáticamente

### Error: "Cannot find module"
**Solución:**
1. Verifica que `npm install` se ejecutó
2. En Railway Logs deberías ver:
```
npm install
npm start
```
3. Si no ves esto, Railway no reconoce el package.json
4. Verifica que `railway.json` está en la raíz

### Error: "Port already in use"
**Solución:** Ya tiene PORT=8080 en .env, debería estar bien.

### No veo los logs
**Solución:**
1. Vé a Dashboard → Tu Proyecto
2. Click en **"Logs"** en la pestaña
3. Espera 10 segundos
4. Los logs aparecerán

---

## 📊 URLs de Railway

**Tu Dashboard:**
```
https://dashboard.railway.app
```

**Tu Proyecto:**
```
https://dashboard.railway.app/project/[project-id]
```

**API en vivo:**
```
https://[tu-app].up.railway.app
```

**Health check:**
```
https://[tu-app].up.railway.app/health
```

**Cliente específico:**
```
https://[tu-app].up.railway.app/api/client/TOKEN
```

---

## 🎯 Siguiente Paso

Una vez que Railway está corriendo:

1. ✅ Railway backend corriendo con URL actualizada
2. ⏳ Siguiente: **Azure Blob Storage** (para 5.html)

Ver: `BLOB_DEPLOY.md`

---

**¿Necesitas ayuda?** Muéstrame:
1. Tu URL de Railway
2. Screenshot de los Logs
3. Si tienes errores, comparte el mensaje exacto
