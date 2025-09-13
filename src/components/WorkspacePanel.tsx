import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Badge } from '@/components/ui/badge'
import { List, Receipt } from '@phosphor-icons/react'
import { useBetting } from '@/contexts/BettingCon

  className?: string
  onToggleLeftPanel?: () => void

export function WorkspacePanel(
  isMobile = false,
  onToggleRightPanel
  const { activeView, setActiveV
  return (
 

          <>
            
              class
            >
            </Button
            <h1 className
            <Button

          
              <Receipt className="w-4 h-4" />
                <Badge className="absolute -t
                </Badge>
            </Button>
        ) : (
          <>
              <Butt
                size="sm"
                onClick
                <List className="w-4 h-4" />
              <h1 className="text-lg font

              <Button
                size=
            
                Game Lines
            
                siz
                className="na
                Prop Bu
            </div>
            <div className="flex items-cen
             
                className="h-9 px-3 nav-butto
              >
              </Button>
          </>
      </div>
      {/* Main C
        {activeView =
        ) : (
        )}
    </div>
}

              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 nav-button hover:bg-secondary/50"
                onClick={onToggleLeftPanel}
              >
                <List className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-semibold">Sports Center</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={activeView === 'games' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('games')}
                className="nav-button"
              >
                Game Lines
              </Button>
              <Button
                variant={activeView === 'props' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('props')}
                className="nav-button"
              >
                Prop Builder
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 nav-button hover:bg-secondary/50"
                onClick={onToggleRightPanel}
              >
                <Receipt className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0">
        {activeView === 'games' ? (
          <GameLinesTable />
        ) : (
          <PropBuilder />
        )}
      </div>
    </div>
  )
}