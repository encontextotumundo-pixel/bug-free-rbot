import database from '../db/database.js';

export class ClientService {
  getClientByToken(token) {
    if (!token || typeof token !== 'string') {
      throw new Error('Token inválido');
    }

    const cliente = database.findClientByToken(token);

    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    return {
      nombre_completo: cliente.nombre_completo,
      numero_documento: cliente.numero_documento,
      telefono: cliente.telefono,
      saldo: cliente.saldo,
      estado: cliente.estado
    };
  }

  validateToken(token) {
    if (!token || typeof token !== 'string' || token.length < 10) {
      return false;
    }
    return database.findClientByToken(token) !== undefined;
  }
}

export default new ClientService();
