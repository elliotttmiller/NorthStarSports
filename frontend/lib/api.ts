// lib/api.ts
// Server-only function to fetch live games (mock implementation)
import 'server-only';
import { LiveGame } from '@/components/sections/LiveBetting';

export async function fetchLiveGames(): Promise<LiveGame[]> {
  // Mock data matching LiveGame type
  return [
    {
      id: '1',
      awayTeam: 'Team A',
      homeTeam: 'Team B',
      awayScore: 24,
      homeScore: 27,
      quarter: '3rd',
      timeLeft: '05:12',
      spread: { odds: 1.95, home: -3.5 },
      moneyline: { home: -150 },
      total: { odds: 1.85, over: 48.5 },
    },
    {
      id: '2',
      awayTeam: 'Team C',
      homeTeam: 'Team D',
      awayScore: 17,
      homeScore: 21,
      quarter: '2nd',
      timeLeft: '02:45',
      spread: { odds: 2.05, home: +2.5 },
      moneyline: { home: +120 },
      total: { odds: 1.90, over: 44.0 },
    },
    {
      id: '3',
      awayTeam: 'Team E',
      homeTeam: 'Team F',
      awayScore: 31,
      homeScore: 28,
      quarter: '4th',
      timeLeft: '10:30',
      spread: { odds: 1.80, home: -1.5 },
      moneyline: { home: -110 },
      total: { odds: 2.00, over: 52.5 },
    },
  ];
}
