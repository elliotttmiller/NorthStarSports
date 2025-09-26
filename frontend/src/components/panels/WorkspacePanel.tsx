"use client";

import { GameList } from "@/components/GameList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <Card className="bg-card/60 border-border/50 p-4 text-center">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
};

export const WorkspacePanel = () => {
  return (
    <div className="p-6" aria-label="Workspace panel" role="region">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Welcome, NorthStar User
        </h1>
        <p className="text-muted-foreground mt-2">Build your perfect bet</p>
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Balance" value="$1,250.00" />
        <StatCard label="Win Rate" value="68%" />
        <StatCard label="Active Bets" value={0} />
        <StatCard label="This Week" value="+$340" />
      </div>
      {/* Trending Games Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="text-primary" />
          <h2 className="text-2xl font-bold">Trending Live Games</h2>
        </div>
        <GameList />
      </div>
      <div className="text-center">
        <Button size="lg">View All Sports & Games</Button>
      </div>
    </div>
  );
};