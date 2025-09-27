'use client'

import { useBetSlipStore } from '@/store/bet-slip'
import { useMobileStore } from '@/store/mobile-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X, FileText } from 'lucide-react'
import { formatCurrency, formatOdds, calculatePayout } from '@/lib/utils'

export default function MobileBetSheet() {
  const { 
    selections, 
    stakes, 
    clearAll, 
    setStake, 
    toggleSelection 
  } = useBetSlipStore()
  
  const { isBetSheetOpen, setBetSheet } = useMobileStore()
  
  const selectionsArray = Object.values(selections)

  const totalSingleStake = selectionsArray.reduce(
    (acc, sel) => acc + (parseFloat(stakes[sel.id] ?? '') || 0),
    0
  )

  const totalSingleProfit = selectionsArray.reduce((acc, sel) => {
    const stake = parseFloat(stakes[sel.id] ?? '') || 0
    return acc + Math.round(calculatePayout(stake, sel.odds) * 100) / 100
  }, 0)

  if (!isBetSheetOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        onClick={() => setBetSheet(false)}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-ns-card rounded-t-2xl border-t border-ns-border max-h-[80vh] flex flex-col md:hidden">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-ns-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-ns-border">
          <h2 className="text-lg font-bold text-ns-light">Bet Slip</h2>
          <div className="flex items-center space-x-2">
            {selectionsArray.length > 0 && (
              <button 
                onClick={clearAll} 
                className="text-xs text-ns-muted hover:text-ns-light"
              >
                Clear All
              </button>
            )}
            <button 
              onClick={() => setBetSheet(false)}
              className="p-2 rounded-full hover:bg-ns-border/50"
              title="Close bet sheet"
            >
              <X className="h-5 w-5 text-ns-muted" />
            </button>
          </div>
        </div>

        {selectionsArray.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <FileText className="h-12 w-12 text-ns-muted mb-4" />
            <h3 className="font-semibold text-ns-light">Build Your Bet</h3>
            <p className="text-sm text-ns-muted mt-1">
              Tap on odds to add selections to your bet slip.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Selections */}
              {selectionsArray.map((sel) => (
                <div key={sel.id} className="bg-ns-dark p-4 rounded-md border border-ns-border">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm text-ns-muted">
                      {sel.gameDetails.awayTeam} @ {sel.gameDetails.homeTeam}
                    </div>
                    <button 
                      onClick={() => toggleSelection(sel)}
                      title="Remove selection"
                    >
                      <X className="h-4 w-4 text-ns-muted" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-base font-semibold text-ns-light">
                      {sel.team} {sel.point ? `${sel.point > 0 ? '+' : ''}${sel.point}` : ''}
                    </p>
                    <Badge variant="outline" className="font-mono">{formatOdds(sel.odds)}</Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Input
                      type="number"
                      placeholder="Stake"
                      className="h-10 bg-ns-card text-base"
                      value={stakes[sel.id] || ''}
                      onChange={(e) => setStake(sel.id, e.target.value)}
                    />
                    <div className="text-sm text-ns-muted whitespace-nowrap">
                      Win: {formatCurrency(Math.round(calculatePayout(parseFloat(stakes[sel.id] || '') || 0, sel.odds) * 100) / 100)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-ns-border space-y-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between text-ns-muted">
                  <span>Total Stake</span>
                  <span>{formatCurrency(totalSingleStake)}</span>
                </div>
                <div className="flex justify-between text-ns-muted">
                  <span>Potential Payout</span>
                  <span>{formatCurrency(totalSingleProfit)}</span>
                </div>
              </div>
              <Button className="w-full h-12 text-base" disabled={totalSingleStake <= 0}>
                Place Bet
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}