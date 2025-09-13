import React from 'react'
import { Badge } from '@/components/ui/badge'
import { List, Receipt } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GameLinesTable } from './GameLinesTable'
import { useBetSlip, useWorkspace } from '@/hooks'
import { cn } from '@/lib/utils'

interface WorkspacePanelProps {
  isMobile?: boolean
  onToggleLeftPanel: () => void
  onToggleRightPanel: () => void
  className?: string
}

export function WorkspacePanel({
  isMobile = false,
  onToggleLeftPanel,
  onToggleRightPanel,
  className = ''
}: WorkspacePanelProps) {
  const { activeView, setActiveView } = useWorkspace()
  const { bets } = useBetSlip()

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleLeftPanel}
              className="nav-button"
            >
              <List className="h-5 w-5" />
            </Button>
            
            <h1 className="font-semibold text-lg">Game Lines</h1>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleRightPanel}
              className="nav-button relative"
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
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleLeftPanel}
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
                variant={activeView === 'props' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('props')}
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
          <PropBuilderPlaceholder />
        )}
      </div>
    </div>
  )
}

/**
 * Prop Builder Placeholder Component
 * Integrated directly into WorkspacePanel for simplicity
 */
function PropBuilderPlaceholder() {
  return (
    <Card className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Prop Builder</h2>
            <p className="text-sm text-muted-foreground">Create custom proposition bets</p>
          </div>
          <Badge variant="secondary">Coming Soon</Badge>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <h3 className="text-xl font-semibold text-muted-foreground">Prop Builder</h3>
          <p className="text-muted-foreground">
            Advanced prop betting tools are coming soon. Build complex proposition bets with multiple conditions and enhanced odds.
          </p>
          <Button variant="outline" disabled>
            Access Prop Builder
          </Button>
        </div>
      </div>
    </Card>
  )
}