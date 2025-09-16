import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import betRoutes from './routes/bet';
import gameRoutes from './routes/game';
import kvRoutes from './routes/kv';
import errorHandler from './middlewares/errorHandler';
const logger = require('./utils/logger');

logger.info('APP STEP 1: Top of app.ts');
logger.info('APP STEP 2: express imported');
logger.info('APP STEP 3: cors imported');
logger.info('APP STEP 4: userRoutes imported');
logger.info('APP STEP 5: betRoutes imported');
logger.info('APP STEP 6: gameRoutes imported');
logger.info('APP STEP 7: kvRoutes imported');
logger.info('APP STEP 8: errorHandler imported');

const app: Application = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/bet', betRoutes);
app.use('/api/v1/game', gameRoutes);
app.use('/api/v1/kv', kvRoutes);
// Add new domain routes (e.g., leaderboard) below as needed

// Health check
app.get('/api/v1/health', (req: Request, res: Response) => res.json({ status: 'ok' }));

app.use(errorHandler);

export default app;
