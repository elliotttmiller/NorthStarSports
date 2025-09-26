import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './lib/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const apiVersion = process.env.API_VERSION || 'v1';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);

app.get(`/api/${apiVersion}/games`, async (req, res) => {
  try {
    const games = await db.game.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
        odds: true,
      },
    });
    res.json(games);
  } catch (error) {
    console.error("Failed to fetch games:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
