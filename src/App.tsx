import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'

// Contexts
import { BettingProvider } from './contexts/BettingContext'

// Components
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { PanelToggle } from './components/PanelToggle'
import { ResizeHandle } from './components/ResizeHandle'
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'

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
  
  // Mobile panel state
  const [activeMobilePanel, setActiveMobilePanel] = useState<'nav' | 'betslip' | null>(null)

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
    showLeftPanel,
    showRightPanel
  })

  // Mobile navigation handler
  const handleMobileNavigation = (panel: 'nav' | 'betslip' | 'workspace' | 'profile') => {
    switch (panel) {
      case 'nav':
        setActiveMobilePanel('nav')
        break
      case 'betslip':
        setActiveMobilePanel('betslip')
        break
      case 'workspace':
        setActiveMobilePanel(null)
        break
      case 'profile':
        // Handle profile navigation if needed
        break
    }
  }

  return (
    <BettingProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {!isMobile ? (
          /* Desktop Layout - Three Panel Studio */
          <div 
            className="flex-1 grid transition-all duration-200 ease-in-out"
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
                  transition={{ duration: 0.2 }}
                  className="min-h-0 border-r border-border bg-card relative"
                  style={{
                    boxShadow: showLeftPanel ? '4px 0 8px -2px rgba(0, 0, 0, 0.1)' : 'none'
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
            <div className="min-h-0 relative flex flex-col">
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
                  transition={{ duration: 0.2 }}
                  className="min-h-0 border-l border-border bg-card relative"
                  style={{
                    boxShadow: showRightPanel ? '-4px 0 8px -2px rgba(0, 0, 0, 0.1)' : 'none'
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
          /* Mobile Layout */
          <div className="flex-1 flex flex-col relative">
            {/* Panel Toggle Buttons for Mobile */}
            <div className="absolute top-4 left-2 right-2 flex justify-between z-20">
              <PanelToggle
                isOpen={activeMobilePanel === 'nav'}
                onToggle={() => setActiveMobilePanel(activeMobilePanel === 'nav' ? null : 'nav')}
                side="left"
              />
              <PanelToggle
                isOpen={activeMobilePanel === 'betslip'}
                onToggle={() => setActiveMobilePanel(activeMobilePanel === 'betslip' ? null : 'betslip')}
                side="right"
              />
            </div>

            {/* Main Mobile Workspace */}
            <WorkspacePanel />

            {/* Mobile Overlays */}
            <MobileOverlay
              isOpen={activeMobilePanel === 'nav'}
              onClose={() => setActiveMobilePanel(null)}
              title="Sports Navigation"
              slideFrom="left"
            >
              <SideNavPanel />
            </MobileOverlay>

            <MobileOverlay
              isOpen={activeMobilePanel === 'betslip'}
              onClose={() => setActiveMobilePanel(null)}
              title="Bet Slip"
              slideFrom="right"
            >
              <ActionHubPanel />
            </MobileOverlay>

            {/* Bottom Navigation */}
            <MobileBottomNav
              onNavClick={handleMobileNavigation}
              activePanel={activeMobilePanel || 'workspace'}
            />
          </div>
        )}

        {/* Global Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </BettingProvider>
  )
}

export default App