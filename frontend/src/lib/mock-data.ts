// Centralized mock data for games
export interface GameMock {
  id: string;
  leagueId: string;
  startTime: Date;
  status: string;
  homeTeam: string;
  awayTeam: string;
}

export const games: GameMock[] = [
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
