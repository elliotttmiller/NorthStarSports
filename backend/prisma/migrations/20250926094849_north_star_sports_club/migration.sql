-- CreateEnum
CREATE TYPE "public"."GameStatus" AS ENUM ('UPCOMING', 'LIVE', 'FINISHED', 'POSTPONED');

-- CreateTable
CREATE TABLE "public"."Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Game" (
    "id" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "status" "public"."GameStatus" NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Odds" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "moneylineHomeOdds" INTEGER NOT NULL,
    "moneylineAwayOdds" INTEGER NOT NULL,
    "spreadHomeLine" DOUBLE PRECISION NOT NULL,
    "spreadHomeOdds" INTEGER NOT NULL,
    "spreadAwayLine" DOUBLE PRECISION NOT NULL,
    "spreadAwayOdds" INTEGER NOT NULL,
    "totalLine" DOUBLE PRECISION NOT NULL,
    "totalOverOdds" INTEGER NOT NULL,
    "totalUnderOdds" INTEGER NOT NULL,

    CONSTRAINT "Odds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_shortName_key" ON "public"."Team"("shortName");

-- CreateIndex
CREATE INDEX "Game_leagueId_idx" ON "public"."Game"("leagueId");

-- CreateIndex
CREATE INDEX "Game_startTime_idx" ON "public"."Game"("startTime");

-- CreateIndex
CREATE INDEX "Game_status_idx" ON "public"."Game"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Odds_gameId_key" ON "public"."Odds"("gameId");

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Odds" ADD CONSTRAINT "Odds_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
