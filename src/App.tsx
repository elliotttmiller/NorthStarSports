import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'

// Contexts
import { BettingProvider } from './contexts/BettingContext'

// Components
import { PanelToggle } from './components/PanelToggle'
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { ResizeHandle } from './components/ResizeHandle'

// Hooks
import { useIsMobile } from './hooks/useIsMobile'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { usePanelState } from './hooks/usePanelState'

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

  // Keyboard shortcuts for desktop
  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
  })

  // Handle mobile navigation
  const handleMobileNavClick = (panel: 'nav' | 'workspace' | 'betslip' | 'profile') => {
    setActivePanel(panel)
    
    switch (panel) {
      case 'nav':
        setShowSportsOverlay(true)
        setShowBetsOverlay(false)
        break
      case 'betslip':
        setShowBetsOverlay(true)
        setShowSportsOverlay(false)
        break
      case 'workspace':
      case 'profile':
        setShowSportsOverlay(false)
        setShowBetsOverlay(false)
        break
    }
  }

  return (
    <BettingProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {!isMobile ? (
          /* Desktop Layout - Three Panel Studio */
          <div 
            className="flex-1 grid transition-all duration-300 ease-out"
            style={{
              gridTemplateColumns: `${showLeftPanel ? `${leftPanelWidth}px` : '0px'} 1fr ${showRightPanel ? `${rightPanelWidth}px` : '0px'}`
            }}
          >
            {/* Left Panel - Sports Library */}
            <AnimatePresence mode="wait">
              {showLeftPanel && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="min-h-0 border-r border-border bg-card relative overflow-hidden"
                  style={{
                    boxShadow: showLeftPanel ? '4px 0 12px -4px rgba(0, 0, 0, 0.1)' : 'none'
                  }}
                >
                  <SideNavPanel />
                  <ResizeHandle
                    side="right"
                    currentWidth={leftPanelWidth}
                    onResize={setLeftPanelWidth}
                    minWidth={250}
                    maxWidth={400}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Panel - Workspace */}
            <div className="min-h-0 relative flex flex-col bg-background">
              {/* Panel Toggle Buttons */}
              <div className="absolute top-4 left-4 right-4 flex justify-between z-20 pointer-events-none">
                <div className="pointer-events-auto">
                  <PanelToggle
                    isOpen={showLeftPanel}
                    onToggle={toggleLeftPanel}
                    side="left"
                  />
                </div>
                <div className="pointer-events-auto">
                  <PanelToggle
                    isOpen={showRightPanel}
                    onToggle={toggleRightPanel}
                    side="right"
                  />
                </div>
              </div>

              <WorkspacePanel />
            </div>

            {/* Right Panel - Action Hub */}
            <AnimatePresence mode="wait">
              {showRightPanel && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="min-h-0 border-l border-border bg-card relative overflow-hidden"
                  style={{
                    boxShadow: showRightPanel ? '-4px 0 12px -4px rgba(0, 0, 0, 0.1)' : 'none'
                  }}
                >
                  <ActionHubPanel />
                  <ResizeHandle
                    side="left"
                    currentWidth={rightPanelWidth}
                    onResize={setRightPanelWidth}
                    minWidth={300}
                    maxWidth={500}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Mobile Layout - Focused Sequential Experience */
          <div className="flex-1 flex flex-col">
            {/* Main Content Area */}
            <div className="flex-1 relative">
              <WorkspacePanel />
            </div>

            {/* Mobile Sports Overlay */}
            <MobileOverlay
              isOpen={showSportsOverlay}
              onClose={() => {
                setShowSportsOverlay(false)
                setActivePanel('workspace')
              }}
              slideFrom="left"
              title="Sports"
            >
              <SideNavPanel />
            </MobileOverlay>

            {/* Mobile Bets Overlay */}
            <MobileOverlay
              isOpen={showBetsOverlay}
              onClose={() => {
                setShowBetsOverlay(false)
                setActivePanel('workspace')
              }}
              slideFrom="right"
              title="Bet Slip"
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

        {/* Global Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--card-foreground)',
            },
          }}
        />
      </div>
    </BettingProvider>
  )
}

export default App