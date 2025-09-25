"use client";
import { GameCard } from "@/components/GameCard";
import { useBetsStore } from "@/store/betsStore";
import { Game } from "@/types";
import { Skeleton } from "./ui/skeleton";

export const GameList = () => {
  const games = useBetsStore((state) => state.games);
  const loading = useBetsStore((state) => state.loading);
  if (loading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[240px] w-full" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {games.map((game: Game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};