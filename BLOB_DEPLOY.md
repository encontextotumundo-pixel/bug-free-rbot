# 📦 Desplegar 5.html en Azure Blob Storage

Esta guía te ayuda a desplegar tu frontend en Azure Blob Storage en 5 minutos.

## ✅ Prerequisitos

- Cuenta de Azure
- Archivo: `5.html`

## 📋 Pasos

### 1. Crear Cuenta de Almacenamiento

**En [portal.azure.com](https://portal.azure.com):**

- Busca: "Cuentas de almacenamiento"
- Click: "+ Crear"
- Nombre: `tucuentasms` (debe ser único)
- Región: USA East (o cercana)
- Rendimiento: Standard
- Redundancia: LRS
- Click: "Crear"

### 2. Crear Contenedor

- Cuenta → Contenedores
- "+ Contenedor"
- Nombre: `public`
- Nivel de acceso: **Anónimo (lectura pública)**
- Crear

### 3. Subir 5.html

**Opción A: Portal Azure (más simple)**
- Contenedor `public` → "Cargar"
- Selecciona: `5.html`
- Click: "Cargar"

**Opción B: Azure CLI**
```bash
az storage blob upload \
  --account-name tucuentasms \
  --container-name public \
  --name 5.html \
  --file "C:\Users\LENOVO\Documents\proyect exitoso\5.html"
```

### 4. Configurar CORS

**Azure CLI (recomendado):**
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

### 5. Obtener URL

Tu URL será:
```
https://tucuentasms.blob.core.windows.net/public/5.html
```

## ✅ Verificar

Abre en navegador:
```
https://tucuentasms.blob.core.windows.net/public/5.html
```

Deberías ver tu página 5.html.

## 💰 Costo

- ~$0.50 USD/mes (muy barato)

## 📊 Actualizar 5.html

Si necesitas cambiar 5.html:

1. Edita el archivo localmente
2. Sube nuevamente a Blob Storage
3. Acceso instantáneo (no hay caché)

---

**¿Problemas?** Ver `PASOS_EXACTOS_BLOB_RAILWAY.md`
