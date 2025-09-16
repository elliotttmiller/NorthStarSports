import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import betRoutes from './routes/bet';
import gameRoutes from './routes/game';
import kvRoutes from './routes/kv';
import errorHandler from './middlewares/errorHandler';

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
