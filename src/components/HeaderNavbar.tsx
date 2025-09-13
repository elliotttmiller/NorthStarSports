import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sidebar,
  Receipt,
  Star
} from '@phosphor-icons/react'
import { useBetting } from '@/contexts/BettingContext'

interface HeaderNavbarProps {
  showLeftPanel: boolean
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left Section - Panel Toggle & Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleLeftPanel}
              className={`relative p-2 h-9 w-9 transition-all duration-300 group ${
                showLeftPanel 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
              title={`${showLeftPanel ? 'Hide Navigation' : 'Show Navigation'} (⌘[)`}
            >
              <motion.div
                animate={{ 
                  rotate: showLeftPanel ? 0 : 0,
                  scale: showLeftPanel ? 1.05 : 1
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                <Sidebar size={16} />
              </motion.div>
              
              {/* Subtle active indicator */}
              {showLeftPanel && (
                <motion.div
                  className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 to-primary/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Button>
          </motion.div>
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 4, 
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 8
              }}
            >
              <Star size={20} weight="fill" className="text-accent" />
            </motion.div>
            <span className="font-semibold text-lg tracking-tight">
              NorthStar<span className="text-muted-foreground">Sports</span>
            </span>
          </div>
        </div>

        {/* Right Section - Bet Slip Toggle */}
        <div className="flex items-center gap-3">
          {/* Active bet counter */}
          <AnimatePresence>
            {totalBets > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full"
              >
                <Receipt size={14} className="text-muted-foreground" />
                <span className="text-sm font-medium">
                  {totalBets} bet{totalBets !== 1 ? 's' : ''} active
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleRightPanel}
              className={`relative p-2 h-9 w-9 transition-all duration-300 ${
                showRightPanel 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
              title={`${showRightPanel ? 'Hide Bet Slip' : 'Show Bet Slip'} (⌘])`}
            >
              <motion.div
                animate={{ 
                  scale: totalBets > 0 ? [1, 1.1, 1] : 1
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: 'easeInOut',
                  repeat: totalBets > 0 ? Infinity : 0,
                  repeatDelay: 2
                }}
              >
                <Receipt size={16} />
              </motion.div>

              {/* Bet counter badge */}
              <AnimatePresence>
                {totalBets > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge 
                      variant="destructive"
                      className="h-5 w-5 p-0 flex items-center justify-center text-xs font-medium"
                    >
                      {totalBets > 9 ? '9+' : totalBets}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtle active indicator */}
              {showRightPanel && (
                <motion.div
                  className="absolute inset-0 rounded-md bg-gradient-to-l from-primary/10 to-primary/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}