import { GameList } from "@/components/GameList";

export const WorkspacePanel = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">
        Games
      </h1>
      <GameList />
    </div>
  );
};