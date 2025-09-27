'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { formatTime } from '@/lib/utils'
import OddsButton from '@/components/betting/OddsButton'
import { BetSelection } from '@/store/bet-slip'
import { cn } from '@/lib/utils'
import type { Game } from '@/types'

interface MobileGameCardProps {
  game: Game
}

export default function MobileGameCard({ game }: MobileGameCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const createSelection = (
    market: 'spread' | 'total' | 'moneyline',
    teamType: 'home' | 'away' | 'over' | 'under'
  ): BetSelection => {
    const gameDetails = { homeTeam: game.homeTeam.name, awayTeam: game.awayTeam.name }
    let team, point, odds, idSuffix

    switch (market) {
      case 'spread':
        team = teamType === 'home' ? game.homeTeam.name : game.awayTeam.name
        point = teamType === 'home' ? game.odds.spread.home : game.odds.spread.away
        odds = game.odds.spread.odds
        idSuffix = `spread-${teamType}`
        break
      case 'total':
        team = teamType === 'over' ? 'Over' : 'Under'
        point = game.odds.total.line
        odds = game.odds.total.odds
        idSuffix = `total-${teamType}`
        break
      case 'moneyline':
        team = teamType === 'home' ? game.homeTeam.name : game.awayTeam.name
        odds = teamType === 'home' ? game.odds.moneyline.home : game.odds.moneyline.away
        idSuffix = `moneyline-${teamType}`
        break
    }

    return {
      id: `${game.id}-${idSuffix}`,
      gameId: game.id,
      market,
      team,
      point: point ?? 0, // Ensure point is always a number
      odds,
      gameDetails,
    } as BetSelection
  }

  return (
    <div className="bg-ns-card border border-ns-border rounded-lg overflow-hidden gpu-accelerated">
      {/* Header Section */}
      <div className="p-fluid-lg border-b border-ns-border">
        <div className="flex items-center justify-between mb-fluid-md">
          <div className="text-fluid-xs text-ns-muted">{formatTime(Math.floor(game.startTime.getTime() / 1000))}</div>
          {game.details && (
            <div className="text-fluid-xs text-ns-muted">{game.details.status}</div>
          )}
        </div>

        <div className="space-y-fluid-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-fluid-sm">
              <div className="w-5 h-5 bg-ns-border rounded-full" />
              <span className="text-fluid-sm font-medium text-ns-light">{game.awayTeam.name}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-fluid-sm">
              <div className="w-5 h-5 bg-ns-border rounded-full" />
              <span className="text-fluid-sm font-medium text-ns-light">{game.homeTeam.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Betting Markets Section */}
      <div className="p-fluid-lg space-y-fluid-lg">
        {/* Spread */}
        <div className="space-y-fluid-sm">
          <h4 className="caption-fluid font-semibold text-ns-muted uppercase">Spread</h4>
          <div className="grid grid-cols-2 gap-fluid-sm">
            <OddsButton selection={createSelection('spread', 'away')} />
            <OddsButton selection={createSelection('spread', 'home')} />
          </div>
        </div>

        {/* Total (Over/Under) */}
        <div className="space-y-fluid-sm">
          <h4 className="caption-fluid font-semibold text-ns-muted uppercase">Total</h4>
          <div className="grid grid-cols-2 gap-fluid-sm">
            <OddsButton selection={createSelection('total', 'over')} />
            <OddsButton selection={createSelection('total', 'under')} />
          </div>
        </div>

        {/* Moneyline */}
        <div className="space-y-fluid-sm">
          <h4 className="caption-fluid font-semibold text-ns-muted uppercase">Moneyline</h4>
          <div className="grid grid-cols-2 gap-fluid-sm">
            <OddsButton selection={createSelection('moneyline', 'away')} />
            <OddsButton selection={createSelection('moneyline', 'home')} />
          </div>
        </div>

        {/* More Info Toggle */}
        <div 
          className="flex items-center justify-center pt-fluid-sm border-t border-ns-border/50 cursor-pointer hover:bg-ns-border/20 -mx-fluid-lg px-fluid-lg py-fluid-sm transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="caption-fluid text-ns-muted mr-fluid-xs">More Details</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform text-ns-muted',
              isExpanded ? 'rotate-180' : ''
            )}
          />
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="pt-fluid-sm border-t border-ns-border/50 caption-fluid text-ns-muted space-y-fluid-xs">
            {game.details && (
              <>
                <div><strong>Status:</strong> {game.details.status}</div>
                <div><strong>Venue:</strong> {game.details.venue}</div>
                <div><strong>League:</strong> {game.details.league}</div>
              </>
            )}
            <div><strong>Start Time:</strong> {game.startTime.toLocaleString()}</div>
          </div>
        )}
      </div>
    </div>
  )
}