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
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLeftPanel}
            className={`p-2 transition-all duration-200 ${
              showLeftPanel 
                ? 'bg-muted/50 hover:bg-muted text-foreground' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
            title={`${showLeftPanel ? 'Hide Navigation' : 'Show Navigation'} (⌘[)`}
          >
            <motion.div
              animate={{ rotate: showLeftPanel ? 90 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {showLeftPanel ? <X size={18} /> : <Sidebar size={18} />}
            </motion.div>
          </Button>
          
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
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleRightPanel}
            className={`relative p-2 transition-all duration-200 ${
              showRightPanel 
                ? 'bg-muted/50 hover:bg-muted text-foreground' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
            title={`${showRightPanel ? 'Hide Bet Slip' : 'Show Bet Slip'} (⌘])`}
          >
            <motion.div
              animate={{ 
                scale: totalBets > 0 ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                duration: 0.5, 
                ease: 'easeInOut',
                repeat: totalBets > 0 ? Infinity : 0,
                repeatDelay: 2
              }}
            >
              <Receipt size={18} />
            </motion.div>
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
                  {totalBets}
                </Badge>
              </motion.div>
            )}
          </Button>

          <div className="h-6 w-px bg-border" />

          <Button variant="ghost" size="sm" className="p-2 hover:bg-muted transition-colors">
            <User size={18} />
          </Button>
        </div>
      </div>
    </header>
  )
}