import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { List, Receipt } from '@phosphor-icons/react'
import { useBetting } from '@/contexts/BettingContext'
import { GameLinesTable } from '@/components/GameLinesTable'
import { PropBuilder } from '@/components/PropBuilder'

interface WorkspacePanelProps {
  isMobile?: boolean
  onToggleLeftPanel?: () => void
  onToggleRightPanel?: () => void
  className?: string
}

export function WorkspacePanel({
  isMobile = false,
  onToggleLeftPanel,
  onToggleRightPanel,
  className = ''
}: WorkspacePanelProps) {
  const { activeView, setActiveView, bets } = useBetting()

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        {isMobile ? (
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
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {bets.length}
                </Badge>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
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