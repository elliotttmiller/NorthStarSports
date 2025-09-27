import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './lib/db';
import { GameSchema } from '../../shared/types/zodSchemas';
import { Team, GameOdds, Game } from '../../shared/types';
import { PrismaClient, Game as PrismaGame, Team as PrismaTeam, Odds as PrismaOdds } from '@prisma/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const apiVersion = process.env.API_VERSION || 'v1';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
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
    const games: (PrismaGame & { homeTeam: PrismaTeam; awayTeam: PrismaTeam; odds: PrismaOdds | null })[] = await db.game.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
        odds: true,
      },
    });
    // Map Prisma results to strict shared type
    const mappedGames = games.map((game) => {
      // Map odds
      const odds: GameOdds = {
        spread: {
          home: {
            odds: game.odds?.spreadHomeOdds ?? 0,
            line: game.odds?.spreadHomeLine ?? 0,
            lastUpdated: new Date(),
          },
          away: {
            odds: game.odds?.spreadAwayOdds ?? 0,
            line: game.odds?.spreadAwayLine ?? 0,
            lastUpdated: new Date(),
          },
        },
        moneyline: {
          home: {
            odds: game.odds?.moneylineHomeOdds ?? 0,
            lastUpdated: new Date(),
          },
          away: {
            odds: game.odds?.moneylineAwayOdds ?? 0,
            lastUpdated: new Date(),
          },
        },
        total: {
          home: {
            odds: 0,
            lastUpdated: new Date(),
          },
          away: {
            odds: 0,
            lastUpdated: new Date(),
          },
          over: game.odds ? {
            odds: game.odds.totalOverOdds ?? 0,
            line: game.odds.totalLine ?? 0,
            lastUpdated: new Date(),
          } : undefined,
          under: game.odds ? {
            odds: game.odds.totalUnderOdds ?? 0,
            line: game.odds.totalLine ?? 0,
            lastUpdated: new Date(),
          } : undefined,
        },
      };
      // Map status to shared type
      let status: 'upcoming' | 'live' | 'finished' = 'upcoming';
      switch (game.status) {
        case 'UPCOMING':
          status = 'upcoming';
          break;
        case 'LIVE':
          status = 'live';
          break;
        case 'FINISHED':
          status = 'finished';
          break;
        default:
          status = 'upcoming';
      }
      // Map teams
      const homeTeam: Team = {
        id: game.homeTeam.id,
        name: game.homeTeam.name,
        shortName: game.homeTeam.shortName,
        logo: game.homeTeam.logo ?? '',
      };
      const awayTeam: Team = {
        id: game.awayTeam.id,
        name: game.awayTeam.name,
        shortName: game.awayTeam.shortName,
        logo: game.awayTeam.logo ?? '',
      };
      // Build strict Game object
      const mapped: Game = {
        id: game.id,
        leagueId: game.leagueId,
        homeTeam,
        awayTeam,
        startTime: game.startTime,
        status,
        odds,
        venue: undefined,
      };
      // Validate with Zod
      const parsed = GameSchema.safeParse(mapped);
      if (!parsed.success) {
        console.warn('Game validation failed', parsed.error.errors);
        return null;
      }
      return parsed.data;
    }).filter(Boolean);
    res.json(mappedGames);
  } catch (error: unknown) {
    console.error("Failed to fetch games:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
