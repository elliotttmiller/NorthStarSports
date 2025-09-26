"use client";
import { Game } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBetSlipStore } from "@/store/betSlipStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatOdds } from "@/lib/formatters";
import type { Bet } from "@/types";

export const GameCard = ({ game }: { game: Game }) => {
  const { addBet, bets } = useBetSlipStore();
  const createBet = (selection: "home" | "away" | "over" | "under", odds: number, line?: number) => {
    let betType: Bet["betType"] = selection === "over" ? "total" : "moneyline";
    const bet: Bet = {
      id: `${game.id}-${selection}-${line || ""}`,
      gameId: game.id,
      selection,
      odds,
      line,
      game,
      stake: 0,
      potentialPayout: 0,
      betType,
    };
    addBet(bet);
    toast.success(`${selection} added to slip!`);
  };
  const isBetInSlip = (selection: string, line?: number) => bets.some((b) => b.gameId === game.id && b.selection === selection && b.line === line);

  return (
    <Card className="bg-card/60 border-border/50 transition-all hover:border-border/80 p-4">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-secondary rounded-full"></div>
            <span className="text-lg font-semibold text-foreground">{game.awayTeam.name}</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-secondary rounded-full"></div>
            <span className="text-lg font-semibold text-foreground">{game.homeTeam.name}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{new Date(game.startTime).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <Button
            variant={isBetInSlip("away") ? "default" : "secondary"}
            className={cn("font-mono", isBetInSlip("away") && "bg-primary/80")}
            onClick={() =>
              game.odds.moneyline?.away?.odds
                ? createBet("away", game.odds.moneyline.away.odds)
                : undefined
            }
            disabled={!game.odds.moneyline?.away?.odds}
          >
            {game.odds.moneyline?.away?.odds
              ? formatOdds(game.odds.moneyline.away.odds)
              : "N/A"}
          </Button>
          <Button
            variant={isBetInSlip("over", game.odds.total?.over?.line) ? "default" : "secondary"}
            className={cn("font-mono", isBetInSlip("over", game.odds.total?.over?.line) && "bg-primary/80")}
            onClick={() =>
              game.odds.total?.over
                ? createBet("over", game.odds.total.over.odds, game.odds.total.over.line)
                : undefined
            }
            disabled={!game.odds.total?.over}
          >
            {game.odds.total?.over
              ? formatOdds(game.odds.total.over.odds)
              : "N/A"}
          </Button>
          <Button
            variant={isBetInSlip("home") ? "default" : "secondary"}
            className={cn("font-mono", isBetInSlip("home") && "bg-primary/80")}
            onClick={() =>
              game.odds.moneyline?.home?.odds
                ? createBet("home", game.odds.moneyline.home.odds)
                : undefined
            }
            disabled={!game.odds.moneyline?.home?.odds}
          >
            {game.odds.moneyline?.home?.odds
              ? formatOdds(game.odds.moneyline.home.odds)
              : "N/A"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};