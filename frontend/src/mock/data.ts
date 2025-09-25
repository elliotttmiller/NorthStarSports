import { Game } from "@/types";

const now = new Date();

export const mockGames: Game[] = [
  {
    id: 'clv82e0l0000408ju1f2g3h4j',
    leagueId: 'NFL',
    startTime: new Date('2025-09-25T17:00:00.000Z'),
    status: 'upcoming',
    homeTeam: { id: 'clv82e0l0000008ju6c1w2e3o', name: 'Kansas City Chiefs', shortName: 'KC', logo: '/logos/kc.svg' },
    awayTeam: { id: 'clv82e0l0000108ju2d5w8a9i', name: 'Buffalo Bills', shortName: 'BUF', logo: '/logos/buf.svg' },
    odds: {
      moneyline: {
        home: { odds: -150, lastUpdated: now },
        away: { odds: 130, lastUpdated: now }
      },
      spread: {
        home: { odds: -110, line: -3.5, lastUpdated: now },
        away: { odds: -110, line: 3.5, lastUpdated: now }
      },
      total: {
        home: { odds: -110, line: 52.5, lastUpdated: now },
        away: { odds: -110, line: 52.5, lastUpdated: now },
        over: { odds: -110, line: 52.5, lastUpdated: now },
        under: { odds: -110, line: 52.5, lastUpdated: now }
      },
    }
  },
  {
    id: 'clv82e0l0000508ju5k6l7m8n',
    leagueId: 'NFL',
    startTime: new Date('2025-09-25T20:00:00.000Z'),
    status: 'upcoming',
    homeTeam: { id: 'clv82e0l0000208ju9f4h4b1c', name: 'Cincinnati Bengals', shortName: 'CIN', logo: '/logos/cin.svg' },
    awayTeam: { id: 'clv82e0l0000308ju7g6h8d2e', name: 'Pittsburgh Steelers', shortName: 'PIT', logo: '/logos/pit.svg' },
    odds: {
      moneyline: {
        home: { odds: -200, lastUpdated: now },
        away: { odds: 170, lastUpdated: now }
      },
      spread: {
        home: { odds: -110, line: -4.5, lastUpdated: now },
        away: { odds: -110, line: 4.5, lastUpdated: now }
      },
      total: {
        home: { odds: -110, line: 48.5, lastUpdated: now },
        away: { odds: -110, line: 48.5, lastUpdated: now },
        over: { odds: -110, line: 48.5, lastUpdated: now },
        under: { odds: -110, line: 48.5, lastUpdated: now }
      },
    }
  },
  // Add more mock games as needed for UI testing
];
