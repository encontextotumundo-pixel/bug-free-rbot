export function parseUserAgent(userAgent) {
  if (!userAgent) {
    return { navegador: 'Desconocido', so: 'Desconocido' };
  }

  let navegador = 'Desconocido';
  let so = 'Desconocido';

  // Detectar navegador
  if (userAgent.includes('Chrome')) navegador = 'Chrome';
  else if (userAgent.includes('Firefox')) navegador = 'Firefox';
  else if (userAgent.includes('Safari')) navegador = 'Safari';
  else if (userAgent.includes('Edge')) navegador = 'Edge';
  else if (userAgent.includes('Opera')) navegador = 'Opera';

  // Detectar SO
  if (userAgent.includes('Windows')) so = 'Windows';
  else if (userAgent.includes('Mac')) so = 'macOS';
  else if (userAgent.includes('Linux')) so = 'Linux';
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) so = 'iOS';
  else if (userAgent.includes('Android')) so = 'Android';

  return { navegador, so };
}

export function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    'desconocida'
  );
}

export function validateToken(token) {
  if (!token || typeof token !== 'string') return false;
  if (token.length < 10) return false;
  return true;
}
