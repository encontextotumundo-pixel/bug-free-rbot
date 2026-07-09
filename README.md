# Sistema de Personalización de Campañas SMS

## 📋 Descripción

Sistema completo de personalización para campañas de SMS que permite:
- ✅ Enviar SMS personalizados con tokens únicos
- ✅ Mostrar datos del cliente automáticamente al abrir el enlace
- ✅ Registrar eventos de apertura y clics
- ✅ Protección contra abuso con rate limiting
- ✅ Logging de acciones para análisis

---

## 🚀 Instalación y Configuración

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Iniciar el servidor

**Modo desarrollo (con reloadad):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📱 Cómo Funciona

### **Paso 1: Generar Token Único para cada Cliente**

Cada cliente tiene un token único en la base de datos (`data/RESULTADOS.json`):

```json
{
  "id": 1,
  "nombre_completo": "HOLGER ANTONIO ORTEGA PINEDA",
  "numero_documento": "3105898247",
  "telefono": "3105898247",
  "token_unico": "d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9",
  "saldo": "$49,105.53",
  "estado": "activo"
}
```

### **Paso 2: Enviar SMS**

El SMS que envías contiene un enlace con el token:

```
Hola HOLGER tenemos una oferta exclusiva para ti:
https://tudominio.com/5.html?t=d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9
```

### **Paso 3: Cliente Abre el Enlace**

Cuando el cliente hace clic:
1. Se abre la página `5.html`
2. JavaScript lee el token de la URL
3. Se envía al backend: `GET /api/client/:token`
4. El backend valida y devuelve los datos del cliente
5. Los datos se muestran automáticamente en la tarjeta
6. Se registra el evento de apertura

---

## 🔌 APIs REST

### **GET /api/client/:token**
Obtiene los datos del cliente basado en el token.

**Parámetros:**
- `token` (string, en URL): Token único del cliente

**Respuesta exitosa (200):**
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

**Respuesta error (404):**
```json
{
  "success": false,
  "error": "Cliente no encontrado"
}
```

---

### **POST /api/event/open**
Registra cuando se abre el enlace.

**Body:**
```json
{
  "token": "d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "token": "d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9",
    "tipo": "open",
    "timestamp": "2026-07-09T15:30:00.000Z",
    "ip": "192.168.1.1",
    "navegador": "Chrome",
    "so": "Windows",
    "contador_aperturas": 1
  }
}
```

---

### **POST /api/event/click**
Registra clics en elementos específicos.

**Body:**
```json
{
  "token": "d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9",
  "accion": "click_pagar"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "token": "d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9",
    "tipo": "click",
    "accion": "click_pagar",
    "timestamp": "2026-07-09T15:31:00.000Z",
    "ip": "192.168.1.1",
    "navegador": "Chrome",
    "so": "Windows"
  }
}
```

---

## 📊 Base de Datos

### **RESULTADOS.json** (Clientes)
```
data/
└── RESULTADOS.json
```

Contiene todos los clientes con sus datos y tokens únicos.

### **events.json** (Eventos)
```
data/
└── events.json
```

Registra automáticamente todos los eventos:
- Aperturas de enlace
- Clics en elementos
- IP, navegador, SO del usuario
- Contador de aperturas por cliente

---

## 🔐 Seguridad

### Características de Protección:

✅ **Rate Limiting**
- Máximo 10 solicitudes por IP en 5 minutos
- Automáticamente bloquea IPs que exceden el límite
- Respuesta: HTTP 429 (Too Many Requests)

✅ **Validación de Tokens**
- Tokens criptográficamente seguros
- Validación en backend (nunca en frontend)
- Solo devuelve datos necesarios

✅ **CORS Configurado**
- Permite solicitudes desde tu dominio

✅ **Registro de Eventos**
- Cada acceso queda registrado con IP
- Facilita detección de intentos de fraude

---

## ⚙️ Configuración

Edita `backend/.env`:

```env
PORT=3000                           # Puerto del servidor
NODE_ENV=development                # development o production
RATE_LIMIT_WINDOW=5                 # Ventana en minutos
RATE_LIMIT_MAX_REQUESTS=10          # Max solicitudes por ventana
LOG_FILE=events.json                # Archivo de eventos
```

---

## 📝 Agregar Nuevos Clientes

1. Abre `data/RESULTADOS.json`
2. Agrega un nuevo cliente al array `clientes`:

```json
{
  "id": 4,
  "nombre_completo": "NUEVO CLIENTE",
  "numero_documento": "9876543210",
  "telefono": "3104445566",
  "token_unico": "f6h0e1c4-d3g9-6h8e-1f5g-c0e4h3d7g9c1",
  "saldo": "$150,000.00",
  "estado": "activo"
}
```

3. Genera un token único (puedes usar UUID v4)
4. Envía el SMS con el enlace personalizado

---

## 🧪 Testing

### Verificar que el servidor está funcionando:

```bash
curl http://localhost:3000/health
```

### Probar obtener cliente:

```bash
curl http://localhost:3000/api/client/d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9
```

### Registrar evento:

```bash
curl -X POST http://localhost:3000/api/event/open \
  -H "Content-Type: application/json" \
  -d '{"token":"d4f8c9a2-b1e7-4f6c-9d3e-a8c2f1b5e7a9"}'
```

---

## 📂 Estructura del Proyecto

```
proyect exitoso/
├── backend/
│   ├── src/
│   │   ├── index.js                 # Servidor principal
│   │   ├── routes/
│   │   │   ├── clients.js
│   │   │   └── events.js
│   │   ├── controllers/
│   │   │   ├── clientController.js
│   │   │   └── eventController.js
│   │   ├── services/
│   │   │   ├── clientService.js
│   │   │   └── eventService.js
│   │   ├── middleware/
│   │   │   └── rateLimiter.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   └── db/
│   │       └── database.js
│   ├── package.json
│   └── .env
├── data/
│   ├── RESULTADOS.json
│   └── events.json
├── public/
│   └── js/
│       └── personalization.js       # Script de personalización
├── 5.html                           # Página personalizada
└── README.md
```

---

## 🎯 Arquitectura

```
SMS con Token
     ↓
Cliente abre enlace (5.html?t=TOKEN)
     ↓
JavaScript lee token
     ↓
GET /api/client/:token (Backend)
     ↓
Backend valida y devuelve datos
     ↓
Frontend muestra datos en tarjeta
     ↓
POST /api/event/open (Registra evento)
```

---

## 📞 Soporte

Para cualquier problema o pregunta sobre el sistema, revisa:
1. Los logs en `data/events.json`
2. La consola del navegador (F12)
3. La consola del servidor (node)

---

## ✨ Características Futuras

- [ ] Dashboard de análisis
- [ ] Exportar eventos a CSV
- [ ] Webhook para eventos
- [ ] Múltiples campañas
- [ ] Segmentación de clientes
- [ ] A/B testing

---

**Versión:** 1.0.0  
**Última actualización:** 2026-07-09
