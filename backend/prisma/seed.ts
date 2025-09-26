import { PrismaClient } from '@prisma/client';
// Import the new, schema-aligned mock data
import { teams, games, odds } from './data/mock-data';

const db = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');
  console.log('Deleting existing odds data...');
  await db.odds.deleteMany({});
  console.log('Deleting existing game data...');
  await db.game.deleteMany({});
  console.log('Deleting existing team data...');
  await db.team.deleteMany({});
  console.log(`Seeding ${teams.length} teams...`);
  await db.team.createMany({
    data: teams,
  });

  console.log(`Seeding ${games.length} games...`);
  await db.game.createMany({
    data: games,
  });

  console.log(`Seeding ${odds.length} sets of odds...`);
  await db.odds.createMany({
    data: odds,
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch(e => {
    console.error('An error occurred while seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Ensure the database connection is always closed
    await db.$disconnect();
  });