"use client";
import { GameCard } from "../cards/GameCard";
import { useBetsStore } from "@/store/betsStore";
import { Game } from "@/types";
import { Skeleton } from "../ui/skeleton";

export const GameList = () => {
  const games = useBetsStore((state) => state.games);
  const loading = useBetsStore((state) => state.loading);
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (<Skeleton key={i} className="h-[280px] w-full" />))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game: Game) => (<GameCard key={game.id} game={game} />))}
    </div>
  );
};
