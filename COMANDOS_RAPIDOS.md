# ⚡ Comandos Rápidos

## 🚀 Iniciar el Sistema

### Terminal 1: Iniciar servidor
```bash
cd backend
npm run dev
```

Verás:
```
🚀 Servidor ejecutándose en puerto 3000
📍 URL: http://localhost:3000
🏥 Health check: http://localhost:3000/health
```

---

## 🧪 Pruebas Rápidas

### 1. Verificar servidor en vivo
```bash
curl http://localhost:3000/health
```

**Respuesta esperada:**
```json
{"status":"ok","timestamp":"2026-07-09T15:30:00.000Z"}
```

---

### 2. Obtener datos de cliente
```bash
curl http://localhost:3000/api/client/d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "nombre_completo": "HOLGER ANTONIO ORTEGA PINEDA",
    "numero_documento": "3105898247",
    "saldo": "$49,105.53",
    "estado": "activo"
  }
}
```

---

### 3. Registrar evento de apertura
```bash
curl -X POST http://localhost:3000/api/event/open \
  -H "Content-Type: application/json" \
  -d '{"token":"d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9"}'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "token": "d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9",
    "tipo": "open",
    "timestamp": "2026-07-09T15:30:00.000Z",
    "ip": "127.0.0.1",
    "navegador": "Chrome",
    "so": "Windows",
    "contador_aperturas": 1
  }
}
```

---

### 4. Registrar evento de clic
```bash
curl -X POST http://localhost:3000/api/event/click \
  -H "Content-Type: application/json" \
  -d '{"token":"d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9","accion":"click_pagar"}'
```

---

## 🌐 Prueba en el Navegador

### Abrir página personalizada
```
http://localhost:3000/5.html?t=d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9
```

Deberías ver:
- ✅ Nombre Completo: HOLGER ANTONIO ORTEGA PINEDA
- ✅ Documento: 3105898247
- ✅ Saldo: $49,105.53

---

## 📊 Ver Eventos Registrados

```bash
# Ver archivo JSON formateado
cat data/events.json | jq .

# Ver solo aperturas
cat data/events.json | jq '.eventos[] | select(.tipo=="open")'

# Contar total de eventos
cat data/events.json | jq '.eventos | length'
```

---

## 👥 Ver Clientes

```bash
# Ver todos los clientes
cat data/RESULTADOS.json | jq .

# Ver solo nombre y token
cat data/RESULTADOS.json | jq '.clientes[] | {nombre_completo, token_unico}'
```

---

## ⚙️ Generar Nuevo Token

```bash
cd backend
node src/utils/generateToken.js 1
```

Ejemplo de salida:
```
Generando 1 tokens únicos...

1. f7i1f2d5-e4h0-7i9f-2g6h-d1f5i4e8h0d2
```

---

## 🔧 Cambiar Puerto

Editar `backend/.env`:
```env
PORT=3001
```

Luego reiniciar servidor.

---

## 🛑 Detener Servidor

```bash
# Ctrl+C en la terminal donde corre npm run dev
```

---

## 🔍 Ver Logs del Servidor

```bash
# Si npm run dev está corriendo:
# Los logs aparecen automáticamente en la terminal

# O revisar eventos:
tail -20 data/events.json
```

---

## 🆘 Problemas Comunes

### "Puerto 3000 ya en uso"
```bash
# Opción 1: Cambiar puerto en .env
# Opción 2: Liberar puerto
lsof -i :3000
kill -9 <PID>
```

### "Module not found"
```bash
cd backend
npm install
```

### "No se ve la tarjeta personalizada"
1. Abre navegador: F12 (Developer Tools)
2. Vé a Console
3. Busca errores
4. Verifica que el token sea válido

---

## 📝 Agregar Cliente Rápido

1. Generar token:
```bash
cd backend
node src/utils/generateToken.js 1
```

2. Editar `data/RESULTADOS.json`:
```json
{
  "id": 4,
  "nombre_completo": "TU NOMBRE",
  "numero_documento": "DOCUMENTO",
  "telefono": "3101234567",
  "token_unico": "AQUI_EL_TOKEN_GENERADO",
  "saldo": "$99,999.99",
  "estado": "activo"
}
```

3. Guardar archivo
4. Usar en SMS

---

## 📞 URLs Importantes

| Descripción | URL |
|---|---|
| Health Check | http://localhost:3000/health |
| Cliente 1 | http://localhost:3000/api/client/d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9 |
| Cliente 2 | http://localhost:3000/api/client/e5g9d0b3-c2f8-5g7d-0e4f-b9d3g2c6f8b0 |
| Página Cliente 1 | http://localhost:3000/5.html?t=d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9 |
| Página Cliente 2 | http://localhost:3000/5.html?t=e5g9d0b3-c2f8-5g7d-0e4f-b9d3g2c6f8b0 |

---

## 🎯 Flujo Típico de Prueba

```
1. npm run dev                    → Iniciar servidor
2. curl http://localhost:3000/health  → Verificar
3. Abrir en navegador enlace con token
4. Ver datos personalizados cargarse
5. Verificar eventos: cat data/events.json
6. Agregar más clientes si es necesario
7. Listo para producción
```

---

## 🚢 Lista de Chequeo Antes de Producción

- [ ] Servidor inicia sin errores: `npm run dev`
- [ ] APIs responden: curl http://localhost:3000/health
- [ ] Cliente se personaliza en navegador
- [ ] Eventos se registran: ver data/events.json
- [ ] Rate limiting funciona (prueba 15 veces)
- [ ] SSL/HTTPS configurado (en servidor)
- [ ] Dominio apunta al servidor
- [ ] Backup de data/ hecho

---

**Última actualización:** 2026-07-09
