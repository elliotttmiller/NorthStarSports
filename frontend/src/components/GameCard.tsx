"use client";
import { Game, Bet } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBetSlipStore } from "@/store/betSlipStore";
import type { BetSlipState } from "@/store/betSlipStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatOdds } from "@/lib/formatters";

export const GameCard = ({ game }: { game: Game }) => {
  const addBet = useBetSlipStore((state: BetSlipState) => state.addBet);
  const betSlip = useBetSlipStore((state: BetSlipState) => ({ bets: state.bets }));
  const createBet = (
    betType: "moneyline" | "total",
    selection: "home" | "away" | "over" | "under",
    odds: number,
    line?: number
  ) => {
    addBet({
      id: `${game.id}-${betType}-${selection}${line ? `-${line}` : ""}`,
      gameId: game.id,
      betType,
      selection,
      odds,
      line,
      stake: 0,
      potentialPayout: 0,
      game,
    });
    toast.success(`${selection} added to slip!`);
  };
  const isBetInSlip = (
    betType: "moneyline" | "total",
    selection: "home" | "away" | "over" | "under",
    line?: number
  ) =>
    betSlip.bets.some(
      (b: Bet) =>
        b.gameId === game.id &&
        b.betType === betType &&
        b.selection === selection &&
        (line === undefined || b.line === line)
    );

  return (
    <Card className="bg-card/60 border-border/50 transition-all hover:border-border/80 p-4">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-secondary rounded-full"></div>
            <span className="text-lg font-semibold text-foreground">
              {game.awayTeam.name}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-secondary rounded-full"></div>
            <span className="text-lg font-semibold text-foreground">
              {game.homeTeam.name}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {new Date(game.startTime).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <Button
            variant={isBetInSlip("moneyline", "away") ? "default" : "secondary"}
            className={cn(
              "font-mono",
              isBetInSlip("moneyline", "away") && "bg-primary/80"
            )}
            onClick={() =>
              createBet("moneyline", "away", game.odds.moneyline.away.odds)
            }
          >
            {formatOdds(game.odds.moneyline.away.odds)}
          </Button>
          {game.odds.total.over && (
            <Button
              variant={
                isBetInSlip("total", "over", game.odds.total.over.line)
                  ? "default"
                  : "secondary"
              }
              className={cn(
                "font-mono",
                isBetInSlip("total", "over", game.odds.total.over.line) &&
                  "bg-primary/80"
              )}
              onClick={() =>
                createBet(
                  "total",
                  "over",
                  game.odds.total.over?.odds ?? 0,
                  game.odds.total.over?.line
                )
              }
            >
              O {game.odds.total.over?.line}
            </Button>
          )}
          <Button
            variant={isBetInSlip("moneyline", "home") ? "default" : "secondary"}
            className={cn(
              "font-mono",
              isBetInSlip("moneyline", "home") && "bg-primary/80"
            )}
            onClick={() =>
              createBet("moneyline", "home", game.odds.moneyline.home.odds)
            }
          >
            {formatOdds(game.odds.moneyline.home.odds)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};