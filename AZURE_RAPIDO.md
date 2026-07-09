# ⚡ Azure en 5 Minutos

## Lo Más Simple: Azure App Service

### Opción 1️⃣: Con Azure CLI (Recomendado)

```bash
# 1. Login en Azure
az login

# 2. Crear grupo
az group create --name sms --location eastus

# 3. Crear plan
az appservice plan create --name sms-plan --resource-group sms --sku B1 --is-linux

# 4. Crear App Service
az webapp create --name mi-sms-xyz --resource-group sms --plan sms-plan --runtime "NODE|18-lts"

# 5. Desplegar (desde la carpeta del proyecto)
cd "C:\Users\LENOVO\Documents\proyect exitoso"
zip -r app.zip . -x "node_modules/*"
az webapp deployment source config-zip --resource-group sms --name mi-sms-xyz --src app.zip

# 6. Configurar puerto
az webapp config appsettings set --name mi-sms-xyz --resource-group sms --settings PORT=8080
```

**Tu URL será:** `https://mi-sms-xyz.azurewebsites.net`

---

### Opción 2️⃣: Portal Azure (Sin CLI)

1. **Ve a [portal.azure.com](https://portal.azure.com)**
2. **Crea "App Service"**
3. **Rellena:**
   - Nombre: `mi-sms-xyz`
   - Runtime: `Node 18 LTS`
   - Plan: `B1`

4. **Centro de implementación → Upload ZIP**
   - Comprime tu proyecto
   - Sube el ZIP

5. **Configuración → Configuración de aplicación**
   - Agrega: `PORT = 8080`
   - Guarda

**¡Listo!** Tu app está en `https://mi-sms-xyz.azurewebsites.net`

---

## Tus Enlaces SMS en Azure

```
Hola HOLGER tenemos una oferta exclusiva para ti:
https://mi-sms-xyz.azurewebsites.net/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

---

## Con Dominio Personalizado

### Ejemplo: `api.tudominio.com`

1. **Compra dominio** en GoDaddy, Namecheap, etc.

2. **En Azure App Service:**
   - Dominios personalizados
   - Agrega: `api.tudominio.com`
   - Copia el registro `CNAME`

3. **En tu registrador (GoDaddy, Namecheap, etc.):**
   - Agrega registro `CNAME`
   - Nombre: `api`
   - Valor: `tu-app-service-nombre.azurewebsites.net`

4. **Azure activará HTTPS automáticamente**

### Tu enlace será:

```
https://api.tudominio.com/5.html?t=13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

---

## Comparar Opciones

| Opción | Costo | Setup | Escalabilidad |
|--------|-------|-------|---------------|
| **App Service B1** | $15/mes | 5 min | Muy buena |
| **Azure Functions** | $0-5/mes | 10 min | Excelente |
| **Blob Storage** | $0.50/mes | 3 min | Solo archivos |

**Recomendación:** Usa **App Service B1** si empiezas.

---

## Verificar que funciona

Una vez en Azure:

```bash
# Health check
curl https://mi-sms-xyz.azurewebsites.net/health

# Obtener cliente
curl https://mi-sms-xyz.azurewebsites.net/api/client/13f3612f-2002-4440-9f4d-8fb3ca8be22e
```

---

## Solucionar problemas

### Error: "Aplicación no iniciada"

1. **App Service → Logs** (mira el error exacto)
2. **Configuración → Configuración de aplicación**
   - Verifica: `PORT=8080`
   - Verifica: `NODE_ENV=production`

### Error: "Puerto no disponible"

Azure usa puerto `8080`, no `3000`. Hecho: ✅ Ya está configurado.

### Error: "Module not found"

Necesitas instalar dependencias:

```bash
# En tu máquina local
cd backend
npm install

# Luego vuelve a desplegar
zip -r app.zip . -x ".git/*"
```

---

## Monitoreo

**En Azure Portal:**

1. **App Service → Métricas**
   - CPU, memoria, solicitudes

2. **App Service → Logs en tiempo real**
   - Ver errores al instante

3. **Application Insights** (opcional)
   - Analytics profundo

---

## Escalar si es necesario

Cuando tengas miles de usuarios:

1. **App Service → Plan de App Service**
2. **Sube a:** `S1` o superior
3. **Automatiza:**
   - Auto-scale según uso

---

## Backup y Recuperación

En Azure:

1. **App Service → Backups**
2. **Crea backup automático diario**
3. **Recupera en 1 click si falla algo**

---

## Conclusión

✅ **App Service B1** es tu mejor opción.  
✅ **5 minutos de setup.**  
✅ **$15/mes es muy barato.**  
✅ **HTTPS gratis.**  
✅ **Escalable sin problemas.**

---

**¿Necesitas ayuda?** Dime cuál opción prefieres y te guío paso a paso. 👇
