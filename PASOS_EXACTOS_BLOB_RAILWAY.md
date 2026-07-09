# 📋 Pasos Exactos: Blob Storage + Railway

## Resumen
- **Frontend:** Azure Blob Storage (5.html)
- **Backend:** Railway (API Node.js)
- **Tiempo:** 30 minutos

---

## ⏱️ PASO 1: Preparar tu código (5 min)

### 1.1 Actualizar `backend/.env`

**Archivo:** `backend/.env`

```env
PORT=8080
NODE_ENV=production
RATE_LIMIT_WINDOW=5
RATE_LIMIT_MAX_REQUESTS=10
LOG_FILE=events.json
```

**Importante:** PORT=8080 (no 3000)

---

### 1.2 Actualizar `personalization.js`

**Archivo:** `public/js/personalization.js`

Busca esta línea (al inicio del archivo):

```javascript
// BUSCA ESTO:
const API_BASE_URL = (() => {
  // Si está en development local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return `http://localhost:3001`;
  }

  // Si está en producción (cualquier dominio)
  return window.location.origin;
})();
```

**REEMPLAZA CON:**

```javascript
// REEMPLAZA CON ESTO:
const API_BASE_URL = 'https://sms-api-produccion.up.railway.app';
```

**Nota:** Después de desplegar Railway, sabrás la URL exacta y la cambias.

---

### 1.3 Git commit

```bash
cd "C:\Users\LENOVO\Documents\proyect exitoso"

git add .
git commit -m "Preparar para Blob Storage + Railway"
git push origin main
```

---

## 🌐 PASO 2: Desplegar Backend en Railway (10 min)

### 2.1 Ir a Railway

```
https://railway.app
```

### 2.2 Crear proyecto

1. **Click:** "New Project"
2. **Selecciona:** "GitHub Repo"
3. **Conecta:** Tu repositorio GitHub
4. **Selecciona:** Tu rama (main)

### 2.3 Configurar variables

En Railway → Variables:

```
PORT=8080
NODE_ENV=production
```

### 2.4 Deploy

**Railway automáticamente te da una URL:**

```
https://sms-api-produccion.up.railway.app
```

(La URL será diferente, cópiala)

### 2.5 Verificar

```bash
# En terminal:
curl https://sms-api-produccion.up.railway.app/health

# Deberías ver:
{"status":"ok","timestamp":"..."}
```

---

## 🆙 PASO 3: Actualizar personalization.js con URL real de Railway (3 min)

Ahora que tienes la URL de Railway real:

**Archivo:** `public/js/personalization.js`

```javascript
// CAMBIAR ESTO:
const API_BASE_URL = 'https://sms-api-produccion.up.railway.app';

// POR TU URL REAL DE RAILWAY:
const API_BASE_URL = 'https://[TU-URL-DE-RAILWAY]';
```

**Git push:**

```bash
git add public/js/personalization.js
git commit -m "Actualizar URL de Railway"
git push origin main

# Railway se redeploy automáticamente
```

---

## 📦 PASO 4: Azure Blob Storage (10 min)

### 4.1 Crear Blob Storage Account

1. **portal.azure.com**
2. **Busca:** "Cuentas de almacenamiento"
3. **+ Crear**
4. **Rellena:**
   - Nombre: `tucuentasms` (debe ser único)
   - Región: USA East (o cercana)
5. **Crear**

### 4.2 Crear Contenedor

1. **Cuenta → Contenedores**
2. **+ Contenedor**
3. **Nombre:** `public`
4. **Nivel de acceso:** Anónimo (lectura pública)
5. **Crear**

### 4.3 Subir 5.html

**Opción A: Portal (más simple)**
1. Contenedor `public` → Cargar
2. Selecciona `5.html`
3. Cargar

**Opción B: CLI**
```bash
az storage blob upload \
  --account-name tucuentasms \
  --container-name public \
  --name 5.html \
  --file "C:\Users\LENOVO\Documents\proyect exitoso\5.html"
```

### 4.4 Tu URL de Blob será:

```
https://tucuentasms.blob.core.windows.net/public/5.html
```

**Pruébalo en navegador. Deberías ver tu página.**

---

## 🔐 PASO 5: Configurar CORS en Blob (5 min)

**Necesario para que Blob pueda llamar a Railway API.**

### Opción A: Azure CLI (recomendado)

```bash
az storage cors add \
  --account-name tucuentasms \
  --methods GET POST OPTIONS \
  --origins '*' \
  --allowed-headers '*' \
  --exposed-headers '*' \
  --max-age 3600 \
  --services b
```

### Opción B: Portal Azure

1. Cuenta de almacenamiento → Configuración → CORS
2. Agrega:
   ```
   Orígenes permitidos: *
   Métodos: GET, POST, OPTIONS
   Encabezados permitidos: *
   Encabezados expuestos: *
   Edad máxima: 3600
   ```
3. Guardar

---

## 🧪 PASO 6: Pruebas (5 min)

### 6.1 Probar 5.html en Blob

```
https://tucuentasms.blob.core.windows.net/public/5.html
```

Deberías ver: **La página 5.html se carga**

### 6.2 Probar API en Railway

```bash
curl https://sms-api-produccion.up.railway.app/api/client/13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

Deberías ver:
```json
{"success":true,"data":{"nombre_completo":"HOLGER ANTONIO ORTEGA PINEDA",...}}
```

### 6.3 Prueba Completa

Abre en navegador CON PARÁMETRO:

```
https://tucuentasms.blob.core.windows.net/public/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

**¡IMPORTANTE!** Abre la consola (F12) y busca errores.

Deberías ver:
- ✅ Página carga desde Blob
- ✅ JavaScript carga
- ✅ Datos aparecen en la tarjeta
- ✅ Nombre: HOLGER ANTONIO ORTEGA PINEDA
- ✅ Documento: 5489709

---

## 📱 PASO 7: Tu SMS Final

```
Hola HOLGER tenemos una oferta exclusiva para ti:
https://tucuentasms.blob.core.windows.net/public/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

**Cuando el cliente abre el enlace:**
1. ✅ Ve su página personalizada
2. ✅ Con su nombre
3. ✅ Con su documento
4. ✅ Con su saldo

---

## 🔍 CHECKLIST FINAL

- [ ] `backend/.env` tiene PORT=8080
- [ ] `backend/.env` tiene NODE_ENV=production
- [ ] `personalization.js` apunta a Railway
- [ ] Git push a GitHub
- [ ] Railway desplegado y corriendo
- [ ] Blob Storage cuenta creada
- [ ] Contenedor `public` creado
- [ ] 5.html subido a Blob
- [ ] CORS configurado en Blob
- [ ] Probé en navegador (F12 sin errores)
- [ ] Datos aparecen personalizados

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### "Error CORS"
**Solución:** Configurar CORS en Blob (Paso 5)

```bash
az storage cors add \
  --account-name tucuentasms \
  --methods GET POST OPTIONS \
  --origins '*' \
  --allowed-headers '*' \
  --exposed-headers '*' \
  --max-age 3600 \
  --services b
```

### "Cliente no encontrado"
**Soluciones:**
1. Verificar que el token sea correcto
2. Ver logs de Railway: `railway logs`
3. Verificar que datos están en `data/clientes-con-tokens.json`

### "Archivo no encontrado"
**Solución:** Verificar que 5.html está en Blob

```bash
az storage blob list \
  --account-name tucuentasms \
  --container-name public
```

### "API no responde"
**Soluciones:**
1. Verificar URL de Railway es correcta
2. Ver si Railway desplegó: `railway status`
3. Ver logs: `railway logs`

---

## 📊 URLS FINALES

**Frontend (Blob Storage):**
```
https://tucuentasms.blob.core.windows.net/public/5.html
```

**Backend (Railway):**
```
https://sms-api-produccion.up.railway.app
```

**Enlace SMS Completo:**
```
https://tucuentasms.blob.core.windows.net/public/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

---

## 💰 COSTOS

| Servicio | Costo |
|----------|-------|
| Azure Blob Storage | ~$0.50/mes |
| Railway | $0 (1er mes), $2-3 después |
| **TOTAL** | **~$0.50 - $3.50/mes** |

---

**¿Terminaste todos los pasos?** ✓

Ahora sí, tu sistema está completamente funcional:
- Frontend en Azure Blob
- Backend en Railway
- ¡Listo para enviar SMS!

¿Necesitas ayuda en algún paso? 👇
