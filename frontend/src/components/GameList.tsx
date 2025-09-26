"use client";
import { GameCard } from "@/components/GameCard";
import { Game } from "@/types";
import { Skeleton } from "./ui/skeleton";

interface GameListProps {
  games: Game[];
  loading: boolean;
}

export const GameList = ({ games, loading }: GameListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (<Skeleton key={i} className="h-[240px] w-full" />))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {games.map((game: Game) => (<GameCard key={game.id} game={game} />))}
    </div>
  );
};