"use client";
import { Game, Bet } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBetSlipStore } from "@/store/betSlipStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatOdds } from "@/lib/formatters";

export const GameCard = ({ game }: { game: Game }) => {
  const { addBet, bets } = useBetSlipStore();
  const createBet = (selection: Bet["selection"], odds: number, line?: number) => {
    const bet: Bet = {
      id: `${game.id}-${selection}-${line || ""}`,
      gameId: game.id,
      selection,
      odds,
      line,
      game,
      stake: 0,
      potentialPayout: 0,
      betType: "moneyline"
    };
    addBet(bet);
    toast.success(`${selection} added to slip!`);
  };
  const isBetInSlip = (selection: Bet["selection"], line?: number) => bets.some((b) => b.gameId === game.id && b.selection === selection && b.line === line);

  const over = game.odds.total?.over;

  return (
    <Card className="bg-card/60 border-border/50 transition-all hover:border-border/80 p-4" aria-label={`Game card for ${game.awayTeam.name} vs ${game.homeTeam.name}`} role="listitem">
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
          <Button variant={isBetInSlip("away") ? "default" : "secondary"} className={cn("font-mono", isBetInSlip("away") && "bg-primary/80")}
            onClick={() => createBet("away", game.odds.moneyline.away.odds)}>
            {formatOdds(game.odds.moneyline.away.odds)}
          </Button>
          {over ? (
            <Button variant={isBetInSlip("over", over.line) ? "default" : "secondary"} className={cn("font-mono", isBetInSlip("over", over.line) && "bg-primary/80")}
              onClick={() => createBet("over", over.odds, over.line)}>
              O {over.line}
            </Button>
          ) : (
            <Button variant="secondary" disabled>
              O -
            </Button>
          )}
          <Button variant={isBetInSlip("home") ? "default" : "secondary"} className={cn("font-mono", isBetInSlip("home") && "bg-primary/80")}
            onClick={() => createBet("home", game.odds.moneyline.home.odds)}>
            {formatOdds(game.odds.moneyline.home.odds)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};