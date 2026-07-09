import { getClientIp } from '../utils/helpers.js';

const requestMap = new Map();
const WINDOW_MS = (process.env.RATE_LIMIT_WINDOW || 5) * 60 * 1000; // 5 minutos por defecto
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10;

export function rateLimiter(req, res, next) {
  const ip = getClientIp(req);
  const now = Date.now();

  if (!requestMap.has(ip)) {
    requestMap.set(ip, []);
  }

  const requests = requestMap.get(ip);

  // Limpiar solicitudes antiguas fuera de la ventana
  const recentRequests = requests.filter(time => now - time < WINDOW_MS);

  if (recentRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Demasiadas solicitudes. Intenta más tarde.',
      retryAfter: Math.ceil((recentRequests[0] + WINDOW_MS - now) / 1000)
    });
  }

  recentRequests.push(now);
  requestMap.set(ip, recentRequests);

  next();
}

// Limpiar solicitudes antiguas cada 10 minutos
setInterval(() => {
  const now = Date.now();
  for (const [ip, requests] of requestMap.entries()) {
    const recentRequests = requests.filter(time => now - time < WINDOW_MS);
    if (recentRequests.length === 0) {
      requestMap.delete(ip);
    } else {
      requestMap.set(ip, recentRequests);
    }
  }
}, 10 * 60 * 1000);
