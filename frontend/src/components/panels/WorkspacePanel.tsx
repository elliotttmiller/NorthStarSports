import { GameList } from "@/components/GameList";

export const WorkspacePanel = () => {
  return (
    <div className="p-8 bg-card rounded-xl shadow-lg border border-border/60 h-full">
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">
        Games
      </h1>
      <GameList />
    </div>
  );
};