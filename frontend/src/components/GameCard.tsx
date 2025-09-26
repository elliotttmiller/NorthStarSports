"use client";
import { Game, Bet } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBetSlipStore } from "@/store/betSlipStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatOdds } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const GameCard = ({ game }: { game: Game }) => {
  const { addBet, bets } = useBetSlipStore();
  const [selectedBet, setSelectedBet] = useState<string>("");

  const createBet = (selection: "home" | "away" | "over" | "under", odds: number, line?: number) => {
    // Determine betType based on selection
    let betType: Bet["betType"] = "moneyline";
    if (selection === "over" || selection === "under") {
      betType = "total";
    }
    // You can add more logic for other bet types if needed
    const bet: Bet = {
      id: `${game.id}-${selection}-${line || ""}`,
      gameId: game.id,
      selection,
      odds,
      line,
      game,
      stake: 0,
      potentialPayout: 0,
      betType
    };
    addBet(bet);
    toast.success(`${selection} added to slip!`);
  };
  const isBetInSlip = (selection: "home" | "away" | "over" | "under", line?: number) => bets.some((b: Bet) => b.gameId === game.id && b.selection === selection && b.line === line);

  useEffect(() => {
    if (selectedBet) {
      // Map selectedBet to odds and line
      if (selectedBet === "away" && game.odds.moneyline?.away) {
        createBet("away", game.odds.moneyline.away.odds);
        toast.success("Away bet added to slip!");
      } else if (selectedBet === "home" && game.odds.moneyline?.home) {
        createBet("home", game.odds.moneyline.home.odds);
        toast.success("Home bet added to slip!");
      } else if (selectedBet === "over" && game.odds.total?.over) {
        createBet("over", game.odds.total.over.odds, game.odds.total.over.line);
        toast.success("Over bet added to slip!");
      }
      setSelectedBet(""); // Reset after adding
    }
  }, [selectedBet]);

  if (!game) {
    return <Skeleton className="h-32 w-full rounded-xl" />;
  }

  return (
    <Card className="bg-card/60 border-border/50 transition-all hover:border-border/80 p-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="size-10 bg-secondary rounded-full" />
            <CardTitle className="text-lg font-semibold text-foreground">
              {game.awayTeam.name}
            </CardTitle>
          </div>
          <div className="flex gap-4 items-center">
            <div className="size-10 bg-secondary rounded-full" />
            <CardTitle className="text-lg font-semibold text-foreground">
              {game.homeTeam.name}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {new Date(game.startTime).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </CardDescription>
        <CardAction>
          {/* You can add quick actions or icons here if needed */}
        </CardAction>
      </CardHeader>
      <Separator className="my-4 bg-border/30" />
      <div className="px-6 py-4">
        <ToggleGroup type="single" value={selectedBet} onValueChange={setSelectedBet} className="grid grid-cols-3 gap-2 text-sm">
          <ToggleGroupItem value="away" disabled={!game.odds.moneyline?.away} className={cn("font-mono", isBetInSlip("away") && "bg-primary/80")}>{game.odds.moneyline?.away ? formatOdds(game.odds.moneyline.away.odds) : "Away N/A"}</ToggleGroupItem>
          <ToggleGroupItem value="over" disabled={!game.odds.total?.over} className={cn("font-mono", isBetInSlip("over", game.odds.total?.over?.line) && "bg-primary/80")}>{game.odds.total?.over ? `O ${game.odds.total.over.line}` : "O/U N/A"}</ToggleGroupItem>
          <ToggleGroupItem value="home" disabled={!game.odds.moneyline?.home} className={cn("font-mono", isBetInSlip("home") && "bg-primary/80")}>{game.odds.moneyline?.home ? formatOdds(game.odds.moneyline.home.odds) : "Home N/A"}</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Card>
  );
};