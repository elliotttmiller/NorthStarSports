import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'

// Context
import { BettingProvider } from './contexts/BettingContext'

// Components
import { HeaderNavbar } from './components/HeaderNavbar'
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileOverlay } from './components/MobileOverlay'
import { MobileBottomNav } from './components/MobileBottomNav'
import { ResizeHandle } from './components/ResizeHandle'

// Hooks
import { useIsMobile } from './hooks/useIsMobile'
import { usePanelState } from './hooks/usePanelState'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

// Types
type ActivePanel = 'home' | 'sports' | 'betslip' | 'profile'

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

  // Mobile overlay states
  const [showSportsOverlay, setShowSportsOverlay] = useState(false)
  const [showBetSlipOverlay, setShowBetSlipOverlay] = useState(false)
  const [activePanel, setActivePanel] = useState<ActivePanel>('home')

  // Initialize keyboard shortcuts
  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
  })

  // Mobile navigation handlers
  const handleMobileNavClick = (panel: ActivePanel) => {
    setActivePanel(panel)
    
    switch (panel) {
      case 'home':
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        break
      case 'sports':
        setShowSportsOverlay(true)
        setShowBetSlipOverlay(false)
        break
      case 'betslip':
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(true)
        break
      case 'profile':
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
      <div className="h-screen w-full bg-background text-foreground flex flex-col overflow-hidden">
        {/* Header Navigation */}
        <HeaderNavbar 
          onToggleLeftPanel={toggleLeftPanel}
          onToggleRightPanel={toggleRightPanel}
          showLeftPanel={showLeftPanel}
          showRightPanel={showRightPanel}
        />

        {/* Main Content Area */}
        <div className="flex-1 min-h-0 flex">
          {!isMobile ? (
            // Desktop three-panel layout
            <div className="flex w-full h-full">
              {/* Left Panel */}
              <AnimatePresence>
                {showLeftPanel && (
                  <motion.div
                    initial={{ opacity: 0, x: -leftPanelWidth }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -leftPanelWidth }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex-shrink-0 h-full border-r border-border bg-card relative"
                    style={{ width: leftPanelWidth }}
                  >
                    <ResizeHandle
                      onResize={setLeftPanelWidth}
                      currentWidth={leftPanelWidth}
                      minWidth={280}
                      maxWidth={500}
                      side="right"
                    />
                    <SideNavPanel />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Center Panel */}
              <div className="flex-1 min-w-0 h-full bg-background">
                <WorkspacePanel />
              </div>

              {/* Right Panel */}
              <AnimatePresence>
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
                    <ActionHubPanel />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              {/* Mobile Layout */}
              <div className="flex-1 min-h-0">
                <WorkspacePanel />
              </div>

              {/* Mobile Sports Overlay */}
              <MobileOverlay
                isOpen={showSportsOverlay}
                onClose={handleSportsOverlayClose}
                title="Sports"
              >
                <SideNavPanel />
              </MobileOverlay>

              {/* Mobile Bet Slip Overlay */}
              <MobileOverlay
                isOpen={showBetSlipOverlay}
                onClose={handleBetSlipOverlayClose}
                title="Bet Slip"
              >
                <ActionHubPanel />
              </MobileOverlay>

              {/* Mobile Bottom Navigation */}
              <MobileBottomNav
                activePanel={activePanel}
                onNavClick={handleMobileNavClick}
              />
            </>
          )}
        </div>

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--card)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            },
          }}
        />
      </div>
    </BettingProvider>
  )
}

export default App