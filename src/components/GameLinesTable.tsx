import { Plus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GameRow, SkeletonLoader } from '@/components/atoms'
import { useNavigation, useBetSlip } from '@/hooks'
import { sampleLeagues } from '@/data/sampleData'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import type { Game, Bet } from '@/types'

interface GameLinesTableProps {
  className?: string
}

export function GameLinesTable({ className }: GameLinesTableProps) {
  const { selectedLeague } = useNavigation()
  const { addBet } = useBetSlip()
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

  const handleBetClick = (betData: Omit<Bet, 'id'>) => {
    const bet: Bet = {
      id: `${betData.gameId}-${betData.teamName}-${betData.betType}-${Date.now()}`,
      ...betData
    }
    addBet(bet)
  }

  // Loading skeleton component using atomic SkeletonLoader
  const LoadingSkeleton = () => (
    <Card className={cn("flex flex-col h-full panel-fluid", className)}>
      <div className="p-fluid-md border-b bg-accent/5">
        <div className="flex items-center justify-between">
          <div>
            <SkeletonLoader width="5rem" height="1.5rem" className="mb-2" />
            <SkeletonLoader width="8rem" height="1rem" />
          </div>
          <SkeletonLoader width="6rem" height="2rem" />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 p-fluid-md border-b bg-muted/30 text-sm font-medium">
        <div className="overflow-safe">TIME</div>
        <div className="overflow-safe">TEAM</div>
        <div className="text-center overflow-safe">SPREAD</div>
        <div className="text-center overflow-safe">TOTAL</div>
        <div className="text-center overflow-safe">MONEY LINE</div>
        <div className="text-center overflow-safe">MORE</div>
      </div>

      <div className="flex-1 overflow-auto fluid-container">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border-b p-fluid-sm">
            <div className="grid grid-cols-6 gap-2 py-2">
              <SkeletonLoader width="3rem" height="1rem" />
              <div className="space-y-1">
                <SkeletonLoader width="4rem" height="1rem" />
                <SkeletonLoader width="4rem" height="1rem" />
              </div>
              <div className="space-y-1">
                <SkeletonLoader height="2rem" />
                <SkeletonLoader height="2rem" />
              </div>
              <div className="space-y-1">
                <SkeletonLoader height="2rem" />
                <SkeletonLoader height="2rem" />
              </div>
              <div className="space-y-1">
                <SkeletonLoader height="2rem" />
                <SkeletonLoader height="2rem" />
              </div>
              <SkeletonLoader height="2rem" />
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
      <Card className={cn("flex flex-col h-full panel-fluid", className)}>
        <div className="p-fluid-md border-b bg-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold overflow-safe">{league?.name || 'Loading...'}</h2>
              <p className="text-sm text-muted-foreground overflow-safe">Sep 14 - WEEK 2</p>
            </div>
            <Button variant="outline" size="sm">
              Update Lines
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2 fluid-container">
            <p className="text-muted-foreground">No games available</p>
            <p className="text-sm text-muted-foreground">Check back later for updated lines</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn("flex flex-col h-full panel-fluid", className)}>
      {/* Header */}
      <div className="p-fluid-md border-b bg-accent/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold overflow-safe">{league?.name}</h2>
            <p className="text-sm text-muted-foreground overflow-safe">Sep 14 - WEEK 2</p>
          </div>
          <Button variant="outline" size="sm">
            Update Lines
          </Button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-2 p-fluid-md border-b bg-muted/30 text-sm font-medium text-muted-foreground">
        <div className="overflow-safe">TIME</div>
        <div className="overflow-safe">TEAM</div>
        <div className="text-center overflow-safe">SPREAD</div>
        <div className="text-center overflow-safe">TOTAL</div>
        <div className="text-center overflow-safe">MONEY LINE</div>
        <div className="text-center overflow-safe">MORE</div>
      </div>

      {/* Games List - Using Atomic GameRow Components */}
      <div className="flex-1 overflow-auto">
        {games.map((game) => (
          <GameRow 
            key={game.id}
            game={game}
            onBetClick={handleBetClick}
          />
        ))}
      </div>
    </Card>
  )
}