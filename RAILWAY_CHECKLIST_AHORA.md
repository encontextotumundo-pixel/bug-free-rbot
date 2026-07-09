# ✅ CHECKLIST: Lo que Tienes que Hacer AHORA en Railway

## 📋 Tu Tarea Actual

```
Tienes GitHub conectado a Railway
Ahora necesitas: Desplegar y configurar
```

---

## 🎯 5 PASOS RÁPIDOS

### **1️⃣ Ve a tu Dashboard de Railway**
```
https://dashboard.railway.app
```

✓ Deberías ver tu proyecto

---

### **2️⃣ Configura Variables de Entorno**

**En Railway Dashboard:**
- Click: Tu Proyecto
- Click: **"Variables"** (lado izquierdo)
- Agrega estas 4 variables:

```
PORT = 8080
NODE_ENV = production
RATE_LIMIT_WINDOW = 5
RATE_LIMIT_MAX_REQUESTS = 10
```

✓ Guarda los cambios

---

### **3️⃣ Espera el Despliegue**

**En Railway Dashboard:**
- Click: **"Deployments"**
- Espera hasta ver: ✅ "Deployment Successful"

Esto puede tardar 1-2 minutos.

✓ Verás: "Building..." → "Running..."

---

### **4️⃣ Obtén tu URL**

**En Railway Dashboard:**
- Click: Tu Proyecto
- Click: **"Settings"**
- Busca: **"Public URL"** o **"Domains"**

Tu URL será:
```
https://[TU-APP].up.railway.app
```

✓ **COPIA ESTA URL** (la necesitarás)

---

### **5️⃣ Verifica que funciona**

**En tu terminal:**
```bash
# Reemplaza con tu URL real
curl https://[TU-APP].up.railway.app/health

# Deberías ver:
# {"status":"ok","timestamp":"..."}
```

✓ Si ves esto, **¡Railway está corriendo!**

---

## 🔗 Siguiente Paso: Actualizar URL

Una vez que tengas la URL de Railway:

1. Abre: `public/js/personalization.js`
2. Busca: `const API_BASE_URL = '...'`
3. Reemplaza con tu URL:
   ```javascript
   const API_BASE_URL = 'https://[TU-APP].up.railway.app';
   ```
4. Git push:
   ```bash
   git add public/js/personalization.js
   git commit -m "Actualizar URL de Railway"
   git push origin master
   ```

---

## 📊 Estado del Despliegue

| Paso | Estado | Acción |
|------|--------|--------|
| 1. GitHub conectado | ✅ Hecho | - |
| 2. Variables | ⏳ Hacer ahora | Ve a Variables |
| 3. Despliegue | ⏳ Automático | Espera |
| 4. URL obtenida | ⏳ Copiar | Guarda la URL |
| 5. Verificar | ⏳ Probar | curl al health |

---

## 🆘 ¿Algo No Funciona?

### "No veo mi proyecto en Railway"
- Verifica que conectaste el repo correcto
- Vé a Settings → GitHub → Desconecta y reconecta

### "Deployment Failed"
- Click: Deployments → Ver logs
- Lee el error
- Probablemente falta PORT=8080 en Variables

### "Cannot reach the URL"
- Espera 2 minutos después de "Success"
- Verifica que PORT=8080 está en Variables
- Intenta nuevamente

---

## 📞 Cuando Estés Listo

Avísame cuando:
1. ✅ Despliegue esté en "Success"
2. ✅ Tengas la URL de Railway
3. ✅ El `curl /health` funcione

Luego te ayudo con **Azure Blob Storage** para 5.html.

---

**¿Comenzamos?** 🚀

Vé a `https://dashboard.railway.app` y muéstrame cuando termines los 5 pasos.
