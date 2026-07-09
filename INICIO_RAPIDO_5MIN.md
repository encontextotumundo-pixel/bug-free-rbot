# ⏱️ Inicio Rápido - 5 Minutos

## Minuto 1️⃣: Instalar Dependencias

```bash
cd backend
npm install
```

Espera a que termine... ✓

---

## Minuto 2️⃣: Iniciar el Servidor

```bash
npm run dev
```

Deberías ver:
```
🚀 Servidor ejecutándose en puerto 3000
📍 URL: http://localhost:3000
🏥 Health check: http://localhost:3000/health
```

**¡No cierres esta terminal!**

---

## Minuto 3️⃣: Abre Otra Terminal (mantén la anterior abierta)

Abre una **nueva terminal** en la misma carpeta y ejecuta:

```bash
# Verificar que el servidor funciona
curl http://localhost:3000/health
```

Deberías ver:
```json
{"status":"ok","timestamp":"2026-07-09T..."}
```

✓ ¡El servidor está vivo!

---

## Minuto 4️⃣: Abre en tu Navegador

Abre tu navegador y ve a:

```
http://localhost:3000/5.html?t=d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9
```

**¡Deberías ver en la tarjeta:**

```
Nombre Completo: HOLGER ANTONIO ORTEGA PINEDA
Documento: 3105898247
Valor TOTAL a pagar: $49,105.53
```

✓ ¡La personalización funciona!

---

## Minuto 5️⃣: Ver los Eventos Registrados

En cualquier terminal:

```bash
cat data/events.json
```

Deberías ver un evento registrado como:

```json
{
  "id": 1,
  "token": "d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9",
  "tipo": "open",
  "timestamp": "2026-07-09T15:30:00.000Z",
  "ip": "127.0.0.1",
  "navegador": "Chrome",
  "so": "Windows",
  "contador_aperturas": 1
}
```

✓ ¡El logging funciona!

---

## ✅ Éxito en 5 Minutos

¡Ya tienes el sistema funcionando!

Ahora puedes:

### 📱 Enviar un SMS

```
Hola HOLGER tenemos una oferta exclusiva para ti:
http://localhost:3000/5.html?t=d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9
```

(En producción reemplaza `localhost:3000` por tu dominio)

### 👥 Agregar más clientes

1. Edita `data/RESULTADOS.json`
2. Copia un cliente existente
3. Cambia: nombre, documento, teléfono, saldo, token

Generador de token:
```bash
cd backend
node src/utils/generateToken.js 1
```

### 🧪 Más pruebas

```bash
# Obtener datos de cliente
curl http://localhost:3000/api/client/d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9

# Registrar evento
curl -X POST http://localhost:3000/api/event/open \
  -H "Content-Type: application/json" \
  -d '{"token":"d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9"}'
```

---

## 🎯 Próximos Pasos

1. **Lee README.md** - Documentación completa
2. **Lee DEPLOYMENT.md** - Para desplegar en producción
3. **Lee COMANDOS_RAPIDOS.md** - Más comandos de prueba

---

## 🆘 Si algo falla

### "npm command not found"
- Instala Node.js desde nodejs.org

### "Puerto 3000 ya en uso"
- Cambiar puerto en `backend/.env`
- O matar proceso: `lsof -i :3000` → `kill -9 <PID>`

### "No veo datos en la tarjeta"
- Abre F12 (Dev Tools) → Console
- Busca errores
- Verifica URL tenga el token correcto

### "Conexión rechazada"
- Verifica que `npm run dev` esté ejecutándose
- Intenta: http://localhost:3000/health

---

## 📚 Archivos Importantes

| Archivo | Para qué |
|---|---|
| backend/.env | Configuración (puerto, rate limit) |
| data/RESULTADOS.json | Tus clientes |
| data/events.json | Eventos registrados |
| public/js/personalization.js | Script frontend |
| README.md | Documentación completa |

---

## 🎉 ¡Listo!

Tu sistema de personalización de SMS está **100% operacional**.

**Estado:** ✅ EN VIVO EN PORT 3000

---

**Tiempo total:** ⏱️ ~5 minutos  
**Complejidad:** ⭐ Muy simple  
**Resultado:** ✅ Sistema funcionando  
