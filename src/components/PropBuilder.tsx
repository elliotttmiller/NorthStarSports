/**
 * PropBuilder - Studio-within-Studio Component
 * Advanced proposition bet creator with player selection and stat markets
 */

import React, { useState, useEffect } from 'react'
import { MagnifyingGlass, Plus, Trophy, Target } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AccordionItem } from '@/components/atoms'
import { useNavigation, useBetSlip, useBettingUtils } from '@/hooks'
import { cn } from '@/lib/utils'
import type { Bet } from '@/types'

interface Player {
  id: string
  name: string
  position: string
  team: string
  photoUrl?: string
}

interface StatMarket {
  id: string
  name: string
  line: number
  overOdds: number
  underOdds: number
  category: string
}

interface PropBuilderProps {
  className?: string
}

export function PropBuilder({ className }: PropBuilderProps) {
  const { selectedLeague } = useNavigation()
  const { addBet } = useBetSlip()
  const { formatOdds } = useBettingUtils()
  
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [openCategories, setOpenCategories] = useState<string[]>(['Passing', 'Rushing'])

  // Sample player data - in production this would come from API
  const players: Player[] = [
    { id: 'p1', name: 'Josh Allen', position: 'QB', team: 'BUF' },
    { id: 'p2', name: 'Stefon Diggs', position: 'WR', team: 'BUF' },
    { id: 'p3', name: 'James Cook', position: 'RB', team: 'BUF' },
    { id: 'p4', name: 'Tua Tagovailoa', position: 'QB', team: 'MIA' },
    { id: 'p5', name: 'Tyreek Hill', position: 'WR', team: 'MIA' },
    { id: 'p6', name: 'Raheem Mostert', position: 'RB', team: 'MIA' },
    { id: 'p7', name: 'Dawson Knox', position: 'TE', team: 'BUF' },
    { id: 'p8', name: 'Mike Gesicki', position: 'TE', team: 'MIA' },
  ]

  // Sample stat markets - in production this would be dynamic based on selected player
  const getStatMarkets = (player: Player): StatMarket[] => {
    const baseMarkets: StatMarket[] = []
    
    if (player.position === 'QB') {
      baseMarkets.push(
        { id: 'm1', name: 'Passing Yards', line: 267.5, overOdds: -110, underOdds: -110, category: 'Passing' },
        { id: 'm2', name: 'Passing TDs', line: 1.5, overOdds: -140, underOdds: +110, category: 'Passing' },
        { id: 'm3', name: 'Completions', line: 24.5, overOdds: -105, underOdds: -115, category: 'Passing' },
        { id: 'm4', name: 'Rushing Yards', line: 22.5, overOdds: +105, underOdds: -125, category: 'Rushing' },
        { id: 'm5', name: 'Interceptions', line: 0.5, overOdds: +180, underOdds: -220, category: 'Passing' }
      )
    } else if (player.position === 'WR') {
      baseMarkets.push(
        { id: 'm6', name: 'Receiving Yards', line: 78.5, overOdds: -110, underOdds: -110, category: 'Receiving' },
        { id: 'm7', name: 'Receptions', line: 5.5, overOdds: -115, underOdds: -105, category: 'Receiving' },
        { id: 'm8', name: 'Receiving TDs', line: 0.5, overOdds: +165, underOdds: -200, category: 'Receiving' },
        { id: 'm9', name: 'Longest Reception', line: 24.5, overOdds: -110, underOdds: -110, category: 'Receiving' }
      )
    } else if (player.position === 'RB') {
      baseMarkets.push(
        { id: 'm10', name: 'Rushing Yards', line: 67.5, overOdds: -110, underOdds: -110, category: 'Rushing' },
        { id: 'm11', name: 'Rushing TDs', line: 0.5, overOdds: +130, underOdds: -160, category: 'Rushing' },
        { id: 'm12', name: 'Receiving Yards', line: 18.5, overOdds: -105, underOdds: -115, category: 'Receiving' },
        { id: 'm13', name: 'Total TDs', line: 0.5, overOdds: +110, underOdds: -130, category: 'Scoring' }
      )
    } else if (player.position === 'TE') {
      baseMarkets.push(
        { id: 'm14', name: 'Receiving Yards', line: 45.5, overOdds: -110, underOdds: -110, category: 'Receiving' },
        { id: 'm15', name: 'Receptions', line: 3.5, overOdds: -115, underOdds: -105, category: 'Receiving' },
        { id: 'm16', name: 'Receiving TDs', line: 0.5, overOdds: +145, underOdds: -175, category: 'Receiving' }
      )
    }
    
    return baseMarkets
  }

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statMarkets = selectedPlayer ? getStatMarkets(selectedPlayer) : []
  const groupedMarkets = statMarkets.reduce((acc, market) => {
    if (!acc[market.category]) acc[market.category] = []
    acc[market.category].push(market)
    return acc
  }, {} as Record<string, StatMarket[]>)

  const toggleCategory = (category: string) => {
    setOpenCategories(current =>
      current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category]
    )
  }

  const handlePropBetClick = (market: StatMarket, isOver: boolean) => {
    if (!selectedPlayer) return

    const bet: Bet = {
      id: `prop-${market.id}-${isOver ? 'over' : 'under'}-${Date.now()}`,
      gameId: `${selectedPlayer.team}-game`,
      teamName: `${selectedPlayer.name} (${selectedPlayer.team})`,
      betType: 'total' as const,
      odds: isOver ? market.overOdds : market.underOdds,
      line: market.line,
      isOver
    }

    addBet(bet)
  }

  return (
    <Card className={cn("flex flex-col h-full panel-fluid", className)}>
      {/* Header */}
      <div className="p-fluid-md border-b bg-accent/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-lg font-semibold">Prop Builder</h2>
              <p className="text-sm text-muted-foreground">Create custom proposition bets</p>
            </div>
          </div>
          {selectedPlayer && (
            <Badge variant="secondary">
              {selectedPlayer.name} - {selectedPlayer.position}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 flex">
        {/* Left Column - Player Selection */}
        <div className="w-80 border-r flex flex-col">
          {/* Player Search */}
          <div className="p-fluid-md border-b">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Player List */}
          <ScrollArea className="flex-1">
            <div className="p-fluid-sm space-y-1">
              {filteredPlayers.map(player => (
                <Button
                  key={player.id}
                  variant={selectedPlayer?.id === player.id ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start h-12 px-3"
                  onClick={() => setSelectedPlayer(player)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-medium text-sm overflow-safe">
                        {player.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {player.position} • {player.team}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Column - Bet Creator */}
        <div className="flex-1 flex flex-col">
          {selectedPlayer ? (
            <>
              {/* Player Header */}
              <div className="p-fluid-md border-b bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedPlayer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPlayer.position} • {selectedPlayer.team}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stat Markets */}
              <ScrollArea className="flex-1">
                <div className="p-fluid-md space-y-4">
                  {Object.entries(groupedMarkets).map(([category, markets]) => (
                    <AccordionItem
                      key={category}
                      title={category}
                      isExpanded={openCategories.includes(category)}
                      onToggle={() => toggleCategory(category)}
                    >
                      <div className="space-y-3">
                        {markets.map(market => (
                          <div key={market.id} className="bg-muted/30 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-medium">{market.name}</h4>
                                <p className="text-sm text-muted-foreground">Line: {market.line}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-12 flex flex-col items-center justify-center"
                                onClick={() => handlePropBetClick(market, true)}
                              >
                                <span className="text-xs text-muted-foreground">OVER</span>
                                <span className="font-mono text-sm">
                                  {formatOdds(market.overOdds)}
                                </span>
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-12 flex flex-col items-center justify-center"
                                onClick={() => handlePropBetClick(market, false)}
                              >
                                <span className="text-xs text-muted-foreground">UNDER</span>
                                <span className="font-mono text-sm">
                                  {formatOdds(market.underOdds)}
                                </span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                  ))}
                </div>
              </ScrollArea>
            </>
          ) : (
            /* No Player Selected State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4 max-w-sm">
                <Target className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold text-muted-foreground">
                  Select a Player
                </h3>
                <p className="text-muted-foreground">
                  Choose a player from the list to view available proposition bets and create custom wagers.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}