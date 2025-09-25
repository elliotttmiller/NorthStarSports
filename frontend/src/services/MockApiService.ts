import type { ApiService } from './apiService';
import type { Bet, Game, User } from '@/types';

import mockBets from '../mock/bets.json';
import mockGames from '../mock/games.json';
import mockUsers from '../mock/users.json';

export class MockApiService implements ApiService {
  async getBets(): Promise<Bet[]> {
    return mockBets as Bet[];
  }
  async getGames(): Promise<Game[]> {
    return mockGames as Game[];
  }
  async getUser(userId: string): Promise<User | null> {
    return (mockUsers as User[]).find((u) => u.id === userId) || null;
  }
  async placeBet(bet: Bet): Promise<Bet> {
    // Simulate bet placement
    return { ...bet, id: String(Date.now()) };
  }
}
