import { z } from 'zod';

import { games } from '../../../frontend/src/lib/mock-data';

// Define the schema for query parameters
const gamesQuerySchema = z.object({
  league: z.string().optional(),
  date: z.string().optional(), // Or use z.coerce.date() for stricter validation
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Validate the search parameters
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
      // Compare only the date part (YYYY-MM-DD)
      filteredGames = filteredGames.filter((game) =>
        game.startTime.toISOString().slice(0, 10) === date
      );
    }

    return new Response(JSON.stringify(filteredGames), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500 }
    );
  }
}
