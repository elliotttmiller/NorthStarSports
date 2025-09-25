"use client";
import { Game } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useBetSlip } from "../../context/BetSlipContext";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

export const GameCard = ({ game }: { game: Game }) => {
  const { addBet, betSlip } = useBetSlip();
  const createBet = (
    betType: "moneyline" | "total",
    selection: "home" | "away" | "over" | "under",
    odds?: number,
    line?: number
  ) => {
    if (typeof odds !== "number") return;
    addBet(game, betType, selection, odds, line);
    toast.success("Bet added to slip!");
  };
  const isBetInSlip = (selection: string, line?: number) => betSlip.bets.some((b) => b.gameId === game.id && b.selection === selection && b.line === line);

  return (
    <Card className="bg-card border-border/50 transition-all hover:border-border/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-muted-foreground">
          {new Date(game.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {game.leagueId}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">{game.awayTeam.name}</span>
            {typeof game.odds.moneyline?.away?.odds === "number" && (
              <Button variant={isBetInSlip(game.awayTeam.name) ? "default" : "secondary"} className={cn("w-28 font-mono", isBetInSlip(game.awayTeam.name) && "bg-primary/80")} onClick={() => createBet("moneyline", "away", game.odds.moneyline.away.odds)}>
                {game.odds.moneyline.away.odds > 0 ? `+${game.odds.moneyline.away.odds}` : game.odds.moneyline.away.odds}
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">{game.homeTeam.name}</span>
            {typeof game.odds.moneyline?.home?.odds === "number" && (
              <Button variant={isBetInSlip(game.homeTeam.name) ? "default" : "secondary"} className={cn("w-28 font-mono", isBetInSlip(game.homeTeam.name) && "bg-primary/80")} onClick={() => createBet("moneyline", "home", game.odds.moneyline.home.odds)}>
                {game.odds.moneyline.home.odds > 0 ? `+${game.odds.moneyline.home.odds}` : game.odds.moneyline.home.odds}
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total</span>
          <div className="flex gap-2">
            {game.odds.total?.over && typeof game.odds.total.over.line === "number" && typeof game.odds.total.over.odds === "number" && (
              <Button variant={isBetInSlip("Over", game.odds.total.over.line) ? "default" : "secondary"} className={cn("w-28 font-mono", isBetInSlip("Over", game.odds.total.over.line) && "bg-primary/80")} onClick={() => createBet("total", "over", game.odds.total.over.odds, game.odds.total.over.line)}>
                O {game.odds.total.over.line}
              </Button>
            )}
            {game.odds.total?.under && typeof game.odds.total.under.line === "number" && typeof game.odds.total.under.odds === "number" && (
              <Button variant={isBetInSlip("Under", game.odds.total.under.line) ? "default" : "secondary"} className={cn("w-28 font-mono", isBetInSlip("Under", game.odds.total.under.line) && "bg-primary/80")} onClick={() => createBet("total", "under", game.odds.total.under.odds, game.odds.total.under.line)}>
                U {game.odds.total.under.line}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
