import type { Bet, Game, User } from '@/types';

export class PrismaApiService {
  async getBets(): Promise<Bet[]> {
    // Replace with actual API call to backend
    const res = await fetch('/api/bets');
    return await res.json();
  }
  async getGames(): Promise<Game[]> {
    const res = await fetch('/api/games');
    return await res.json();
  }
  async getUser(userId: string): Promise<User | null> {
    const res = await fetch(`/api/users/${userId}`);
    return await res.json();
  }
  async placeBet(bet: Bet): Promise<Bet> {
    const res = await fetch('/api/bets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bet),
    });
    return await res.json();
  }
}
