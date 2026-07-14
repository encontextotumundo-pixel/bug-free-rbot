import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { rateLimiter } from './middleware/rateLimiter.js';
import clientRoutes from './routes/clients.js';
import eventRoutes from './routes/events.js';
import dashboardRoutes from './routes/dashboard.js';
import loanRoutes from './routes/loan.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../../');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

// Servir archivos estáticos desde la carpeta raíz del proyecto
app.use(express.static(PROJECT_ROOT));
app.use('/public', express.static(path.join(PROJECT_ROOT, 'public')));

// Rate limiting (aplicar a todas las rutas)
app.use(rateLimiter);

// Rutas
app.use('/api/client', clientRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/loan', loanRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
