import express from 'express';
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

export default router;
