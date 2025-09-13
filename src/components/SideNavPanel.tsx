import { Star } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AccordionItem } from '@/components/atoms'
import { cn } from '@/lib/utils'
import { useNavigation, useBetSlip } from '@/hooks'
import { sportCategories, sampleLeagues } from '@/data/sampleData'
import { useState } from 'react'

interface SideNavPanelProps {
  className?: string
}

export function SideNavPanel({ className }: SideNavPanelProps) {
  const { 
    selectedLeague, 
    selectedSport,
    setSelectedLeague, 
    setSelectedSport,
    favorites, 
    toggleFavorite 
  } = useNavigation()
  
  const [openSports, setOpenSports] = useState<string[]>(['Football'])

  const toggleSport = (sportName: string) => {
    setOpenSports(current => 
      current.includes(sportName) 
        ? current.filter(s => s !== sportName)
        : [...current, sportName]
    )
  }

  const favoriteLeagues = sampleLeagues.filter(league => favorites.includes(league.id))

  return (
    <Card className={cn("flex flex-col h-full bg-card border-0 rounded-none panel-fluid", className)}>
      <div className="p-fluid-md border-b">
        <h2 className="text-lg font-semibold text-foreground">Sports</h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        {/* Favorites Section */}
        {favoriteLeagues.length > 0 && (
          <div className="p-fluid-md border-b bg-muted/30">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-accent fill-accent flex-shrink-0" />
              <h3 className="text-sm font-medium text-foreground overflow-safe">Favorites</h3>
            </div>
            <div className="space-y-1">
              {favoriteLeagues.map(league => (
                <Button
                  key={`fav-${league.id}`}
                  variant={selectedLeague === league.id ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start h-8 px-2 overflow-safe"
                  onClick={() => {
                    setSelectedLeague(league.id)
                    setSelectedSport(league.sport)
                  }}
                >
                  <span className="text-sm overflow-safe">{league.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* All Sports Section */}
        <div className="p-fluid-md">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide overflow-safe">
            All Sports
          </h3>
          
          <div className="space-y-2 fluid-container">
            {sportCategories.map(sport => (
              <AccordionItem
                key={sport.name}
                title={sport.name}
                isExpanded={openSports.includes(sport.name)}
                onToggle={() => toggleSport(sport.name)}
              >
                <div className="space-y-1">
                  {sport.leagues.map(leagueId => {
                    const league = sampleLeagues.find(l => l.id === leagueId)
                    if (!league) return null
                    
                    return (
                      <div key={league.id} className="flex items-center gap-1">
                        <Button
                          variant={selectedLeague === league.id ? "default" : "ghost"}
                          size="sm"
                          className="flex-1 justify-start h-8 px-2 overflow-safe"
                          onClick={() => {
                            setSelectedLeague(league.id)
                            setSelectedSport(league.sport)
                          }}
                        >
                          <span className="text-sm overflow-safe">{league.name}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-muted/50 flex-shrink-0"
                          onClick={() => toggleFavorite(league.id)}
                          aria-label={`${favorites.includes(league.id) ? 'Remove from' : 'Add to'} favorites`}
                        >
                          <Star 
                            className={cn(
                              "w-3 h-3",
                              favorites.includes(league.id) 
                                ? "text-accent fill-accent" 
                                : "text-muted-foreground hover:text-foreground"
                            )} 
                          />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </AccordionItem>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}