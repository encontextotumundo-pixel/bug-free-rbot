import eventService from '../services/eventService.js';

export async function recordOpenEvent(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Token requerido'
      });
    }

    const evento = eventService.recordOpenEvent(token, req);

    return res.status(201).json({
      success: true,
      data: evento
    });
  } catch (error) {
    console.error('Error en recordOpenEvent:', error);

    return res.status(400).json({
      success: false,
      error: error.message || 'Error al registrar evento'
    });
  }
}

export async function recordClickEvent(req, res) {
  try {
    const { token, accion } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Token requerido'
      });
    }

    const evento = eventService.recordClickEvent(token, accion || 'click', req);

    return res.status(201).json({
      success: true,
      data: evento
    });
  } catch (error) {
    console.error('Error en recordClickEvent:', error);

    return res.status(400).json({
      success: false,
      error: error.message || 'Error al registrar evento'
    });
  }
}
