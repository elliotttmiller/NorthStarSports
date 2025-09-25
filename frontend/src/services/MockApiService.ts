import type { ApiService } from './ApiService';
import type { Bet, Game, User } from '@/types';

import mockGames from '../mock/games.json';
import mockBets from '../mock/bets.json';
import mockUsers from '../mock/users.json';

export class MockApiService implements ApiService {
  async getBets(): Promise<Bet[]> {
    return getMockBets();
  }
  async getGames(): Promise<Game[]> {
    return getMockGames();
  }
  async getUser(userId: string): Promise<User | null> {
    return (mockUsers as User[]).find((u) => u.id === userId) || null;
  }
  async placeBet(bet: Bet): Promise<Bet> {
    // Simulate bet placement
    return { ...bet, id: String(Date.now()) };
  }
}

export const getMockBets = (): Bet[] => {
  return mockBets.map(bet => ({
    ...bet,
    game: {
      ...bet.game,
      startTime: new Date(bet.game.startTime),
      odds: {
        moneyline: {
          home: { ...bet.game.odds.moneyline.home, lastUpdated: new Date(bet.game.odds.moneyline.home.lastUpdated) },
          away: { ...bet.game.odds.moneyline.away, lastUpdated: new Date(bet.game.odds.moneyline.away.lastUpdated) }
        },
        spread: {
          home: { ...bet.game.odds.spread.home, lastUpdated: new Date(bet.game.odds.spread.home.lastUpdated) },
          away: { ...bet.game.odds.spread.away, lastUpdated: new Date(bet.game.odds.spread.away.lastUpdated) }
        },
        total: {
          home: { ...bet.game.odds.total.home, lastUpdated: new Date(bet.game.odds.total.home.lastUpdated) },
          away: { ...bet.game.odds.total.away, lastUpdated: new Date(bet.game.odds.total.away.lastUpdated) },
          over: { ...bet.game.odds.total.over, lastUpdated: new Date(bet.game.odds.total.over.lastUpdated) },
          under: { ...bet.game.odds.total.under, lastUpdated: new Date(bet.game.odds.total.under.lastUpdated) }
        }
      }
    }
  })) as Bet[];
};

export const getMockGames = (): Game[] => {
  return mockGames.map(game => ({
    ...game,
    startTime: new Date(game.startTime),
    odds: {
      moneyline: {
        home: { ...game.odds.moneyline.home, lastUpdated: new Date(game.odds.moneyline.home.lastUpdated) },
        away: { ...game.odds.moneyline.away, lastUpdated: new Date(game.odds.moneyline.away.lastUpdated) }
      },
      spread: {
        home: { ...game.odds.spread.home, lastUpdated: new Date(game.odds.spread.home.lastUpdated) },
        away: { ...game.odds.spread.away, lastUpdated: new Date(game.odds.spread.away.lastUpdated) }
      },
      total: {
        home: { ...game.odds.total.home, lastUpdated: new Date(game.odds.total.home.lastUpdated) },
        away: { ...game.odds.total.away, lastUpdated: new Date(game.odds.total.away.lastUpdated) },
        over: { ...game.odds.total.over, lastUpdated: new Date(game.odds.total.over.lastUpdated) },
        under: { ...game.odds.total.under, lastUpdated: new Date(game.odds.total.under.lastUpdated) }
      }
    }
  })) as Game[];
};
