import { GameStatus } from '@prisma/client';

// This data is shaped exactly like our Prisma schema.
// No complex transformations will be needed in the seed script.
// We use stable, predictable CUIDs for IDs to ensure relational integrity.

export const teams = [
  { id: 'clv82e0l0000008ju6c1w2e3o', name: 'Kansas City Chiefs', shortName: 'KC', logo: '/logos/kc.svg' },
  { id: 'clv82e0l0000108ju2d5w8a9i', name: 'Buffalo Bills', shortName: 'BUF', logo: '/logos/buf.svg' },
  { id: 'clv82e0l0000208ju9f4h4b1c', name: 'Cincinnati Bengals', shortName: 'CIN', logo: '/logos/cin.svg' },
  { id: 'clv82e0l0000308ju7g6h8d2e', name: 'Pittsburgh Steelers', shortName: 'PIT', logo: '/logos/pit.svg' },
  { id: 'clv82e0l0000408juaaaaaaaa', name: 'Los Angeles Lakers', shortName: 'LAL', logo: '/logos/lal.svg' },
  { id: 'clv82e0l0000508jubbbbbbbb', name: 'Golden State Warriors', shortName: 'GSW', logo: '/logos/gsw.svg' },
];

export const games = [
  {
    id: 'clv82f0l0000408ju1f2g3h4j',
    leagueId: 'NFL',
    startTime: new Date('2025-10-10T17:00:00.000Z'),
    status: GameStatus.UPCOMING,
    homeTeamId: 'clv82e0l0000008ju6c1w2e3o', // KC Chiefs
    awayTeamId: 'clv82e0l0000108ju2d5w8a9i', // Buffalo Bills
  },
  {
    id: 'clv82f0l0000508ju5k6l7m8n',
    leagueId: 'NFL',
    startTime: new Date('2025-10-12T20:00:00.000Z'),
    status: GameStatus.UPCOMING,
    homeTeamId: 'clv82e0l0000208ju9f4h4b1c', // CIN Bengals
    awayTeamId: 'clv82e0l0000308ju7g6h8d2e', // PIT Steelers
  },
  {
    id: 'clv82f0l0000608jucccccccc',
    leagueId: 'NBA',
    startTime: new Date('2025-10-25T19:30:00.000Z'),
    status: GameStatus.UPCOMING,
    homeTeamId: 'clv82e0l0000408juaaaaaaaa', // LAL Lakers
    awayTeamId: 'clv82e0l0000508jubbbbbbbb', // GSW Warriors
  },
];

export const odds = [
  {
    gameId: 'clv82f0l0000408ju1f2g3h4j', // KC vs BUF
    moneylineHomeOdds: -150,
    moneylineAwayOdds: 130,
    spreadHomeLine: -3.5,
    spreadHomeOdds: -110,
    spreadAwayLine: 3.5,
    spreadAwayOdds: -110,
    totalLine: 52.5,
    totalOverOdds: -110,
    totalUnderOdds: -110,
  },
  {
    gameId: 'clv82f0l0000508ju5k6l7m8n', // CIN vs PIT
    moneylineHomeOdds: -200,
    moneylineAwayOdds: 170,
    spreadHomeLine: -4.5,
    spreadHomeOdds: -110,
    spreadAwayLine: 4.5,
    spreadAwayOdds: -110,
    totalLine: 48.5,
    totalOverOdds: -110,
    totalUnderOdds: -110,
  },
  {
    gameId: 'clv82f0l0000608jucccccccc', // LAL vs GSW
    moneylineHomeOdds: -120,
    moneylineAwayOdds: 100,
    spreadHomeLine: -1.5,
    spreadHomeOdds: -110,
    spreadAwayLine: 1.5,
    spreadAwayOdds: -110,
    totalLine: 225.5,
    totalOverOdds: -110,
    totalUnderOdds: -110,
  },
];