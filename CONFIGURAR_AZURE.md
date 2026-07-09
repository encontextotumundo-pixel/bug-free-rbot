# 🔧 Configurar tu Proyecto para Azure

Tu proyecto ya está listo para Azure, pero aquí te muestro qué cambiar.

---

## 1️⃣ Cambiar Puerto en .env

Azure usa puerto **8080**, no 3000.

**Archivo: `backend/.env`**

```env
PORT=8080                          # ← CAMBIAR DE 3000 A 8080
NODE_ENV=production                # ← CAMBIAR A production
RATE_LIMIT_WINDOW=5
RATE_LIMIT_MAX_REQUESTS=10
LOG_FILE=events.json
```

---

## 2️⃣ Crear .gitignore (si usas Git)

**Archivo: `backend/.gitignore`**

```
node_modules/
.env
.env.local
*.log
npm-debug.log*
.DS_Store
.vscode/
```

---

## 3️⃣ Actualizar package.json

Tu `backend/package.json` ya está bien, pero asegúrate:

```json
{
  "name": "sms-personalization-backend",
  "version": "1.0.0",
  "description": "SMS personalizado",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "uuid": "^9.0.0",
    "xlsx": "^0.18.5"
  }
}
```

**Nota:** `npm install` instalará todo automáticamente en Azure.

---

## 4️⃣ Estructura de Carpetas para Azure

Tu proyecto debe verse así:

```
proyect exitoso/
├── backend/
│   ├── src/
│   │   ├── index.js              ← PUNTO DE ENTRADA
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── db/
│   ├── package.json
│   ├── .env                       ← PORT=8080
│   └── .gitignore
├── data/
│   ├── clientes-con-tokens.json   ← Datos de clientes
│   └── events.json                ← Registro de eventos
├── public/
│   └── js/
│       └── personalization.js     ← Script frontend
├── 5.html                         ← Página personalizada
└── resultados.xlsx                ← Excel original
```

---

## 5️⃣ Variables de Entorno en Azure Portal

Cuando despliegues a Azure, debes agregar estas variables:

**En Azure Portal → App Service → Configuración → Configuración de la aplicación**

| Clave | Valor | Descripción |
|-------|-------|-------------|
| `PORT` | `8080` | Puerto que usa Azure |
| `NODE_ENV` | `production` | Modo producción |
| `WEBSITE_NODE_DEFAULT_VERSION` | `18.17.0` | Versión de Node |
| `RATE_LIMIT_WINDOW` | `5` | Minutos |
| `RATE_LIMIT_MAX_REQUESTS` | `10` | Máximo por ventana |

---

## 6️⃣ Cambios al Código (Opcional)

### Si quieres usar Azure Storage en lugar de archivos locales:

**Instalar SDK de Azure:**

```bash
npm install @azure/storage-blob --save
```

**Usar en database.js:**

```javascript
import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'data';

// Leer clientes desde Blob
const blobClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobClient.getContainerClient(containerName);
const blockBlobClient = containerClient.getBlockBlobClient('clientes-con-tokens.json');
const downloadBlockBlobResponse = await blockBlobClient.download(0);
const data = JSON.parse(await streamToString(downloadBlockBlobResponse.readableStreamBody));
```

**Pero por ahora, los archivos locales funcionan bien.**

---

## 7️⃣ Desplegar a Azure

### Opción A: Git Push (Recomendado)

```bash
# 1. Inicializar Git
cd "C:\Users\LENOVO\Documents\proyect exitoso"
git init
git add .
git commit -m "Sistema SMS personalizado"

# 2. Agregar remoto de Azure
# (Copiar de Azure Portal → Centro de implementación → Local Git)
git remote add azure https://tu-usuario:password@tu-app-service.scm.azurewebsites.net/tu-app-service.git

# 3. Desplegar
git push azure master
```

### Opción B: ZIP Upload (Más simple)

```bash
# 1. Comprimir
cd "C:\Users\LENOVO\Documents\proyect exitoso"
Compress-Archive -Path * -DestinationPath app.zip -Force

# 2. Desplegar (en Azure Portal)
# App Service → Centro de implementación → Upload ZIP
# Arrastra app.zip y suelta
```

### Opción C: Azure CLI

```bash
# 1. Comprimir sin node_modules
zip -r app.zip . -x "node_modules/*" ".git/*" "*.log"

# 2. Desplegar
az webapp deployment source config-zip \
  --resource-group tu-grupo \
  --name tu-app-service \
  --src app.zip
```

---

## 8️⃣ Verificar Despliegue

**Una vez en Azure:**

```bash
# Health check
curl https://tu-app-service.azurewebsites.net/health

# Obtener cliente
curl https://tu-app-service.azurewebsites.net/api/client/13f3612f-2002-4440-9f4d-8fb3ca8be22e

# Ver logs
az webapp log tail --name tu-app-service --resource-group tu-grupo
```

---

## 9️⃣ URL Final para SMS

Una vez en Azure, tu URL será:

```
https://tu-app-service.azurewebsites.net/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

O con dominio personalizado:

```
https://api.tudominio.com/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

---

## 🔟 Checklist Final

Antes de desplegar, verifica:

- [ ] `backend/.env` tiene `PORT=8080`
- [ ] `backend/.env` tiene `NODE_ENV=production`
- [ ] `backend/package.json` existe y tiene todas las dependencias
- [ ] `data/clientes-con-tokens.json` existe
- [ ] `public/js/personalization.js` está presente
- [ ] `5.html` tiene la línea `<script src="public/js/personalization.js"></script>`
- [ ] Probaste localmente: `npm run dev`
- [ ] Creaste App Service en Azure
- [ ] Subiste el código

---

## 🎯 Lo Que Sigue

1. **Crea App Service en Azure** (5 min)
2. **Desplega tu código** (2 min)
3. **Prueba la URL** (1 min)
4. **Usa en SMS** ✓

---

## 💡 Tips Importantes

- **Azure genera HTTPS automáticamente** ✓
- **No necesitas comprar SSL** ✓
- **Los datos se guardan en archivos JSON** ✓
- **Puedes cambiar a Base de Datos después** ✓
- **Backup automático cada día** ✓

---

**¿Necesitas ayuda con algo específico?**

Escribe el paso donde te ataques y te ayudo. 👇
