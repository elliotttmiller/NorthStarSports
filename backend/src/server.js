import express from 'express';
import cors from 'cors';
import kvRoutes from './routes/kv.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(express.json());

// Routes
app.use('/kv', kvRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
