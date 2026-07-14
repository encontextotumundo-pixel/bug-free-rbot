import express from 'express';
import XLSX from 'xlsx';
import database from '../db/database.js';

const router = express.Router();

router.post('/reload-clientes', (req, res) => {
  try {
    const result = database.reloadClientesFromExcel();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/export-clients', (req, res) => {
  try {
    const clientes = database.getAllClientes();
    const blobUrl = req.query.blobUrl || '';

    // Preparar datos para Excel
    const excelData = clientes.map(client => ({
      'ID': client.id,
      'Nombre': client.nombre_completo,
      'Documento': client.numero_documento,
      'Teléfono': client.telefono.replace('+57 ', ''),
      'Enlace Personalizado': `${blobUrl}loan-simulator.php.html?t=${client.token_unico}`
    }));

    // Crear workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Ajustar ancho de columnas
    worksheet['!cols'] = [
      { wch: 8 },  // ID
      { wch: 35 }, // Nombre
      { wch: 15 }, // Documento
      { wch: 20 }, // Teléfono
      { wch: 90 }  // Enlace
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

    // Generar nombre de archivo con fecha
    const fecha = new Date().toISOString().split('T')[0];
    const filename = `clientes-${fecha}.xlsx`;

    // Enviar archivo
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
