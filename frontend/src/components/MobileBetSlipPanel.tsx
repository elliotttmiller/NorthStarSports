import { useState } from 'react';
import type { Bet, Game } from '@/types';
import { useBetSlip } from '@/context/BetSlipContext';
import { useBetsContext } from '@/context/BetsContext';
import { useNavigation } from '@/context/NavigationContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { formatBetDescription, formatMatchup } from '@/lib/betFormatters';
import { AnimatePresence, motion } from 'framer-motion';
import { X, TrendUp, Trash } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatOdds } from '@/lib/formatters';
import { SmoothScrollContainer } from '@/components/VirtualScrolling';

// Minimal mobile betslip panel, can be styled further
export function MobileBetSlipPanel() {
  const { betSlip, removeBet, updateStake, setBetType, clearBetSlip } = useBetSlip();
  const { addBet, refreshBets } = useBetsContext();
  const { navigation, setIsBetSlipOpen } = useNavigation();
  const isMobile = useIsMobile();
  const [placing, setPlacing] = useState(false);
  const [toast, setToast] = useState<string>('');

  const isOpen = navigation.isBetSlipOpen;

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2000);
  };

  const handlePlaceBets = async () => {
    if (betSlip.bets.length === 0) return;
    
    setPlacing(true);
    
    try {
      if (betSlip.betType === 'single') {
        for (const bet of betSlip.bets) {
          // Create a proper Bet object with all required fields
          const newBet: Bet = {
            id: crypto.randomUUID(), // Generate new ID for the placed bet
            gameId: bet.gameId,
            betType: bet.betType,
            selection: bet.selection,
            odds: bet.odds,
            line: bet.line,
            stake: bet.stake,
            potentialPayout: bet.potentialPayout,
            game: bet.game,
            legs: bet.legs,
            periodOrQuarterOrHalf: bet.periodOrQuarterOrHalf,
            playerProp: bet.playerProp
          };
          await addBet(newBet);
        }
      } else {
        // For parlay, create a single bet with all legs
        const parlayBet: Bet = {
          id: crypto.randomUUID(),
          gameId: 'parlay', 
          betType: 'parlay' as const,
          selection: betSlip.bets[0]?.selection || 'over', // Default selection for parlay
          odds: betSlip.totalOdds,
          line: undefined,
          stake: betSlip.totalStake,
          potentialPayout: betSlip.totalPayout,
          game: betSlip.bets[0]?.game || {} as Game, // Use first game as representative
          legs: betSlip.bets // This preserves individual bet details
        };
        await addBet(parlayBet);
      }
      
      // Refresh active bets to show newly placed bets
      await refreshBets();
      
      showToast('Bet(s) placed successfully!');
      clearBetSlip();
      
      // Close panel after a short delay
      setTimeout(() => {
        setIsBetSlipOpen(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to place bets:', error);
      showToast('Failed to place bets. Please try again.');
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
          className="fixed right-0 bottom-0 left-0 z-[99] flex h-[88vh] max-h-[92vh] flex-col rounded-t-2xl border-t border-border bg-background/95 shadow-2xl backdrop-blur-xl professional-scroll professional-spacing-mobile"
        >
          {/* Minimal header - more compact */}
          <div className="flex items-center justify-between px-3 pt-3 pb-1">
            <span className="font-bold text-base">Bet Slip</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBetSlipOpen(false)}
              className="text-foreground hover:bg-muted/20 rounded-full h-8 w-8"
              aria-label="Close betslip"
            >
              <X size={16} />
            </Button>
          </div>
          {/* Bet type toggle - more compact */}
          <div className="px-3 pb-2">
            <Tabs value={betSlip.betType} onValueChange={setBetType} className="w-full">
              <TabsList className="w-full grid grid-cols-2 bg-muted rounded-lg mb-1 border border-border/60 h-8">
                <TabsTrigger
                  value="single"
                  className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-xs font-bold py-1 h-8 flex items-center justify-center transition-all"
                >
                  Straight
                </TabsTrigger>
                <TabsTrigger
                  value="parlay"
                  className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-xs font-bold py-1 h-8 flex items-center justify-center transition-all"
                >
                  Parlay
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Betslip content with invisible scrolling - more compact */}
          <SmoothScrollContainer 
            className="flex-1 min-h-0 professional-scroll" 
            showScrollbar={false}
            maxHeight="100%"
          >
            <div className="px-3 pb-2 space-y-2">
              {betSlip.betType === 'single' ? (
                betSlip.bets.map((bet) => (
                  <motion.div 
                    key={bet.id} 
                    className="bg-card border border-border/60 rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header section with bet details and odds */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="text-xs font-bold text-foreground truncate mb-0.5">
                          {formatBetDescription(bet)}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {formatMatchup(bet)}
                        </div>
                      </div>
                      <Badge className="text-accent border-accent/40 bg-accent/15 font-mono px-4 py-1.5 text-sm font-bold min-w-[80px] text-center flex-shrink-0">
                        {formatOdds(bet.odds)}
                      </Badge>
                    </div>
                    
                    <Separator className="opacity-20 mb-2" />
                    
                    {/* Stakes and Win with delete button layout */}
                    <div className="flex items-center">
                      <div className="flex-1 space-y-1.5 pr-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-semibold">Stake:</span>
                          <Input
                            type="number"
                            min="0"
                            max="10000"
                            step="1"
                            value={bet.stake || ''}
                            onChange={(e) => updateStake(bet.id, parseFloat(e.target.value) || 0)}
                            className="w-16 h-6 text-xs bg-background/60 border-border/60 rounded-md text-right"
                            placeholder="0"
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs bg-gradient-to-r from-secondary/15 to-secondary/25 rounded-md p-1.5 border border-border/30">
                          <span className="text-muted-foreground font-semibold">Win:</span>
                          <span className="font-bold text-[color:var(--color-win)]">
                            ${bet.stake > 0 ? (bet.potentialPayout - bet.stake).toFixed(2) : '0.00'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBet(bet.id)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
                        >
                          <Trash size={12} />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="bg-card border border-accent/40 rounded-lg p-3 space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Parlay Header - enhanced with longer, more distinct total odds */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-foreground">
                      Parlay ({betSlip.bets.length} picks)
                    </div>
                    <Badge className="text-accent border-accent/40 bg-accent/15 font-mono px-4 py-1.5 text-sm font-bold min-w-[80px] text-center">
                      {formatOdds(betSlip.totalOdds)}
                    </Badge>
                  </div>
                  
                  {/* Parlay Legs - restructured for consistent alignment */}
                  <div className="space-y-2">
                    {betSlip.bets.map((bet) => (
                      <div key={bet.id} className="flex items-start py-1.5 border-b border-border/15 last:border-b-0">
                        {/* Left section: Bet details and odds */}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold text-foreground truncate">
                                {formatBetDescription(bet)}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {formatMatchup(bet)}
                              </div>
                            </div>
                            <div className="ml-3 flex-shrink-0">
                              <Badge className="text-accent border-accent/40 bg-accent/15 font-mono text-xs px-3 py-1 font-bold min-w-[65px] text-center">
                                {formatOdds(bet.odds)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right section: Centered delete button */}
                        <div className="flex items-center justify-center ml-3 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBet(bet.id)}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
                          >
                            <Trash size={11} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="opacity-20 my-1" />
                  
                  {/* Parlay Stake and Win - right aligned to match straight bets */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-semibold">Stake:</span>
                      <Input
                        type="number"
                        min="0"
                        max="10000"
                        step="1"
                        value={betSlip.bets[0]?.stake || ''}
                        onChange={(e) => betSlip.bets[0] && updateStake(betSlip.bets[0].id, parseFloat(e.target.value) || 0)}
                        className="w-16 h-6 text-xs bg-background/60 border-border/60 rounded-md text-right"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs bg-gradient-to-r from-secondary/15 to-secondary/25 rounded-md p-1.5 border border-border/30">
                      <span className="text-muted-foreground font-semibold">Win:</span>
                      <span className="font-bold text-[color:var(--color-win)]">
                        ${betSlip.totalPayout > betSlip.totalStake ? (betSlip.totalPayout - betSlip.totalStake).toFixed(2) : '0.00'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </SmoothScrollContainer>
          
          {/* Summary and Place Bet actions - more compact */}
          {betSlip.bets.length > 0 && (
            <div className="border-t border-border bg-background/95 p-3 space-y-3">
              {/* Summary Card - more compact */}
              <div className="bg-gradient-to-r from-secondary/15 to-secondary/25 border border-border/40 rounded-lg p-2.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-semibold w-12">Stake:</span>
                  <span className="font-bold text-foreground text-sm w-16 text-right">
                    ${betSlip.totalStake.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-semibold w-12">Win:</span>
                  <span className="font-bold text-[color:var(--color-win)] text-sm w-16 text-right">
                    ${betSlip.totalPayout > betSlip.totalStake ? (betSlip.totalPayout - betSlip.totalStake).toFixed(2) : '0.00'}
                  </span>
                </div>
                <Separator className="opacity-20" />
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-muted-foreground font-semibold w-12">Total:</span>
                  <span className="font-bold text-accent text-base w-16 text-right">
                    ${betSlip.totalPayout.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons - more compact */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={clearBetSlip}
                  className="w-full h-8 text-xs border-border/60 bg-muted/20 hover:bg-muted/40 rounded-lg"
                >
                  Clear Bet Slip
                </Button>
                <Button
                  onClick={handlePlaceBets}
                  disabled={placing}
                  className="w-full h-10 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-lg"
                >
                  <TrendUp size={16} className="mr-1.5" />
                  {placing ? 'Placing...' : `Place ${betSlip.betType === 'single' ? 'Bets' : 'Parlay'}`}
                </Button>
              </div>
              
              {/* Toast Message */}
              {toast && (
                <div className="w-full text-center text-xs font-semibold text-accent bg-accent/10 rounded-lg py-2 border border-accent/20">
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
