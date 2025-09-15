import { useBetSlip } from '@/context/BetSlipContext';
import { useNavigation } from '@/context/NavigationContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';
import { useBetsContext } from '@/context/BetsContext';
import { useBetHistoryContext } from '@/context/BetHistoryContext';
import { useUserContext } from '@/context/UserContext';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Stack, TrendUp } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatOdds } from '@/lib/formatters';

import { useState } from 'react';

// Minimal mobile betslip panel, can be styled further
export function MobileBetSlipPanel() {
  const { betSlip, removeBet, updateStake, setBetType, clearBetSlip } = useBetSlip();
  const { navigation, setIsBetSlipOpen } = useNavigation();
  const isMobile = useIsMobile();
  const isOpen = navigation.isBetSlipOpen;
  const { addBet } = useBetsContext();
  const { addBetSlipToHistory } = useBetHistoryContext();
  const { addBetSlipToHistory: addBetSlipToUserHistory } = useUserContext();
  const [placing, setPlacing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Helper to show a toast for 2s
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  // Place bets/parlay handler
  const handlePlaceBets = async () => {
    if (placing || betSlip.bets.length === 0) return;
    setPlacing(true);
    try {
      if (betSlip.betType === 'single') {
        // Place each bet as a single
        for (const bet of betSlip.bets) {
          await addBet(bet);
        }
      } else if (betSlip.betType === 'parlay') {
        // Place a single parlay bet object
        const parlayBet = {
          ...betSlip.bets[0],
          id: `parlay-${Date.now()}`,
          betType: 'parlay' as const,
          legs: betSlip.bets,
          stake: betSlip.totalStake,
          potentialPayout: betSlip.totalPayout,
          odds: betSlip.totalOdds,
        };
        await addBet(parlayBet);
      }
      // Add betslip to history (both user and global)
      await addBetSlipToHistory(betSlip.bets.map(b => b.id).join(','));
      await addBetSlipToUserHistory(betSlip.bets.map(b => b.id).join(','));
      clearBetSlip();
      showToast('Bet(s) placed!');
      setIsBetSlipOpen(false);
    } catch (err) {
      showToast('Error placing bet(s)');
    } finally {
      setPlacing(false);
    }
  };

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed right-0 bottom-0 left-0 z-[99] flex h-[88vh] max-h-[92vh] flex-col rounded-t-2xl border-t border-border bg-background/95 shadow-2xl backdrop-blur-xl"
        >
          {/* Minimal header */}
          <div className="flex items-center justify-between px-3 pt-3 pb-1">
            <span className="font-bold text-base">Bet Slip</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBetSlipOpen(false)}
              className="text-foreground hover:bg-muted/20 rounded-full"
              aria-label="Close betslip"
            >
              <X size={22} />
            </Button>
          </div>
          {/* Bet type toggle, compact */}
          <div className="px-3 pb-1">
            <Tabs value={betSlip.betType} onValueChange={setBetType} className="w-full">
              <TabsList className="w-full grid grid-cols-2 bg-muted rounded-xl mb-2 border border-border/60 h-10">
                <TabsTrigger
                  value="single"
                  className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-sm font-bold py-1 h-10 flex items-center justify-center transition-all"
                >
                  Straight
                </TabsTrigger>
                <TabsTrigger
                  value="parlay"
                  className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-sm font-bold py-1 h-10 flex items-center justify-center transition-all"
                >
                  Parlay
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {/* Betslip content, scrollable, flat list */}
          <div className="flex-1 overflow-y-auto flex flex-col px-1 pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {betSlip.betType === 'single' ? (
              <div className="divide-y divide-border/40">
                  {betSlip.bets.map((bet) => (
                    <div
                      key={bet.id}
                      className="group w-full rounded-xl bg-background/90 border border-border/60 shadow-sm mb-2 transition-all duration-200 flex items-stretch px-4 py-3 gap-2 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                      style={{ boxSizing: 'border-box', willChange: 'transform' }}
                    >
                      {/* Left: Team names, left-aligned */}
                      <div className="flex flex-col justify-center gap-0.5 min-w-0 flex-1 text-left">
                        <span className="text-sm font-semibold truncate">
                          {bet.game?.awayTeam?.shortName}
                          <span className="text-muted-foreground font-normal"> @ </span>
                          {bet.game?.homeTeam?.shortName}
                        </span>
                      </div>
                      {/* Right: Odds, Stake, Remove, right-aligned */}
                      <div className="flex items-center gap-2 min-w-0 justify-end text-right">
                        <Badge className="text-accent border-accent/40 bg-accent/15 font-mono px-2 py-0.5 text-xs min-w-[32px] text-center flex items-center justify-center rounded-md">
                          {formatOdds(bet.odds)}
                        </Badge>
                        <Input
                          inputMode="decimal"
                          pattern="[0-9]*"
                          value={bet.stake || ''}
                          onChange={e => updateStake(bet.id, parseFloat(e.target.value.replace(/[^\d.]/g, '')) || 0)}
                          className="w-16 h-8 text-xs bg-background/80 border-none outline-none rounded-md px-2 py-1 text-right shadow-xs transition-all duration-150 focus:bg-background/95 focus:shadow-[0_0_0_2px_var(--color-accent)] hover:bg-background/90 placeholder:text-muted-foreground"
                          placeholder="Stake"
                          style={{ fontSize: '0.95rem', borderRadius: '0.5rem', boxShadow: 'none' }}
                        />
                        <button
                          onClick={() => removeBet(bet.id)}
                          className="p-0 m-0 bg-transparent border-none outline-none text-muted-foreground hover:text-white transition-all duration-150 hover:shadow-[0_0_8px_0_rgba(80,180,255,0.4)] hover:-translate-y-0.5"
                          aria-label="Remove bet"
                          type="button"
                          style={{ lineHeight: 0 }}
                        >
                          <X size={15} weight="bold" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="w-full bg-card border border-border shadow rounded-xl mb-3 px-3 pt-3 pb-2">
                <div className="flex items-center w-full gap-2">
                  <span className="text-sm font-bold truncate flex-1 pr-2">Parlay Slip ({betSlip.bets.length} picks)</span>
                  <Badge
                    variant="outline"
                    className="border-accent/50 text-accent bg-accent/20 font-mono text-xs px-6 py-1 min-w-[70px] text-center rounded-md ml-auto"
                    style={{ minWidth: 70, fontWeight: 600 } as React.CSSProperties}
                  >
                    {formatOdds(betSlip.totalOdds)}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1 px-2 pb-3 pt-1 divide-y divide-border/30">
                  {betSlip.bets.map((bet) => (
                    <div
                      key={bet.id}
                      className="flex items-center py-1 w-full mt-2"
                    >
                      {/* Left: Team names, left-aligned */}
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-xs font-semibold text-foreground truncate">
                          {bet.game?.awayTeam?.shortName}
                          <span className="text-muted-foreground font-normal"> @ </span>
                          {bet.game?.homeTeam?.shortName}
                        </div>
                      </div>
                      {/* Right: Odds, right-aligned, and Delete */}
                      <div className="flex items-center justify-end flex-1 text-right gap-2">
                        <Badge className="text-xs font-mono border-accent/40 text-accent bg-accent/15 px-2.5 py-0.5 min-w-[40px] text-center rounded-md ml-auto" style={{ minWidth: 40 }}>
                          {formatOdds(bet.odds)}
                        </Badge>
                        <button
                          onClick={() => removeBet(bet.id)}
                          className="p-0 m-0 bg-transparent border-none outline-none text-muted-foreground hover:text-white transition-all duration-150 hover:shadow-[0_0_8px_0_rgba(80,180,255,0.4)] hover:-translate-y-0.5"
                          aria-label="Remove bet"
                          type="button"
                          style={{ lineHeight: 0 }}
                        >
                          <X size={15} weight="bold" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2 justify-between w-full">
                    <span className="text-xs font-bold whitespace-nowrap text-left">Total Stake:</span>
                    <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9.]*"
                        value={betSlip.bets[0]?.stake || ''}
                        onChange={e => betSlip.bets[0] && updateStake(betSlip.bets[0].id, parseFloat(e.target.value.replace(/[^\d.]/g, '')) || 0)}
                        className="h-8 text-xs bg-background/80 border-none outline-none rounded-md px-3 py-1 text-center shadow-xs transition-all duration-150 focus:bg-background/95 focus:shadow-[0_0_0_2px_var(--color-accent)] hover:bg-background/90 placeholder:text-muted-foreground autofit-input"
                        placeholder="0.00"
                        style={{ fontSize: '0.95rem', borderRadius: '0.5rem', boxShadow: 'none', width: 'auto', minWidth: 48, maxWidth: 96 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Summary and Place Bet actions always at bottom */}
          {betSlip.bets.length > 0 && (
            <div className="p-3 border-t border-border bg-background/95 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-semibold">Total Stake:</span>
                <span className="font-bold text-foreground text-sm">${betSlip.totalStake.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-semibold">Potential Payout:</span>
                <span className="font-bold text-accent text-sm">${betSlip.totalPayout.toFixed(2)}</span>
              </div>
              <button
                onClick={clearBetSlip}
                className="w-4/5 mx-auto mt-1 text-xs py-2 rounded-md bg-muted/40 text-muted-foreground transition-all duration-150 hover:bg-muted/70 hover:text-foreground hover:shadow-[0_0_8px_0_rgba(120,120,120,0.18)] hover:font-semibold focus:outline-none"
                type="button"
              >
                Clear Bet Slip
              </button>
              <button
                className="w-full h-10 mt-1 font-bold text-base rounded-lg shadow bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center gap-2 transition-all duration-150 hover:shadow-[0_0_12px_0_rgba(80,180,255,0.18)] hover:-translate-y-0.5 focus:outline-none"
                onClick={handlePlaceBets}
                disabled={placing}
                type="button"
              >
                <TrendUp size={18} />
                {placing ? 'Placing...' : `Place ${betSlip.betType === 'single' ? 'Bets' : 'Parlay'}`}
              </button>
              {toast && (
                <div className="mt-2 w-full text-center text-xs font-semibold text-accent bg-accent/10 rounded-lg py-2 animate-fadeIn">
                  {toast}
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>

  );
}

