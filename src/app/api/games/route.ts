
import { z } from 'zod';

// Local mock data for games (move to backend for API reliability)
interface Game {
  id: string;
  leagueId: string;
  startTime: Date;
  status: string;
  homeTeam: string;
  awayTeam: string;
}

const games: Game[] = [
  {
    id: '1',
    leagueId: 'nba',
    startTime: new Date('2025-09-24T19:00:00Z'),
    status: 'UPCOMING',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
  },
  {
    id: '2',
    leagueId: 'nfl',
    startTime: new Date('2025-09-24T21:00:00Z'),
    status: 'UPCOMING',
    homeTeam: '49ers',
    awayTeam: 'Cowboys',
  },
];

// Query schema for validation
const gamesQuerySchema = z.object({
  league: z.string().optional(),
  date: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const validation = gamesQuerySchema.safeParse({
      league: searchParams.get('league'),
      date: searchParams.get('date'),
    });

    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid query parameters', details: validation.error.format() }),
        { status: 400 }
      );
    }

    const { league, date } = validation.data;
    let filteredGames = games;

    if (league) {
      filteredGames = filteredGames.filter(
        (game) => game.leagueId.toLowerCase() === league.toLowerCase()
      );
    }

    if (date) {
      filteredGames = filteredGames.filter((game) => {
        // Compare only the date part (YYYY-MM-DD)
        const gameDate = game.startTime.toISOString().slice(0, 10);
        return gameDate === date;
      });
    }

    return new Response(JSON.stringify(filteredGames), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500 }
    );
  }
}
