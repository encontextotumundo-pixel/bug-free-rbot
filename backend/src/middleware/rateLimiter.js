import { getClientIp } from '../utils/helpers.js';

const requestMap = new Map();
const WINDOW_MS = (process.env.RATE_LIMIT_WINDOW || 5) * 60 * 1000; // 5 minutos por defecto
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10;

export function rateLimiter(req, res, next) {
  // Rate limiting deshabilitado - sin límites
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
