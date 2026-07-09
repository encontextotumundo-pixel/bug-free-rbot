import express from 'express';
import { getClientByToken } from '../controllers/clientController.js';

const router = express.Router();

router.get('/:token', getClientByToken);

export default router;
