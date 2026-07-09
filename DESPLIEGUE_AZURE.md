# 🚀 Despliegue en Azure - Guía Completa

## Opción 1: Azure App Service (RECOMENDADO)

Esta es la opción más simple. Tu backend Node.js se ejecutará en la nube.

### Paso 1: Crear cuenta en Azure

1. Ve a [portal.azure.com](https://portal.azure.com)
2. Crea una cuenta (puedes usar prueba gratuita)

---

### Paso 2: Crear App Service

1. **Busca "App Service"** en el portal
2. **Haz clic en "Crear"**
3. **Llena los datos:**
   - **Suscripción:** Selecciona tu suscripción
   - **Grupo de recursos:** Crea uno nuevo (ej: "sms-personalizer")
   - **Nombre:** `tu-nombre-app-service` (debe ser único)
   - **Publicar:** Código
   - **Tiempo de ejecución:** Node 18 LTS
   - **Sistema operativo:** Linux
   - **Plan:** B1 (barato, suficiente)

4. **Haz clic en "Revisar + crear"** → **Crear**

---

### Paso 3: Desplegar tu código a Azure

#### Opción A: Usando Git (MÁS FÁCIL)

1. **En App Service → Centro de implementación**
2. **Selecciona:** Origen: GitHub (o Local Git)
3. **Conecta tu repositorio** o usa Local Git

**Instrucciones para Local Git:**

```bash
# En tu terminal, en la carpeta del proyecto
cd "C:\Users\LENOVO\Documents\proyect exitoso"

# Inicializar Git si no lo has hecho
git init

# Agregar archivos
git add .
git commit -m "Sistema SMS personalizado"

# Agregar remoto de Azure
git remote add azure https://tu-nombre-app-service.scm.azurewebsites.net:443/tu-nombre-app-service.git

# Hacer push a Azure
git push azure master
```

#### Opción B: Usando ZIP (MÁS RÁPIDO)

1. Comprime la carpeta `proyect exitoso`
2. **En App Service → Centro de implementación → Upload ZIP**
3. Sube tu archivo ZIP

---

### Paso 4: Configurar Variables de Entorno en Azure

1. **Ve a App Service → Configuración → Configuración de la aplicación**
2. **Agrega estas variables:**

| Clave | Valor |
|-------|-------|
| `PORT` | `8080` |
| `NODE_ENV` | `production` |
| `RATE_LIMIT_WINDOW` | `5` |
| `RATE_LIMIT_MAX_REQUESTS` | `10` |

3. **Haz clic en Guardar**

---

### Paso 5: Prueba tu App Service

Tu URL será: `https://tu-nombre-app-service.azurewebsites.net`

Prueba:

```bash
curl https://tu-nombre-app-service.azurewebsites.net/health
```

Deberías ver:
```json
{"status":"ok","timestamp":"..."}
```

---

## Opción 2: Usar Azure Blob Storage para archivos estáticos + App Service para API

Si quieres separar archivos estáticos de la API:

### Paso 1: Crear Blob Storage

1. **Busca "Cuentas de almacenamiento"** en Azure
2. **Crea una nueva**
3. **Crea un contenedor:** `public`
4. **Sube tu archivo `5.html` allí**

### Paso 2: Actualizar personalization.js

```javascript
const API_BASE_URL = 'https://tu-nombre-app-service.azurewebsites.net';
const BLOB_URL = 'https://tuacuenta.blob.core.windows.net/public';
```

---

## Opción 3: Azure Blob Storage + Azure Functions (SERVERLESS - MÁS BARATO)

Para máxima eficiencia y bajo costo.

### Paso 1: Crear Function App

1. **Busca "Function App"** en Azure
2. **Crea una nueva**
3. **Configuración:**
   - Runtime: Node.js 18
   - Plan: Consumo (pago por uso)

### Paso 2: Crear Functions para tus APIs

**Crear HTTP Trigger para `/api/client/:token`**

```javascript
// function.json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get"],
      "route": "client/{token}"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```

```javascript
// index.js
const fs = require('fs');
const path = require('path');

module.exports = async function(context, req) {
  const token = req.params.token;
  
  try {
    // Leer desde Azure Table Storage o Blob
    const clientesPath = path.join(__dirname, '../data/clientes-con-tokens.json');
    const data = JSON.parse(fs.readFileSync(clientesPath, 'utf-8'));
    
    const cliente = data.clientes.find(c => c.token_unico === token);
    
    if (!cliente) {
      context.res = {
        status: 404,
        body: { success: false, error: "Cliente no encontrado" }
      };
    } else {
      context.res = {
        status: 200,
        body: {
          success: true,
          data: {
            nombre_completo: cliente.nombre_completo,
            numero_documento: cliente.numero_documento,
            saldo: cliente.saldo,
            estado: cliente.estado
          }
        }
      };
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: { success: false, error: error.message }
    };
  }
};
```

---

## Opción 4: Dominio Personalizado

Una vez tengas tu App Service en Azure:

### Paso 1: Comprar dominio (opcional)

- Compra un dominio en GoDaddy, Namecheap, etc.
- O usa el dominio de Azure: `tu-app-service.azurewebsites.net`

### Paso 2: Conectar dominio a App Service

1. **En App Service → Dominios personalizados**
2. **Agrega tu dominio**
3. **Configura DNS:**
   - Crea registro `CNAME` apuntando a tu App Service
   - Ejemplo: `api.tudominio.com` → `tu-app-service.azurewebsites.net`

### Paso 3: Activar HTTPS/SSL

1. **En App Service → Certificados de TLS/SSL**
2. **Agrega certificado (Azure lo proporciona gratis)**

---

## Conectar personalization.js a Azure

Actualiza tu archivo `public/js/personalization.js`:

### Si usas App Service:

```javascript
// Si en producción:
const API_BASE_URL = window.location.origin === 'file://'
  ? 'http://localhost:3001'  // Para desarrollo local
  : 'https://tu-nombre-app-service.azurewebsites.net';  // Para Azure

// O más simple si ya estás en Azure:
const API_BASE_URL = 'https://tu-nombre-app-service.azurewebsites.net';
```

### Si usas dominio personalizado:

```javascript
const API_BASE_URL = 'https://api.tudominio.com';
```

---

## Paso a Paso Rápido (10 minutos)

### 1. Crear App Service

```bash
# Instala Azure CLI
# Ve a https://learn.microsoft.com/cli/azure/install-azure-cli

# Login
az login

# Crear grupo de recursos
az group create --name sms-personalizer --location eastus

# Crear App Service
az appservice plan create \
  --name sms-plan \
  --resource-group sms-personalizer \
  --sku B1 --is-linux

az webapp create \
  --name mi-sms-app \
  --resource-group sms-personalizer \
  --plan sms-plan \
  --runtime "NODE|18-lts"
```

### 2. Desplegar código

```bash
# Dentro del proyecto
cd "C:\Users\LENOVO\Documents\proyect exitoso"
zip -r app.zip . -x "node_modules/*" ".git/*"

# Desplegar ZIP
az webapp deployment source config-zip \
  --resource-group sms-personalizer \
  --name mi-sms-app \
  --src app.zip
```

### 3. Configurar variables

```bash
az webapp config appsettings set \
  --name mi-sms-app \
  --resource-group sms-personalizer \
  --settings PORT=8080 NODE_ENV=production
```

### 4. Listo!

Tu app está en: `https://mi-sms-app.azurewebsites.net`

---

## Tu URL final

Una vez desplegado, tus enlaces de SMS serán:

```
Hola HOLGER tenemos una oferta exclusiva:
https://tu-nombre-app-service.azurewebsites.net/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

O con dominio personalizado:

```
https://api.tudominio.com/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

---

## Costo Estimado

| Opción | Costo Mensual |
|--------|--------------|
| App Service B1 | $15-20 USD |
| Functions (serverless) | $0-5 USD (pago por uso) |
| Blob Storage | $0.50 USD (50GB) |

---

## Monitoreo en Azure

1. **App Service → Logs** - Ver errores en vivo
2. **App Service → Métricas** - CPU, memoria, solicitudes
3. **App Service → Application Insights** - Analytics completo

---

**¿Necesitas ayuda con algo específico de Azure?**

Puedo ayudarte con:
- ✅ Crear la App Service
- ✅ Configurar dominio personalizado
- ✅ Activar HTTPS
- ✅ Monitoreo y logs
- ✅ Backup de datos
