import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  List, 
  Receipt, 
  User, 
  Star,
  Sidebar,
  X
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
            >
              <motion.div
                animate={{ 
                  rotate: showLeftPanel ? 180 : 0,
                  scale: showLeftPanel ? 1.1 : 1
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.4, 0.0, 0.2, 1],
                  type: 'spring',
                  damping: 20
                }}
                className="relative"
              >
                <Sidebar size={18} />
              </motion.div>
              
              {/* Active indicator */}
              <motion.div
                className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-accent/5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
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
                    repeat: Infinity 
                  }}
                />
              )}
            </Button>
          </motion.div>
          
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0]
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

        {/* Center Section - Quick Actions & Bet Counter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <List size={16} className="mr-2" />
              Sports
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Live
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Trending
            </Button>
          </div>

          {/* Bet Counter Display */}
          {totalBets > 0 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full"
            >
              <Receipt size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium">
                {totalBets} bet{totalBets !== 1 ? 's' : ''} active
              </span>
            </motion.div>
          )}
        </div>

        {/* Right Section - Bet Slip Toggle & User */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleRightPanel}
              className={`relative p-2 transition-all duration-300 overflow-hidden ${
                showRightPanel 
                  ? 'bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20' 
                  : 'hover:bg-muted/80 text-muted-foreground hover:text-foreground hover:border-border/50'
              } ${totalBets > 0 ? 'ring-2 ring-accent/30 ring-offset-2 ring-offset-background' : ''}`}
              title={`${showRightPanel ? 'Hide Bet Slip' : 'Show Bet Slip'} (⌘])`}
            >
              <motion.div
                animate={{ 
                  scale: totalBets > 0 ? [1, 1.15, 1] : showRightPanel ? 1.1 : 1,
                  rotate: showRightPanel ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  duration: totalBets > 0 ? 0.6 : 0.3, 
                  ease: 'easeInOut',
                  repeat: totalBets > 0 ? Infinity : 0,
                  repeatDelay: 3
                }}
              >
                <Receipt size={18} />
              </motion.div>
              
              {/* Pulse effect for active bets */}
              {totalBets > 0 && (
                <motion.div
                  className="absolute inset-0 bg-accent/20 rounded-md"
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity
                  }}
                />
              )}
              
              {/* Active indicator */}
              <motion.div
                className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-accent/5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: showRightPanel ? 1 : 0,
                  scale: showRightPanel ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Bet count badge with enhanced animation */}
              {totalBets > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ 
                    type: 'spring',
                    damping: 15,
                    stiffness: 200
                  }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge 
                    variant="destructive"
                    className="h-5 w-5 p-0 flex items-center justify-center text-xs font-bold shadow-lg"
                  >
                    <motion.span
                      key={totalBets}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {totalBets}
                    </motion.span>
                  </Badge>
                </motion.div>
              )}
              
              {/* Subtle glow effect when active */}
              {showRightPanel && (
                <motion.div
                  className="absolute -inset-1 bg-primary/10 rounded-lg blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ 
                    duration: 2, 
                    ease: 'easeInOut',
                    repeat: Infinity 
                  }}
                />
              )}
            </Button>
          </motion.div>

          <div className="h-6 w-px bg-border" />

          <Button variant="ghost" size="sm" className="p-2 hover:bg-muted transition-colors">
            <User size={18} />
          </Button>
        </div>
      </div>
    </header>
  )
}