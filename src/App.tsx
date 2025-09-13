import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'

// Contexts
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

  // Mobile navigation state
  const [activePanel, setActivePanel] = React.useState<'nav' | 'workspace' | 'betslip' | 'profile'>('workspace')
  const [showSportsOverlay, setShowSportsOverlay] = React.useState(false)
  const [showBetsOverlay, setShowBetsOverlay] = React.useState(false)

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
    showLeftPanel,
    showRightPanel
  })

  const handleMobileNavClick = (panel: 'nav' | 'workspace' | 'betslip' | 'profile') => {
    switch (panel) {
      case 'workspace':
        setActivePanel('workspace')
        setShowSportsOverlay(false)
        setShowBetsOverlay(false)
        break
      case 'nav':
        setActivePanel('nav')
        setShowSportsOverlay(true)
        setShowBetsOverlay(false)
        break
      case 'betslip':
        setActivePanel('betslip')
        setShowBetsOverlay(true)
        setShowSportsOverlay(false)
        break
      case 'profile':
        setActivePanel('profile')
        setShowSportsOverlay(false)
        setShowBetsOverlay(false)
        break
    }
  }

  return (
    <BettingProvider>
      <div className="h-screen w-full bg-background text-foreground overflow-hidden">
        {!isMobile ? (
          // Desktop three-panel layout
          <div className="h-full flex">
            {/* Left Panel - Sports Navigation */}
            <AnimatePresence mode="wait">
              {showLeftPanel && (
                <motion.div
                  key="left-panel"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: leftPanelWidth }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="min-h-0 border-r border-border flex-shrink-0 bg-card relative"
                >
                  <SideNavPanel />
                  <ResizeHandle
                    side="left"
                    currentWidth={leftPanelWidth}
                    minWidth={250}
                    maxWidth={500}
                    onResize={setLeftPanelWidth}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Panel - Main Workspace */}
            <div className="flex-1 min-h-0 relative">
              {/* Panel Toggle Controls */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
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

              <WorkspacePanel />
            </div>

            {/* Right Panel - Action Hub */}
            <AnimatePresence mode="wait">
              {showRightPanel && (
                <motion.div
                  key="right-panel"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: rightPanelWidth }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="min-h-0 border-l border-border flex-shrink-0 bg-card relative"
                >
                  <ActionHubPanel />
                  <ResizeHandle
                    side="right"
                    currentWidth={rightPanelWidth}
                    minWidth={250}
                    maxWidth={500}
                    onResize={setRightPanelWidth}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Mobile focused experience
          <div className="h-full flex flex-col">
            {/* Main Content */}
            <div className="flex-1 min-h-0">
              <WorkspacePanel />
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

            {/* Mobile Bets Overlay */}
            <MobileOverlay
              isOpen={showBetsOverlay}
              onClose={() => setShowBetsOverlay(false)}
              title="My Bets"
              slideFrom="right"
            >
              <ActionHubPanel />
            </MobileOverlay>

            {/* Bottom Navigation */}
            <MobileBottomNav
              activePanel={activePanel}
              onNavClick={handleMobileNavClick}
            />
          </div>
        )}

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--card)',
              color: 'var(--card-foreground)',
              border: '1px solid var(--border)'
            }
          }}
        />
      </div>
    </BettingProvider>
  )
}

export default App