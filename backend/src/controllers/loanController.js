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

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    // Calcular descuento del 50%
    const saldoString = cliente.saldo.replace('$', '').replace(',', '');
    const saldoNumerico = parseFloat(saldoString);
    const descuento50 = saldoNumerico * 0.5;
    const totalPagar = saldoNumerico - descuento50;

    return res.status(200).json({
      success: true,
      data: {
        nombre_completo: cliente.nombre_completo,
        numero_documento: cliente.numero_documento,
        telefono: cliente.telefono,
        saldo: cliente.saldo,
        descuento_50: `$${descuento50.toFixed(2)}`,
        total_pagar: `$${totalPagar.toFixed(2)}`,
        token: token
      }
    });
  } catch (error) {
    console.error('Error en loanController.getClientByToken:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Error al procesar solicitud'
    });
  }
}
