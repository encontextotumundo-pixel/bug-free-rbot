import express from 'express';
import { recordOpenEvent, recordClickEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/open', recordOpenEvent);
router.post('/click', recordClickEvent);

export default router;
