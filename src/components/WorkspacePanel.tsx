import { useBetting } from '@/contexts/BettingContext'
import { GameLinesTable } from './GameLinesTable'
import { PropBuilder } from './PropBuilder'
import { cn } from '@/lib/utils'

interface WorkspacePanelProps {
  className?: string
}

export function WorkspacePanel({ className }: WorkspacePanelProps) {
  const { activeView } = useBetting()

  return (
    <div className={cn("h-full", className)}>
      {activeView === 'games' && <GameLinesTable className="h-full" />}
      {activeView === 'props' && <PropBuilder className="h-full" />}
    </div>
  )
}