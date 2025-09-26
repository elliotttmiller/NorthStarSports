"use client";

import { GameList } from "@/components/GameList";
import { Game } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface WorkspacePanelProps {
  initialGames: Game[];
}

export const WorkspacePanel = ({ initialGames }: WorkspacePanelProps) => {
  if (!initialGames) {
    return <Skeleton className="h-12 w-1/2 rounded-xl" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">
        Games
      </h1>
      <Card className="rounded-xl border bg-card p-6 shadow-sm">
        <GameList games={initialGames} />
      </Card>
      <Separator className="my-4 bg-border/60" />
    </div>
  );
};