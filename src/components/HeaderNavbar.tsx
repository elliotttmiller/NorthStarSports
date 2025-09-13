import React from 'react'
import { Button } from '@/components/u
import { 
  Star,
import { 

  Receipt, 
  onTogg
  Star,

  X
  onToggleLeftPanel,
  className = ''


    <header className={`
  showRightPanel: boolean
  onToggleLeftPanel: () => void
  onToggleRightPanel: () => void
  className?: string
}

export function HeaderNavbar({
  showLeftPanel,
  showRightPanel,
  onToggleLeftPanel,
  onToggleRightPanel,
  className = ''
}: HeaderNavbarProps) {
  const { bets } = useBetting()
  const totalBets = bets.length

          
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border ${className}`}>
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left Section - Panel Toggle & Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleLeftPanel}
              className={`relative p-2 transition-all duration-300 group ${
                showLeftPanel 
                  ? 'bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20' 
                  : 'hover:bg-muted/80 text-muted-foreground hover:text-foreground hover:border-border/50'
              }`}
              title={`${showLeftPanel ? 'Hide Navigation' : 'Show Navigation'} (⌘[)`}
             
              <motion.div
                animate={{ 
                  rotate: showLeftPanel ? 180 : 0,
                  scale: showLeftPanel ? 1.1 : 1
        {/* Right 
                transition={{ 
                  duration: 0.3, 
                  ease: [0.4, 0.0, 0.2, 1],
                  type: 'spring',
                  damping: 20
                }}
                className="relative"
              >
                <Sidebar size={18} />
                  rotate: s
              
                  ease: 'easeInOut',
              <motion.div
                className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-accent/5"
                initial={{ opacity: 0, scale: 0.8 }}
              {/* Pulse eff
                  opacity: showLeftPanel ? 1 : 0,
                  scale: showLeftPanel ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Subtle glow effect */}
              {showLeftPanel && (
                <motion.div
                  className="absolute -inset-1 bg-primary/10 rounded-lg blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ 
                    duration: 2, 
                    ease: 'easeInOut',
                  exit={{ scale: 0, r
                  }}
                  
              )}
                  <Ba
          </motion.div>
          
          <div className="flex items-center gap-2">
                      t
              animate={{ 
                rotate: [0, 5, -5, 0]
              }}
              {/* Subtle glo
                duration: 4, 
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 8
              }}
             
              <Star size={20} weight="fill" className="text-accent" />
      </div>
            <span className="font-semibold text-lg tracking-tight">
              NorthStar<span className="text-muted-foreground">Sports</span>
            </span>

        </div>

        {/* Center Section - Quick Actions & Bet Counter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <List size={16} className="mr-2" />

            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Live
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">

            </Button>
          </div>


          {totalBets > 0 && (

              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full"

              <Receipt size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium">
                {totalBets} bet{totalBets !== 1 ? 's' : ''} active

            </motion.div>

        </div>

        {/* Right Section - Bet Slip Toggle & User */}

          <Button

            size="sm"
            onClick={onToggleRightPanel}
            className={`relative p-2 transition-all duration-200 ${

                ? 'bg-muted/50 hover:bg-muted text-foreground' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
            title={`${showRightPanel ? 'Hide Bet Slip' : 'Show Bet Slip'} (⌘])`}
          >

              animate={{ 
                scale: totalBets > 0 ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                duration: 0.5, 

                repeat: totalBets > 0 ? Infinity : 0,

              }}

              <Receipt size={18} />

            {totalBets > 0 && (

                initial={{ scale: 0 }}

                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1"
              >
                <Badge 
                  variant="destructive"
                  className="h-5 w-5 p-0 flex items-center justify-center text-xs font-medium"
                >
                  {totalBets}
                </Badge>
              </motion.div>
            )}


          <div className="h-6 w-px bg-border" />

          <Button variant="ghost" size="sm" className="p-2 hover:bg-muted transition-colors">
            <User size={18} />

        </div>

    </header>

}