import { List, ChartBar, Receipt, User } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useBetting } from '@/contexts/BettingContext'
import { cn } from '@/lib/utils'

interface MobileBottomNavProps {
  className?: string
  onNavClick: (panel: 'nav' | 'workspace' | 'betslip' | 'profile') => void
  activePanel: string
}

export function MobileBottomNav({ className, onNavClick, activePanel }: MobileBottomNavProps) {
  const { bets } = useBetting()

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-background border-t z-50",
      "grid grid-cols-4 gap-0",
      className
    )}>
      <Button
        variant={activePanel === 'nav' ? 'default' : 'ghost'}
        className="rounded-none h-16 flex-col gap-1"
        onClick={() => onNavClick('nav')}
      >
        <List className="w-5 h-5" />
        <span className="text-xs">Sports</span>
      </Button>

      <Button
        variant={activePanel === 'workspace' ? 'default' : 'ghost'}
        className="rounded-none h-16 flex-col gap-1"
        onClick={() => onNavClick('workspace')}
      >
        <ChartBar className="w-5 h-5" />
        <span className="text-xs">Lines</span>
      </Button>

      <Button
        variant={activePanel === 'betslip' ? 'default' : 'ghost'}
        className="rounded-none h-16 flex-col gap-1 relative"
        onClick={() => onNavClick('betslip')}
      >
        <Receipt className="w-5 h-5" />
        <span className="text-xs">Bet Slip</span>
        {bets.length > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {bets.length}
          </Badge>
        )}
      </Button>

      <Button
        variant={activePanel === 'profile' ? 'default' : 'ghost'}
        className="rounded-none h-16 flex-col gap-1"
        onClick={() => onNavClick('profile')}
      >
        <User className="w-5 h-5" />
        <span className="text-xs">Profile</span>
      </Button>
    </div>
  )
}