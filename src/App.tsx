import React, { useState } from 'react'
import { Toaster } from 'sonner'
import { Toaster } from 'sonner'

// Context
import { BettingProvider } from './contexts/BettingContext'

// Components
import { ActionHubPanel } from './components/ActionHubPa
import { MobileOverlay } from './components/MobileOverlay'
import { ResizeHandle } from './components/ResizeHandle'
// Hooks
import { usePanelState } from './hooks/usePanelState'

  const isMobile = useIsMobile()

// Hooks
import { useIsMobile } from './hooks/useIsMobile'
import { usePanelState } from './hooks/usePanelState'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function App() {
  const isMobile = useIsMobile()
  const {
    showLeftPanel,
    showRightPanel,
    leftPanelWidth,
    rightPanelWidth,
    toggleLeftPanel,
    toggleRightPanel,
    setLeftPanelWidth,
    setRightPanelWidth
    onToggleLeftPanel

  })
  const handleMobileNavClick = (section: string) => {
      case 'home':

        break
        setShowSportsOverlay(true)

        setShowBetSlipOv
      case 'profile':
        setShowSpo
    

  return (
      <div className="
          // Deskt
            {/* Left Panel - Sports
              {showLeftPanel && (
                  initial={{ opacity
        break
      case 'nav':
        setShowSportsOverlay(true)
        break
      case 'betslip':
        setActivePanel('betslip')
        setShowBetSlipOverlay(true)
        break
      case 'profile':
        setActivePanel('profile')
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        break
    }
  }

  return (
    <BettingProvider>
      <div className="h-screen w-full flex flex-col bg-background text-foreground overflow-hidden">
        {!isMobile ? (
          // Desktop three-panel layout
          <div className="flex h-full">
            {/* Left Panel - Sports Navigation */}
            <AnimatePresence mode="wait">
              {showLeftPanel && (
                <motion.div
                  initial={{ opacity: 0, x: -leftPanelWidth }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -leftPanelWidth }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-shrink-0 h-full border-r border-border bg-card"
                  style={{ width: leftPanelWidth }}
                >
                  <SideNavPanel />
                  <ResizeHandle
                    onResize={setLeftPanelWidth}
                    currentWidth={leftPanelWidth}
                    minWidth={280}
                    maxWidth={500}
                    side="right"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Panel - Main Workspace */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
              {/* Panel Toggle Controls */}
              <div className="flex justify-between items-center p-2 border-b border-border bg-card">
                <PanelToggle
                  isOpen={showLeftPanel}
                  onClick={toggleLeftPanel}
                  side="left"
                />
                <PanelToggle
                  isOpen={showRightPanel}
                  onClick={toggleRightPanel}
                  side="right"
                />
              </div>
              
              <div className="flex-1 min-h-0">
                <WorkspacePanel />
              </div>
            {/* Ma

                <div className="h-full bg-ca
                </div>
              {activePanel === 'pr
                  <div clas
                    <p className="text-muted-foreground">Profi
                </div>
            </div>
            {/* Mobile Sports Overlay */}
              isOpen={showSportsOverlay}
              title="Sports"
            >
            </MobileOverlay>
            {/* Mobile Bet Slip Overlay */}
              isOpen={showBetSlipOverlay}
              title="Bet Slip"
            >
            </MobileOverlay>
            {/* Mobi
              onNavClick={handleMobi
            />
        )}
        <Toaster
          toastO
            d
        />
    </BettingProvider>
}
export default App
























































