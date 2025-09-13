import { Badge } from '@/components/ui/badge'
import { List, Receipt } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { GameLinesTable } from './GameLinesTable'
import { useBetting } from '@/contexts/Bet

  isMobile?: boolean

}
export function Work
  onToggleLeftPanel,
  className = ''
  const { activeView
 

        {isMobile ? (
  isMobile = false,
  onToggleLeftPanel,
  onToggleRightPanel,
  className = ''
}: WorkspacePanelProps) {
  const { activeView, setActiveView, bets } = useBetting()

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="sm"
            >
              {bets.length > 0 && (
             
                >
                </Bad
            
        ) : (
            
                var
                onClick={onTo
              >
              </Button>
            </div>
            <
                variant={activeView === 'game
                onClick={() => setA
              >
              </Button>
                variant={activeView === 'props' ? 'default' : 'ghost'}
                o
              >
              </Button>
              <B
                size=
             
             
            
                    className="absolute -top-2 -right
                    {
                )}
            </div>
        )}
                className="nav-button"
              >
                <List className="h-5 w-5" />
              </Button>
              <h1 className="font-semibold text-lg">Game Lines</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={activeView === 'games' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('games')}
                className="nav-button"
              >
                Games
              </Button>
              <Button
                variant={activeView === 'propbuilder' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('propbuilder')}
                className="nav-button"
              >
                Prop Builder
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleRightPanel}
                className="nav-button relative ml-4"
              >
                <Receipt className="h-5 w-5" />
                {bets.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {bets.length}
                  </Badge>
                )}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-auto">
        {activeView === 'games' ? (
          <GameLinesTable />
        ) : (
          <PropBuilder />
        )}
      </div>
    </div>
  )
}      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-auto">
        {activeView === 'games' ? (
          <GameLinesTable />
        ) : (
          <PropBuilder />
        )}
      </div>
    </div>
  )
}