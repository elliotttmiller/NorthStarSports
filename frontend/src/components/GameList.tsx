"use client";
import { GameCard } from "@/components/GameCard";
import { Game } from "@/types";
import { games } from "@/lib/mock-data";

export const GameList = () => {
  if (!games || games.length === 0) {
    return <p className="text-muted-foreground">No games available.</p>;
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {games.map((game: Game) => (<GameCard key={game.id} game={game} />))}
    </div>
  );
};