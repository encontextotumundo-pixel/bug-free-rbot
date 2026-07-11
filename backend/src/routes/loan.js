import express from 'express';
import { getClientByToken } from '../controllers/loanController.js';

const router = express.Router();

// GET /api/loan/{token}
router.get('/:token', getClientByToken);

export default router;
