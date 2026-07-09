import clientService from '../services/clientService.js';

export async function getClientByToken(req, res) {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Token requerido'
      });
    }

    const cliente = clientService.getClientByToken(token);

    return res.status(200).json({
      success: true,
      data: cliente
    });
  } catch (error) {
    console.error('Error en getClientByToken:', error);

    return res.status(404).json({
      success: false,
      error: error.message || 'Cliente no encontrado'
    });
  }
}
