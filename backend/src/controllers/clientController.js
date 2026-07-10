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

    if (cliente) {
      // Calcular descuento del 50%
      const saleroString = cliente.saldo.replace('$', '').replace(',', '');
      const saldoNumerico = parseFloat(saleroString);
      const descuento50 = saldoNumerico * 0.5;
      const totalPagar = saldoNumerico - descuento50;

      cliente.descuento_50 = `$${descuento50.toFixed(2)}`;
      cliente.total_pagar = `$${totalPagar.toFixed(2)}`;
    }

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
