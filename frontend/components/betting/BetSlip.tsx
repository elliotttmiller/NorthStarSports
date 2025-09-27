'use client'

import { useBetSlipStore } from '@/store/bet-slip'
import { useUIStore } from '@/store/ui-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatCurrency, formatOdds, calculatePayout } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function BetSlip() {
  const { selections, betType, stakes, parlayStake, toggleSelection, clearAll, setBetType, setStake, setParlayStake } = useBetSlipStore()
  const { isBetSlipOpen } = useUIStore()
  const selectionsArray = Object.values(selections)

  const calculateParlayOdds = () => {
    if (selectionsArray.length < 2) return 0
    const totalDecimalOdds = selectionsArray.reduce((acc, sel) => {
      const decimal = sel.odds > 0 ? 1 + sel.odds / 100 : 1 - 100 / sel.odds
      return acc * decimal
    }, 1)
    return totalDecimalOdds > 2
      ? Math.round((totalDecimalOdds - 1) * 100)
      : Math.round(-100 / (totalDecimalOdds - 1))
  }

  const parlayOdds = calculateParlayOdds()
  const parlayStakeNum = parseFloat(parlayStake) || 0
  const parlayProfit = Math.round(calculatePayout(parlayStakeNum, parlayOdds) * 100) / 100

  const totalSingleStake = selectionsArray.reduce(
    (acc, sel) => acc + (parseFloat(stakes[sel.id] ?? '') || 0),
    0
  )
  const totalSingleProfit = selectionsArray.reduce((acc, sel) => {
    const stake = parseFloat(stakes[sel.id] ?? '') || 0
    return acc + Math.round(calculatePayout(stake, sel.odds) * 100) / 100
  }, 0)

  const totalStake = betType === 'parlay' ? parlayStakeNum : totalSingleStake
  const totalProfit = betType === 'parlay' ? parlayProfit : totalSingleProfit

  return (
    <>
      {/* Toggle Button - Hidden on mobile */}
      <Button
        variant="ghost"
        size="icon"
        onClick={useUIStore().toggleBetSlip}
        className={cn(
          'fixed top-1/2 -translate-y-1/2 z-50 w-6 h-12 bg-ns-card/80 border border-ns-border/50 hover:bg-ns-border/30 backdrop-blur-sm transition-all duration-300 rounded-l-lg rounded-r-none shadow-lg',
          'hidden md:flex', // Hidden on mobile
          isBetSlipOpen ? 'right-[320px]' : 'right-0'
        )}
      >
        {isBetSlipOpen ? (
          <ChevronRight className="h-3 w-3 text-ns-light" />
        ) : (
          <ChevronLeft className="h-3 w-3 text-ns-light" />
        )}
      </Button>

      {/* Bet Slip Panel - Hidden on mobile */}
      <aside
        className={cn(
          'fixed right-0 top-16 bottom-0 bg-ns-card border-l border-ns-border flex flex-col transition-all duration-300 ease-in-out z-40',
          'hidden md:flex', // Hidden on mobile
          isBetSlipOpen ? 'w-[320px] translate-x-0' : 'w-[320px] translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-ns-border">
          <h2 className="text-lg font-bold text-ns-light">Bet Slip</h2>
          {selectionsArray.length > 0 && (
            <button onClick={clearAll} className="text-xs text-ns-muted hover:text-ns-light">
              Clear All
            </button>
          )}
        </div>

        {selectionsArray.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <FileText className="h-12 w-12 text-ns-muted mb-4" />
            <h3 className="font-semibold text-ns-light">Build Your Bet</h3>
            <p className="text-xs text-ns-muted mt-1">
              Click on odds to add selections to your bet slip.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Toggle */}
              {selectionsArray.length > 1 && (
                <div className="flex bg-ns-dark p-1 rounded-md">
                  <button
                    onClick={() => setBetType('single')}
                    className={cn(
                      'flex-1 text-center text-xs font-semibold py-1.5 rounded',
                      betType === 'single' ? 'bg-ns-blue text-white' : 'text-ns-muted'
                    )}
                  >
                    Single Bets
                  </button>
                  <button
                    onClick={() => setBetType('parlay')}
                    className={cn(
                      'flex-1 text-center text-xs font-semibold py-1.5 rounded',
                      betType === 'parlay' ? 'bg-ns-blue text-white' : 'text-ns-muted'
                    )}
                  >
                    Parlay
                  </button>
                </div>
              )}

              {/* Selections */}
              {betType === 'single' &&
                selectionsArray.map((sel) => (
                  <div key={sel.id} className="bg-ns-dark p-3 rounded-md border border-ns-border">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs text-ns-muted">
                        {sel.gameDetails.awayTeam} @ {sel.gameDetails.homeTeam}
                      </div>
                      <button onClick={() => toggleSelection(sel)} title="Remove selection">
                        <X className="h-4 w-4 text-ns-muted" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-ns-light">
                        {sel.team} {sel.point ? `${sel.point > 0 ? '+' : ''}${sel.point}` : ''}
                      </p>
                      <Badge variant="outline" className="font-mono">{formatOdds(sel.odds)}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Stake"
                        className="h-8 text-xs bg-ns-card"
                        value={stakes[sel.id] || ''}
                        onChange={(e) => setStake(sel.id, e.target.value)}
                      />
                      <div className="text-xs text-ns-muted whitespace-nowrap">
                        Win: {formatCurrency(Math.round(calculatePayout(parseFloat(stakes[sel.id] ?? '') || 0, sel.odds) * 100) / 100)}
                      </div>
                    </div>
                  </div>
                ))}

              {betType === 'parlay' && (
                <div className="bg-ns-dark p-3 rounded-md border border-ns-border space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-ns-light">{selectionsArray.length}-Team Parlay</p>
                    <Badge variant="outline" className="font-mono">{formatOdds(parlayOdds)}</Badge>
                  </div>
                  {selectionsArray.map((sel) => (
                    <div key={sel.id} className="text-xs flex justify-between items-center text-ns-muted">
                      <span>{sel.team} {sel.point ? `${sel.point > 0 ? '+' : ''}${sel.point}` : ''}</span>
                      <span>{formatOdds(sel.odds)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-ns-border space-y-3">
              {betType === 'parlay' && (
                <Input
                  type="number"
                  placeholder="Parlay Stake"
                  className="h-8 text-xs bg-ns-dark"
                  value={parlayStake}
                  onChange={(e) => setParlayStake(e.target.value)}
                />
              )}
              <div className="text-xs space-y-1">
                <div className="flex justify-between text-ns-muted">
                  <span>Total Stake</span>
                  <span>{formatCurrency(totalStake)}</span>
                </div>
                <div className="flex justify-between text-ns-muted">
                  <span>Potential Payout</span>
                  <span>{formatCurrency(totalProfit)}</span>
                </div>
              </div>
              <Button className="w-full" disabled={totalStake <= 0}>
                Place Bet
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}