import express from 'express';
import database from '../db/database.js';

const router = express.Router();

// Obtener todos los clientes con sus tokens
router.get('/clients', (req, res) => {
  try {
    const clientes = database.getAllClientes();
    return res.status(200).json({
      success: true,
      total: clientes.length,
      data: clientes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Obtener estadísticas de eventos
router.get('/stats', (req, res) => {
  try {
    const allEvents = database.getEventsByToken(null) || [];

    const stats = {
      total_opens: allEvents.filter(e => e.tipo === 'open').length,
      total_clicks: allEvents.filter(e => e.tipo === 'click').length,
      total_events: allEvents.length,
      events_by_date: {},
      events_by_type: {
        open: 0,
        click: 0,
        other: 0
      }
    };

    // Agrupar por fecha
    allEvents.forEach(event => {
      const date = new Date(event.timestamp).toLocaleDateString();
      stats.events_by_date[date] = (stats.events_by_date[date] || 0) + 1;

      if (event.tipo === 'open') stats.events_by_type.open++;
      else if (event.tipo === 'click') stats.events_by_type.click++;
      else stats.events_by_type.other++;
    });

    return res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Actualizar saldo de un cliente
router.post('/clients/:token/update-balance', (req, res) => {
  try {
    const { token } = req.params;
    const { saldo } = req.body;

    if (!saldo) {
      return res.status(400).json({
        success: false,
        error: 'Saldo es requerido'
      });
    }

    const cliente = database.findClientByToken(token);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    // Actualizar el saldo en memoria
    cliente.saldo = saldo;
    database.saveClientes(database.getAllClientes());

    return res.status(200).json({
      success: true,
      message: 'Saldo actualizado correctamente',
      data: cliente
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
