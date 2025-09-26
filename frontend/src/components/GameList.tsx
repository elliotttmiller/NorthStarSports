"use client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { GameCard } from "@/components/GameCard";
import { Game } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

interface GameListProps {
  games: Game[];
}

export const GameList = ({ games }: GameListProps) => {
  if (games.length === 0) {
    return <Skeleton className="h-8 w-2/3 rounded" aria-busy="true" aria-label="Loading games" />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Teams</TableHead>
          <TableHead>Spread</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Money Line</TableHead>
          <TableHead>More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game.id}>
            <TableCell colSpan={6} style={{ padding: 0 }}>
              <GameCard game={game} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};