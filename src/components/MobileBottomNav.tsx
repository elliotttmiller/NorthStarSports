import { List, ChartBar, Receipt, User } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useBetting } from '@/contexts/BettingContext'
import { cn } from '@/lib/utils'
import { ActivePanel } from '@/hooks/usePanelState'

interface MobileBottomNavProps {
  className?: string
  onNavigate?: (panel: 'home' | 'sports' | 'betslip' | 'profile') => void
  onNavClick?: (panel: 'home' | 'sports' | 'betslip' | 'profile') => void
  activePanel: ActivePanel
}

export function MobileBottomNav({ className, onNavClick, onNavigate, activePanel }: MobileBottomNavProps) {
  const { bets } = useBetting()
  
  const handleNavClick = (panel: 'home' | 'sports' | 'betslip' | 'profile') => {
    if (onNavigate) {
      onNavigate(panel)
    } else if (onNavClick) {
      onNavClick(panel)
    }
  }

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-background border-t z-50",
      "grid grid-cols-4 gap-0",
      className
    )}>
      <Button
        variant={activePanel === 'home' ? 'default' : 'ghost'}
        className="rounded-none h-16 flex-col gap-1"
        onClick={() => handleNavClick('home')}
      >
        <ChartBar className="w-5 h-5" />
        <span className="text-xs">Home</span>
      </Button>

      <Button
        variant={activePanel === 'sports' ? 'default' : 'ghost'}
        className="rounded-none h-16 flex-col gap-1"
        onClick={() => handleNavClick('sports')}
      >
        <List className="w-5 h-5" />
        <span className="text-xs">Sports</span>
      </Button>

      <Button
        variant={activePanel === 'betslip' ? 'default' : 'ghost'}
        className="rounded-none h-16 flex-col gap-1 relative"
        onClick={() => handleNavClick('betslip')}
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
        onClick={() => handleNavClick('profile')}
      >
        <User className="w-5 h-5" />
        <span className="text-xs">Profile</span>
      </Button>
    </div>
  )
}