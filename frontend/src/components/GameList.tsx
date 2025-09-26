"use client";
import { GameCard } from "@/components/GameCard";
import { Game } from "@/types";
import { games } from "@/lib/mock-data";

export const GameList = () => {
  if (!games || games.length === 0) {
    return <p className="text-muted-foreground" aria-live="polite">No games available.</p>;
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" aria-label="Game list" role="list">
      {games.map((game: Game) => (
        <div key={game.id} role="listitem">
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
};