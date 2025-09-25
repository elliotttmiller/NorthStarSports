import { http, HttpResponse } from 'msw';
import { mockGames } from './data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';

export const handlers = [
  http.get(`${API_BASE_URL}/games`, () => {
    console.log('[MSW] Intercepted GET /games');
    return HttpResponse.json(mockGames);
  }),
  // Example: Handler for a single game
  // http.get(`${API_BASE_URL}/games/:gameId`, ({ params }) => {
  //   const { gameId } = params;
  //   const game = mockGames.find(g => g.id === gameId);
  //   if (!game) {
  //     return new HttpResponse(null, { status: 404 });
  //   }
  //   return HttpResponse.json(game);
  // }),
];
