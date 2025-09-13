import { Plus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useBetting, Game, Bet } from '@/contexts/BettingContext'
import { sampleLeagues } from '@/data/sampleData'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface GameLinesTableProps {
  className?: string
}

export function GameLinesTable({ className }: GameLinesTableProps) {
  const { selectedLeague, addBet, bets } = useBetting()
  const [isLoading, setIsLoading] = useState(true)
  
  const league = sampleLeagues.find(l => l.id === selectedLeague)
  const games = league?.games || []

  // Simulate loading when league changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [selectedLeague])

  const formatOdds = (odds: number) => {
    if (odds > 0) return `+${odds}`
    return odds.toString()
  }

  const formatSpread = (spread: number) => {
    if (spread > 0) return `+${spread}`
    return spread.toString()
  }

  const isBetSelected = (gameId: string, teamName: string, betType: string) => {
    return bets.some(bet => 
      bet.gameId === gameId && 
      bet.teamName === teamName && 
      bet.betType === betType
    )
  }

  const handleBetClick = (game: Game, teamName: string, betType: 'spread' | 'moneyline' | 'total', odds: number, line?: number, isOver?: boolean) => {
    const bet: Bet = {
      id: `${game.id}-${teamName}-${betType}-${Date.now()}`,
      gameId: game.id,
      teamName,
      betType,
      odds,
      line,
      isOver
    }
    addBet(bet)
  }

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <Card className={cn("flex flex-col h-full", className)}>
      <div className="p-4 border-b bg-accent/5">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-6 w-20 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/30 text-sm font-medium">
        <div className="col-span-3">TIME</div>
        <div className="col-span-2">TEAM</div>
        <div className="col-span-2 text-center">SPREAD</div>
        <div className="col-span-2 text-center">TOTAL</div>
        <div className="col-span-2 text-center">MONEY LINE</div>
        <div className="col-span-1 text-center">MORE</div>
      </div>

      <div className="flex-1 overflow-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border-b">
            {/* Away Team Row */}
            <div className="grid grid-cols-12 gap-4 p-3">
              <div className="col-span-3">
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Skeleton className="w-6 h-6 rounded" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="col-span-2 flex gap-1">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
              </div>
              <div className="col-span-2 flex gap-1">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="col-span-1 flex justify-center">
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
            {/* Home Team Row */}
            <div className="grid grid-cols-12 gap-4 p-3">
              <div className="col-span-3"></div>
              <div className="col-span-2 flex items-center gap-2">
                <Skeleton className="w-6 h-6 rounded" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="col-span-2 flex gap-1">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
              </div>
              <div className="col-span-2 flex gap-1">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="col-span-1 flex justify-center">
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (games.length === 0) {
    return (
      <Card className={cn("flex flex-col h-full", className)}>
        <div className="p-4 border-b bg-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{league?.name || 'Loading...'}</h2>
              <p className="text-sm text-muted-foreground">Sep 14 - WEEK 2</p>
            </div>
            <Button variant="outline" size="sm">
              Update Lines
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">No games available</p>
            <p className="text-sm text-muted-foreground">Check back later for updated lines</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="p-4 border-b bg-accent/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{league?.name}</h2>
            <p className="text-sm text-muted-foreground">Sep 14 - WEEK 2</p>
          </div>
          <Button variant="outline" size="sm">
            Update Lines
          </Button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/30 text-sm font-medium text-muted-foreground">
        <div className="col-span-3">TIME</div>
        <div className="col-span-2">TEAM</div>
        <div className="col-span-2 text-center">SPREAD</div>
        <div className="col-span-2 text-center">TOTAL</div>
        <div className="col-span-2 text-center">MONEY LINE</div>
        <div className="col-span-1 text-center">MORE</div>
      </div>

      {/* Games List */}
      <div className="flex-1 overflow-auto">
        {games.map((game, index) => (
          <div key={game.id} className="border-b last:border-b-0">
            {/* Away Team Row */}
            <div className="grid grid-cols-12 gap-4 p-3 hover:bg-muted/20 transition-colors">
              <div className="col-span-3 text-sm text-muted-foreground">
                {index === 0 ? game.time : ''}
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs font-bold">
                    {game.awayTeam.slice(0, 3).toUpperCase()}
                  </div>
                  <span className="font-medium text-sm">{game.awayTeam}</span>
                </div>
              </div>
              <div className="col-span-2 flex gap-1">
                <Button
                  variant={isBetSelected(game.id, game.awayTeam, 'spread') ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, game.awayTeam, 'spread', game.awaySpreadOdds, game.awaySpread)}
                >
                  {formatSpread(game.awaySpread)}
                </Button>
                <Button
                  variant={isBetSelected(game.id, game.awayTeam, 'spread') ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, game.awayTeam, 'spread', game.awaySpreadOdds, game.awaySpread)}
                >
                  {formatOdds(game.awaySpreadOdds)}
                </Button>
              </div>
              <div className="col-span-2 flex gap-1">
                <Button
                  variant={isBetSelected(game.id, 'Over', 'total') ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, 'Over', 'total', game.overOdds, game.total, true)}
                >
                  o{game.total}
                </Button>
                <Button
                  variant={isBetSelected(game.id, 'Over', 'total') ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, 'Over', 'total', game.overOdds, game.total, true)}
                >
                  {formatOdds(game.overOdds)}
                </Button>
              </div>
              <div className="col-span-2">
                <Button
                  variant={isBetSelected(game.id, game.awayTeam, 'moneyline') ? 'default' : 'outline'}
                  size="sm"
                  className="w-full h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, game.awayTeam, 'moneyline', game.awayMoneyline)}
                >
                  {formatOdds(game.awayMoneyline)}
                </Button>
              </div>
              <div className="col-span-1 flex justify-center">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Home Team Row */}
            <div className="grid grid-cols-12 gap-4 p-3 hover:bg-muted/20 transition-colors">
              <div className="col-span-3"></div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs font-bold">
                    {game.homeTeam.slice(0, 3).toUpperCase()}
                  </div>
                  <span className="font-medium text-sm">{game.homeTeam}</span>
                </div>
              </div>
              <div className="col-span-2 flex gap-1">
                <Button
                  variant={isBetSelected(game.id, game.homeTeam, 'spread') ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, game.homeTeam, 'spread', game.homeSpreadOdds, game.homeSpread)}
                >
                  {formatSpread(game.homeSpread)}
                </Button>
                <Button
                  variant={isBetSelected(game.id, game.homeTeam, 'spread') ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, game.homeTeam, 'spread', game.homeSpreadOdds, game.homeSpread)}
                >
                  {formatOdds(game.homeSpreadOdds)}
                </Button>
              </div>
              <div className="col-span-2 flex gap-1">
                <Button
                  variant={isBetSelected(game.id, 'Under', 'total') ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, 'Under', 'total', game.underOdds, game.total, false)}
                >
                  u{game.total}
                </Button>
                <Button
                  variant={isBetSelected(game.id, 'Under', 'total') ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, 'Under', 'total', game.underOdds, game.total, false)}
                >
                  {formatOdds(game.underOdds)}
                </Button>
              </div>
              <div className="col-span-2">
                <Button
                  variant={isBetSelected(game.id, game.homeTeam, 'moneyline') ? 'default' : 'outline'}
                  size="sm"
                  className="w-full h-8 text-xs odds-table"
                  onClick={() => handleBetClick(game, game.homeTeam, 'moneyline', game.homeMoneyline)}
                >
                  {formatOdds(game.homeMoneyline)}
                </Button>
              </div>
              <div className="col-span-1 flex justify-center">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}