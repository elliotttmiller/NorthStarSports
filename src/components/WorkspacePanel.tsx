import React from 'react'
import { List, Receipt } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Badge } from '@/components/ui/badge'
import { GameLinesTable } from './GameLinesTable'
import { PropBuilder } from './PropBuilder'
import { useBetting } from '@/contexts/BettingContext'
import { cn } from '@/lib/utils'

  isMobile = false,
  onToggleRightPanel
  const { activeView
  return (
      {/* Header with Navigation 
 

              variant="ghost"
            
  isMobile = false,
  onToggleLeftPanel,
  onToggleRightPanel 
}: WorkspacePanelProps) {
  const { activeView, setActiveView, bets } = useBetting()

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
             
              <List className="w-4 h-4 mr-2" />
            </Button
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
                variant
                  variant="default" 
                  className="ml-2 h-5 px-1.5 bg-accent text-accent-foreground"
                >
                Bet Slip
                </Badge>
                
            </Button>
             
        ) : (
          // Desktop Header
          <>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 nav-button hover:bg-secondary/50"
                onClick={onToggleLeftPanel}
        )}
                <List className="w-4 h-4" />
  )
              <h1 className="text-lg font-semibold">Sports Center</h1>


































