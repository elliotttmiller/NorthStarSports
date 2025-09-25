import { PrismaClient } from '@prisma/client';
import { games as mockGames } from '../../frontend/src/lib/mock-data';

const db = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Step 1: Clear existing data
  await db.game.deleteMany({});
  await db.team.deleteMany({});

  // Step 2: Seed Teams
  const teamNames = new Set<string>();
  mockGames.forEach(game => {
    teamNames.add(game.homeTeam);
    teamNames.add(game.awayTeam);
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

  const gameData = mockGames.map(game => ({
    id: game.id,
    leagueId: game.leagueId,
    startTime: new Date(game.startTime),
    status: game.status,
    homeTeamId: teamIdMap.get(game.homeTeam)!,
    awayTeamId: teamIdMap.get(game.awayTeam)!,
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
