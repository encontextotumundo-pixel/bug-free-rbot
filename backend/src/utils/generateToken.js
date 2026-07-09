import crypto from 'crypto';

/**
 * Genera un token criptográficamente seguro
 * Retorna un UUID v4
 */
export function generateSecureToken() {
  return crypto.randomUUID();
}

/**
 * Genera múltiples tokens para clientes
 * @param {number} count - Cantidad de tokens a generar
 * @returns {Array} Array de tokens únicos
 */
export function generateBatchTokens(count) {
  const tokens = [];
  for (let i = 0; i < count; i++) {
    tokens.push(generateSecureToken());
  }
  return tokens;
}

/**
 * Valida el formato de un token
 * @param {string} token - Token a validar
 * @returns {boolean}
 */
export function isValidToken(token) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(token);
}

// Si se ejecuta como script directo
if (import.meta.url === `file://${process.argv[1]}`) {
  const count = parseInt(process.argv[2]) || 1;
  console.log(`Generando ${count} tokens únicos...\n`);

  const tokens = generateBatchTokens(count);
  tokens.forEach((token, index) => {
    console.log(`${index + 1}. ${token}`);
  });
}
