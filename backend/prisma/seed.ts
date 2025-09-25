import { PrismaClient } from '@prisma/client';
// Import the mock data from the frontend workspace to maintain a single source of truth.
import { games as mockGames } from '../../frontend/src/lib/mock-data';

const db = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Step 1: Clear existing data to ensure the script is idempotent.
  // Records with relations (Game) must be deleted before the records they relate to (Team).
  console.log('Deleting existing game data...');
  await db.game.deleteMany({});
  console.log('Deleting existing team data...');
  await db.team.deleteMany({});

  // Step 2: Seed Teams.
  // Extract unique teams from the mock games data to prevent duplicate entries.
  const teams = new Map<string, { name: string; shortName: string; logo: string }>();
  mockGames.forEach(game => {
    if (!teams.has(game.homeTeam.shortName)) {
      teams.set(game.homeTeam.shortName, game.homeTeam);
    }
    if (!teams.has(game.awayTeam.shortName)) {
      teams.set(game.awayTeam.shortName, game.awayTeam);
    }
  });

  const teamData = Array.from(teams.values());
  console.log(`Seeding ${teamData.length} teams...`);
  await db.team.createMany({
    data: teamData,
  });

  // Step 3: Seed Games.
  // Retrieve the newly created team records to get their database-generated IDs.
  const createdTeams = await db.team.findMany();
  const teamIdMap = new Map(createdTeams.map(t => [t.shortName, t.id]));

  // Transform the mock game data to match the Prisma schema, linking teams by their new IDs.
  const gameData = mockGames.map(game => ({
    id: game.id,
    leagueId: game.leagueId,
    startTime: game.startTime,
    status: game.status,
    homeTeamId: teamIdMap.get(game.homeTeam.shortName)!,
    awayTeamId: teamIdMap.get(game.awayTeam.shortName)!,
    // Note: The 'odds' property will need to be modeled as a separate, related table in a robust Prisma schema.
    // It is omitted from this seed step for clarity.
  }));

  console.log(`Seeding ${gameData.length} games...`);
  await db.game.createMany({
    data: gameData,
  });

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
