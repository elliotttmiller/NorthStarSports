import React from 'react'
import { Badge } from '@/components/ui/badge'
import { GameLinesTable } from './GameLinesTa
import { useBetting } from '@/contexts/BettingContext

  className?: string
  onToggleLeftPanel?: () => void
}

interface WorkspacePanelProps {
  className?: string
  isMobile?: boolean
  onToggleLeftPanel?: () => void
  onToggleRightPanel?: () => void
}

export function WorkspacePanel({
  className,
  isMobile = false,
  onToggleLeftPanel,
  onToggleRightPanel
}: WorkspacePanelProps) {
  const { activeView, setActiveView, bets } = useBetting()

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Header with Navigation Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        {isMobile ? (
          // Mobile Header
          <>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 nav-button hover:bg-secondary/50"
              onClick={onToggleLeftPanel}
             
              onClick={onToggleRightPanel}
              <Recei
              {bets.l
            
                >
            
            </Butto
        ) : (
          <>
              <Button
                size="sm"
             
                <List className="w-4 h-4" />
              <h1 clas

              <Button
                size="sm"
                className="nav-button"
                G
              <Button
                size="sm
                
                Prop 
            <
            <
                variant="gh
            
              >
              </Butto
          </>
      </div>
      {/* Main Content Area */}
        {activeView === 'games' ? (
        ) : (
        )}
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
}      </div>
    </div>
  )
}