# 🔗 Azure Blob Storage + API Externa

Tu arquitectura perfecta:
- **Frontend (5.html):** Azure Blob Storage
- **Backend (API):** Railway/Render/DigitalOcean

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  USUARIO ABRE ENLACE SMS                                │
│  ↓                                                       │
│  https://tuacuenta.blob.core.windows.net/public/5.html  │
│  │                                                       │
│  ├─→ Azure Blob Storage (descarga 5.html)              │
│  │                                                       │
│  └─→ JavaScript ejecuta personalization.js              │
│      │                                                   │
│      └─→ Llama API externa: https://api.railway.app     │
│          │                                               │
│          ├─→ Backend obtiene cliente del Excel           │
│          │                                               │
│          └─→ Devuelve JSON con datos                    │
│              │                                           │
│              └─→ JavaScript rellena tarjeta en 5.html   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 PASO A PASO

### PASO 1: Crear Cuenta en Azure Storage

1. **Ve a [portal.azure.com](https://portal.azure.com)**
2. **Busca "Cuentas de almacenamiento"**
3. **Crea una nueva:**
   - Nombre: `tucuentasms` (debe ser único)
   - Rendimiento: Standard
   - Redundancia: Locally-redundant storage (LRS) - más barato
   - Región: Usa East (o cercana)
4. **Crear** ✓

---

### PASO 2: Crear Contenedor en Blob Storage

1. **En la Cuenta de almacenamiento → Contenedores**
2. **+ Contenedor nuevo**
3. **Nombre:** `public`
4. **Nivel de acceso:** Anónimo (lectura pública)
5. **Crear** ✓

---

### PASO 3: Subir 5.html a Blob Storage

#### Opción A: Azure Portal (más simple)

1. **Contenedor `public` → Cargar**
2. **Selecciona tu archivo `5.html`**
3. **Cargar** ✓

#### Opción B: Azure CLI

```bash
# Instala Azure CLI
# https://learn.microsoft.com/cli/azure/install-azure-cli

# Login
az login

# Subir archivo
az storage blob upload \
  --account-name tucuentasms \
  --container-name public \
  --name 5.html \
  --file "C:\Users\LENOVO\Documents\proyect exitoso\5.html"
```

#### Opción C: Azure Storage Explorer (GUI)

1. Descarga desde Microsoft
2. Conecta tu cuenta
3. Arrastra y suelta 5.html

---

### PASO 4: Obtener URL de tu 5.html

**Después de subir, la URL será:**

```
https://tucuentasms.blob.core.windows.net/public/5.html
```

Pruébalo en el navegador. Deberías ver tu página.

---

### PASO 5: Configurar CORS en Blob Storage

**Necesitas esto para que el JavaScript pueda llamar a la API externa.**

#### Opción A: Azure Portal

1. **Cuenta de almacenamiento → Configuración → CORS**
2. **Agrega:**
   ```
   Orígenes permitidos: https://tucuentasms.blob.core.windows.net
   Métodos permitidos: GET, POST, OPTIONS
   Encabezados permitidos: *
   Encabezados expuestos: *
   Edad máxima: 3600
   ```
3. **Guardar** ✓

#### Opción B: Azure CLI

```bash
az storage cors add \
  --account-name tucuentasms \
  --methods GET POST OPTIONS \
  --origins https://tucuentasms.blob.core.windows.net \
  --allowed-headers '*' \
  --exposed-headers '*' \
  --max-age 3600 \
  --services b
```

---

### PASO 6: Desplegar API en Railway

**Tu backend Node.js irá en Railway.**

1. **railway.app → New Project**
2. **GitHub → Conecta tu repo**
3. **Variables:**
   ```
   PORT=8080
   NODE_ENV=production
   ```
4. **Deploy** ✓

**Tu API estará en:**
```
https://sms-api-produccion.up.railway.app
```

---

### PASO 7: Actualizar personalization.js

**Cambiar para que apunte a Railway.**

```javascript
// public/js/personalization.js

// ANTES (localhost):
// const API_BASE_URL = 'http://localhost:3001';

// DESPUÉS (Railway):
const API_BASE_URL = 'https://sms-api-produccion.up.railway.app';

// El resto del código NO cambia
```

---

### PASO 8: Subir personalization.js actualizado

```bash
# Actualizar en GitHub
git add public/js/personalization.js
git commit -m "Actualizar API URL a Railway"
git push origin main

# Railway se redeploy automáticamente
```

**También sube a Blob Storage si necesitas:**
```bash
az storage blob upload \
  --account-name tucuentasms \
  --container-name public \
  --name personalization.js \
  --file "C:\Users\LENOVO\Documents\proyect exitoso\public\js\personalization.js"
```

---

## 🔑 TUS URLS FINALES

### URL de 5.html (en Azure Blob):
```
https://tucuentasms.blob.core.windows.net/public/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

### URL de API (en Railway):
```
https://sms-api-produccion.up.railway.app/api/client/13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

### Tu SMS sería:
```
Hola HOLGER tenemos una oferta exclusiva:
https://tucuentasms.blob.core.windows.net/public/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

---

## 💰 COSTOS FINALES

| Componente | Servicio | Costo |
|-----------|----------|-------|
| Frontend (5.html) | Azure Blob Storage | ~$0.50/mes |
| Backend (API) | Railway | $0 (gratis 1er mes) |
| **TOTAL** | | **~$0.50/mes** |

(Después de Railway: $2-3/mes si pasas crédito gratis)

---

## 🧪 PRUEBAS

### 1. Verificar Blob Storage
```bash
# En el navegador:
https://tucuentasms.blob.core.windows.net/public/5.html

# Deberías ver tu página
```

### 2. Verificar API en Railway
```bash
# En terminal:
curl https://sms-api-produccion.up.railway.app/health

# Respuesta esperada:
{"status":"ok","timestamp":"..."}
```

### 3. Prueba completa
```bash
# Abre en navegador:
https://tucuentasms.blob.core.windows.net/public/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e

# Deberías ver los datos del cliente personalizados
```

---

## 🔧 TROUBLESHOOTING

### Error: "CORS error" en consola

**Solución:** Configurar CORS en Blob Storage (Paso 5)

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

---

### Error: "Cliente no encontrado" en API

**Solución:** Verificar que:
1. El token es correcto
2. Railway está ejecutando correctamente
3. Datos están en `data/clientes-con-tokens.json`

```bash
# Ver logs de Railway
railway logs
```

---

### Error: "Archivo no encontrado" en Blob

**Solución:** Verificar que 5.html está subido

```bash
# Listar archivos en Blob
az storage blob list \
  --account-name tucuentasms \
  --container-name public

# Deberías ver 5.html
```

---

## 📝 RESUMEN FINAL

### Tu arquitectura será:

```
┌───────────────────────┐
│  USUARIO              │
│  ↓                    │
│  SMS CON ENLACE       │
└──────────┬────────────┘
           │
           ├─→ Frontend: Azure Blob Storage
           │   URL: https://tucuentasms.blob.core.windows.net/5.html
           │   • Archivo 5.html estático
           │   • HTTPS gratis
           │   • Muy rápido
           │
           └─→ Backend: Railway
               URL: https://sms-api-produccion.up.railway.app
               • API Node.js
               • Datos en Excel
               • $0/mes (gratis)
```

### Flujo del usuario:

1. Recibe SMS con enlace de Blob
2. Abre 5.html desde Azure
3. JavaScript carga datos de Railway
4. Ve información personalizada
5. Sistema registra evento

---

## ✅ CHECKLIST

- [ ] Crear Blob Storage en Azure
- [ ] Crear contenedor `public`
- [ ] Subir 5.html a Blob
- [ ] Configurar CORS
- [ ] Desplegar API en Railway
- [ ] Actualizar personalization.js con URL de Railway
- [ ] Probar en navegador
- [ ] Probar SMS real

---

**¿Preguntas sobre algún paso?** 👇
