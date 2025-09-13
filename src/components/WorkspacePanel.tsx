import { List, Receipt } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { GameLinesTable } from './GameLinesTable'
import { useBetSlip, useWorkspace } from '@/hooks'
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
  const { activeView, setActiveView } = useWorkspace()
  const { bets } = useBetSlip()

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
              <List className="w-4 h-4 mr-2" />
              Sports
            </Button>
            <h1 className="text-lg font-semibold">NorthStar Sports</h1>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 nav-button hover:bg-secondary/50"
              onClick={onToggleRightPanel}
            >
              <Receipt className="w-4 h-4 mr-2" />
              Bet Slip
              {bets.length > 0 && (
                <Badge 
                  variant="default" 
                  className="ml-2 h-5 px-1.5 bg-accent text-accent-foreground"
                >
                  {bets.length}
                </Badge>
              )}
            </Button>
          </>
        ) : (
          // Desktop Header
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
                variant="ghost"
                size="sm"
                className="h-9 px-3 nav-button hover:bg-secondary/50"
                onClick={onToggleRightPanel}
              >
                <Receipt className="w-4 h-4 mr-2" />
                Bet Slip
                {bets.length > 0 && (
                  <Badge 
                    variant="default" 
                    className="ml-2 h-5 px-1.5 bg-accent text-accent-foreground"
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
      <div className="flex-1 min-h-0">
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