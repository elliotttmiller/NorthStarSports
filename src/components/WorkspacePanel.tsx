import { List, Receipt } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useBetting } from '@/contexts/BettingContext'
import { GameLinesTable } from './GameLinesTable'
import { PropBuilder } from './PropBuilder'
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
  const { activeView, bets } = useBetting()

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Header with toggle buttons (mobile only) */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onToggleLeftPanel}
          >
            <List className="w-5 h-5" />
          </Button>
          
          <h1 className="text-lg font-semibold">NorthStar Sports</h1>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 relative"
            onClick={onToggleRightPanel}
          >
            <Receipt className="w-5 h-5" />
            {bets.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {bets.length}
              </Badge>
            )}
          </Button>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 min-h-0">
        {activeView === 'games' && <GameLinesTable className="h-full" />}
        {activeView === 'props' && <PropBuilder className="h-full" />}
      </div>
    </div>
  )
}