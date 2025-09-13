import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { List, Receipt } from '@phosphor-icons/react'
import { GameLinesTable } from './GameLinesTable'
import { PropBuilder } from './PropBuilder'
import { useBetting } from '@/contexts/BettingContext'
import { cn } from '@/lib/utils'

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
            >
              <List className="w-4 h-4" />
            </Button>
            
            <h1 className="text-lg font-semibold">Sports Center</h1>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 nav-button hover:bg-secondary/50 relative"
              onClick={onToggleRightPanel}
            >
              <Receipt className="w-4 h-4" />
              {bets.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                  {bets.length}
                </Badge>
              )}
            </Button>
          </>
        ) : (
          // Desktop Header
          <>
            <div className="flex items-center gap-3">
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