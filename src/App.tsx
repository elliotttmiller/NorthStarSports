import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'

// Context
import { BettingProvider } from './contexts/BettingContext'

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
    setRightPanelWidth
  } = usePanelState()

  // Mobile overlay states
  const [showSportsOverlay, setShowSportsOverlay] = useState(false)
  const [showBetSlipOverlay, setShowBetSlipOverlay] = useState(false)

  // Mobile navigation state
  const [activePanel, setActivePanel] = useState<'workspace' | 'betslip' | 'profile'>('workspace')

  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
    showLeftPanel,
    showRightPanel
  })

  const handleMobileNavClick = (section: string) => {
    switch (section) {
      case 'home':
        setActivePanel('workspace')
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
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
                  onToggle={toggleLeftPanel}
                  side="left"
                />
                <PanelToggle
                  isOpen={showRightPanel}
                  onToggle={toggleRightPanel}
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
                  className="flex-shrink-0 h-full border-l border-border bg-card"
                  style={{ width: rightPanelWidth }}
                >
                  <ResizeHandle
                    onResize={setRightPanelWidth}
                    currentWidth={rightPanelWidth}
                    minWidth={320}
                    maxWidth={500}
                    side="left"
                  />
                  <ActionHubPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Mobile focused experience
          <div className="h-full flex flex-col">
            {/* Main Content */}
            <div className="flex-1 min-h-0">
              {activePanel === 'workspace' && <WorkspacePanel />}
              {activePanel === 'betslip' && (
                <div className="h-full bg-card">
                  <ActionHubPanel />
                </div>
              )}
              {activePanel === 'profile' && (
                <div className="h-full flex items-center justify-center bg-card">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-foreground mb-2">Profile</h2>
                    <p className="text-muted-foreground">Profile features coming soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Sports Overlay */}
            <MobileOverlay
              isOpen={showSportsOverlay}
              onClose={() => setShowSportsOverlay(false)}
              title="Sports"
              slideFrom="left"
            >
              <SideNavPanel />
            </MobileOverlay>

            {/* Mobile Bet Slip Overlay */}
            <MobileOverlay
              isOpen={showBetSlipOverlay}
              onClose={() => setShowBetSlipOverlay(false)}
              title="Bet Slip"
              slideFrom="right"
            >
              <ActionHubPanel />
            </MobileOverlay>

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav
              onNavClick={handleMobileNavClick}
              activePanel={activePanel}
            />
          </div>
        )}

        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-card text-card-foreground border border-border',
            duration: 3000,
          }}
        />
      </div>
    </BettingProvider>
  )
}

export default App