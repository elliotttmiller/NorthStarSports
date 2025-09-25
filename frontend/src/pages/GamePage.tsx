import React from "react";
import WorkspacePanel from "@/components/panels/WorkspacePanel";

export default function GamePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Game</h1>
      <WorkspacePanel />
      <p className="text-muted-foreground text-lg mt-4">
        Interact with the game workspace and view details.
      </p>
    </div>
  );
}
