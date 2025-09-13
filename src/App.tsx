import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'

// Context
import { BettingProvider } from './contexts/BetSlipContext'

// Components
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { PanelToggle } from './components/PanelToggle'
import { ResizeHandle } from './components/ResizeHandle'

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
    setRightPanelWidth,
  } = usePanelState()

  // Mobile state
  const [activePanel, setActivePanel] = useState<'home' | 'sports' | 'betslip' | 'profile'>('home')
  const [showSportsOverlay, setShowSportsOverlay] = useState(false)
  const [showBetSlipOverlay, setShowBetSlipOverlay] = useState(false)

  // Enable keyboard shortcuts
  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
  })

  const handleMobileNavClick = (panel: 'home' | 'sports' | 'betslip' | 'profile') => {
    switch (panel) {
      case 'home':
        setActivePanel('home')
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        break
      case 'sports':
        setShowSportsOverlay(true)
        break
      case 'betslip':
        setShowBetSlipOverlay(true)
        break
      case 'profile':
        setActivePanel('profile')
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        break
    }
  }

  const handleSportsOverlayClose = () => {
    setShowSportsOverlay(false)
    setActivePanel('home')
  }

  const handleBetSlipOverlayClose = () => {
    setShowBetSlipOverlay(false)
    setActivePanel('home')
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
                  className="flex-shrink-0 h-full border-r border-border bg-card relative"
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
            </div>

            {/* Right Panel - Action Hub */}
            <AnimatePresence mode="wait">
              {showRightPanel && (
                <motion.div
                  initial={{ opacity: 0, x: rightPanelWidth }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: rightPanelWidth }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-shrink-0 h-full border-l border-border bg-card relative"
                  style={{ width: rightPanelWidth }}
                >
                  <ResizeHandle
                    onResize={setRightPanelWidth}
                    currentWidth={rightPanelWidth}
                    minWidth={320}
                    maxWidth={500}
                    side="left"
                  />
                </motion.div>
            </AnimatePresence
        ) : (
          <>
            <div
             
                </div>
            
                  <p className="text-
              )}

            <MobileOverlay
              onClose={handleSportsO
            >
            </Mo
            {/* Mobile Bet Slip Overlay */}
              isOpen={showBetSlipOverlay}
              title="Bet Slip"
              <ActionH

            <Mobil

          </>

          toastOptions={{
            style: {
              color: 'var(--
            }
        />
    </BettingProvider>

export default App































