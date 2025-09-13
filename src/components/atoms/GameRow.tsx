/**
 * GameRow - Atomic Component
 * Represents a single game with betting options
 * Follows Protocol of Radical Reusability with Quick Bet integration
 */

import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useBettingUtils } from '@/hooks'
import { useQuickBet } from '@/contexts/QuickBetContext'
import type { GameRowProps, Bet } from '@/types'

function GameRowComponent({ 
  game, 
  onBetClick,
  className,
  ...props 
}: GameRowProps & React.HTMLAttributes<HTMLDivElement>) {
  const { formatOdds } = useBettingUtils()
  const { showQuickBet } = useQuickBet()

  const handleBetClick = (event: React.MouseEvent, betType: Bet['betType'], teamName: string, odds: number, line?: number, isOver?: boolean) => {
    event.preventDefault()
    
    // Get button position for modal placement
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10
    }

    const bet = {
      gameId: game.id,
      teamName,
      betType,
      odds,
      line,
      isOver,
    }
    
    // Show QuickBet modal
    showQuickBet(bet, position)
    
    // Also call legacy handler for compatibility
    onBetClick(bet)
  }

  return (
    <div 
      className={cn(
        "grid grid-cols-6 items-center py-fluid-sm px-fluid-md gap-2",
        "border-b border-border/50 hover:bg-muted/30 transition-colors duration-200",
        "fluid-container",
        className
      )}
      {...props}
    >
      {/* Time Column */}
      <div className="text-xs text-muted-foreground overflow-safe">
        {game.time}
      </div>

      {/* Team Column */}
      <div className="space-y-1">
        <div className="text-sm font-medium overflow-safe">{game.awayTeam}</div>
        <div className="text-sm font-medium overflow-safe">{game.homeTeam}</div>
      </div>

      {/* Spread Column */}
      <div className="space-y-1">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-xs font-mono overflow-safe"
          onClick={(e) => handleBetClick(e, 'spread', game.awayTeam, game.awaySpreadOdds, game.awaySpread)}
        >
          {game.awaySpread > 0 ? '+' : ''}{game.awaySpread} {formatOdds(game.awaySpreadOdds)}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-xs font-mono overflow-safe"
          onClick={(e) => handleBetClick(e, 'spread', game.homeTeam, game.homeSpreadOdds, game.homeSpread)}
        >
          {game.homeSpread > 0 ? '+' : ''}{game.homeSpread} {formatOdds(game.homeSpreadOdds)}
        </Button>
      </div>

      {/* Total Column */}
      <div className="space-y-1">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-xs font-mono overflow-safe"
          onClick={(e) => handleBetClick(e, 'total', `${game.awayTeam} vs ${game.homeTeam}`, game.overOdds, game.total, true)}
        >
          O{game.total} {formatOdds(game.overOdds)}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-xs font-mono overflow-safe"
          onClick={(e) => handleBetClick(e, 'total', `${game.awayTeam} vs ${game.homeTeam}`, game.underOdds, game.total, false)}
        >
          U{game.total} {formatOdds(game.underOdds)}
        </Button>
      </div>

      {/* Moneyline Column */}
      <div className="space-y-1">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-xs font-mono overflow-safe"
          onClick={(e) => handleBetClick(e, 'moneyline', game.awayTeam, game.awayMoneyline)}
        >
          {formatOdds(game.awayMoneyline)}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-xs font-mono overflow-safe"
          onClick={(e) => handleBetClick(e, 'moneyline', game.homeTeam, game.homeMoneyline)}
        >
          {formatOdds(game.homeMoneyline)}
        </Button>
      </div>

      {/* More Options Column */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs text-muted-foreground overflow-safe"
          onClick={() => {
            // Future: Open prop builder or more betting options
          }}
        >
          +{Math.floor(Math.random() * 50) + 100}
        </Button>
      </div>
    </div>
  )
}

// Memoized export for performance optimization
export const GameRow = React.memo(GameRowComponent)