'use client'

import { useBetSlipStore } from '@/store/bet-slip'
import { formatOdds } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BetSelection {
  id: string
  gameId: string
  market: 'spread' | 'total' | 'moneyline'
  team: string
  point?: number
  odds: number
  gameDetails: {
    homeTeam: string
    awayTeam: string
  }
}

interface OddsButtonProps {
  selection: BetSelection
  className?: string
}

export default function OddsButton({ selection, className }: OddsButtonProps) {
  const { selections, toggleSelection } = useBetSlipStore()
  const isSelected = !!selections[selection.id]

  return (
    <button
      onClick={() => toggleSelection(selection)}
      className={cn(
        'flex flex-col items-center justify-center p-3 rounded-md border transition-all duration-200 text-sm',
        isSelected
          ? 'bg-ns-blue border-ns-blue text-white shadow-lg'
          : 'bg-ns-dark border-ns-border text-ns-light hover:border-ns-blue/50 hover:bg-ns-border/30',
        className
      )}
    >
      <div className="font-semibold mb-1">
        {selection.team} {selection.point ? `${selection.point > 0 ? '+' : ''}${selection.point}` : ''}
      </div>
      <div className="font-mono text-xs opacity-90">
        {formatOdds(selection.odds)}
      </div>
    </button>
  )
}