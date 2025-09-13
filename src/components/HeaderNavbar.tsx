import { List, Receipt } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useBetting } from '@/contexts/BettingContext'
import { cn } from '@/lib/utils'

interface HeaderNavbarProps {
  onToggleLeftPanel: () => void
  onToggleRightPanel: () => void
  showLeftPanel: boolean
  showRightPanel: boolean
  className?: string
}

export function HeaderNavbar({
  onToggleLeftPanel,
  onToggleRightPanel,
  showLeftPanel,
  showRightPanel,
  className,
}: HeaderNavbarProps) {
  const { bets } = useBetting()

  return (
    <header className={cn(
      "flex items-center justify-between p-4 border-b bg-card",
      "lg:px-6",
      className
    )}>
      <div className="flex items-center gap-3">
        <Button
          variant={showLeftPanel ? "default" : "outline"}
          size="sm"
          onClick={onToggleLeftPanel}
          className="lg:flex hidden"
        >
          <List className="w-4 h-4" />
        </Button>
        
        <h1 className="text-xl font-bold text-foreground">
          NorthStarSports
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant={showRightPanel ? "default" : "outline"}
          size="sm"
          onClick={onToggleRightPanel}
          className="lg:flex hidden relative"
        >
          <Receipt className="w-4 h-4" />
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
    </header>
  )
}