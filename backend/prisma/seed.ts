import { PrismaClient } from '@prisma/client';
import mockGames from '../../frontend/src/mock/games.json';

const db = new PrismaClient();

type MockGame = {
  id: string;
  leagueId: string;
  startTime: string;
  status: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    logo: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    logo: string;
  };
  odds: {
    moneyline: {
      home: { odds: number; lastUpdated: string };
      away: { odds: number; lastUpdated: string };
    };
    spread: {
      home: { odds: number; line: number; lastUpdated: string };
      away: { odds: number; line: number; lastUpdated: string };
    };
    total: {
      home: { odds: number; line: number; lastUpdated: string };
      away: { odds: number; line: number; lastUpdated: string };
      over: { odds: number; line: number; lastUpdated: string };
      under: { odds: number; line: number; lastUpdated: string };
    };
  };
};

async function main() {
  console.log('Starting database seeding...');

  // Step 1: Clear existing data
  await db.game.deleteMany({});
  await db.team.deleteMany({});

  // Step 2: Seed Teams
  const teamNames = new Set<string>();
  mockGames.forEach((game: MockGame) => {
    teamNames.add(game.homeTeam.name);
    teamNames.add(game.awayTeam.name);
  });

  const teamData = Array.from(teamNames).map(name => ({
    name,
    shortName: name,
    logo: `/logos/${name.toLowerCase().replace(/\s+/g, '-')}.svg`, // Default logo path
  }));
  await db.team.createMany({ data: teamData });

  // Step 3: Seed Games
  const createdTeams = await db.team.findMany();
  const teamIdMap = new Map<string, number>((createdTeams as Array<{ name: string; id: number }>).map((t) => [t.name, t.id]));

  const gameData = mockGames.map((game: MockGame) => ({
    id: game.id,
    leagueId: game.leagueId,
    startTime: new Date(game.startTime),
    status: game.status,
    homeTeamId: teamIdMap.get(game.homeTeam.name)!,
    awayTeamId: teamIdMap.get(game.awayTeam.name)!,
  }));
  await db.game.createMany({ data: gameData });

  console.log('Seeding finished successfully.');
}

main()
  .catch(e => {
    console.error('An error occurred while seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
