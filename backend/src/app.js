import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';
import betRoutes from './routes/bet.js';
import gameRoutes from './routes/game.js';
import kvRoutes from './routes/kv.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/bet', betRoutes);
app.use('/api/v1/game', gameRoutes);
app.use('/api/v1/kv', kvRoutes);
// TODO: Add leaderboard and other domain routes here

// Health check
app.get('/api/v1/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

export default app;
