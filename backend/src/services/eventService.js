import database from '../db/database.js';
import { parseUserAgent, getClientIp } from '../utils/helpers.js';

export class EventService {
  recordOpenEvent(token, req) {
    const cliente = database.findClientByToken(token);
    if (!cliente) {
      throw new Error('Token inválido');
    }

    const userAgentData = parseUserAgent(req.get('user-agent'));
    const ip = getClientIp(req);
    const contador_aperturas = database.getOpenCount(token) + 1;

    const evento = {
      token,
      tipo: 'open',
      timestamp: new Date().toISOString(),
      ip,
      navegador: userAgentData.navegador,
      so: userAgentData.so,
      contador_aperturas
    };

    return database.addEvent(evento);
  }

  recordClickEvent(token, accion, req) {
    const cliente = database.findClientByToken(token);
    if (!cliente) {
      throw new Error('Token inválido');
    }

    const userAgentData = parseUserAgent(req.get('user-agent'));
    const ip = getClientIp(req);

    const evento = {
      token,
      tipo: 'click',
      accion,
      timestamp: new Date().toISOString(),
      ip,
      navegador: userAgentData.navegador,
      so: userAgentData.so
    };

    return database.addEvent(evento);
  }

  getEventsByToken(token) {
    return database.getEventsByToken(token);
  }
}

export default new EventService();
