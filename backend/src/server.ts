import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { logInfo } from './utils/logger.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  logInfo(`Backend server running on http://localhost:${PORT}`);
});
