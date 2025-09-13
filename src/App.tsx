import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { PanelToggle } from './components/PanelToggle'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { ResizeHandle } from './components/ResizeHandle'
import { BettingProvider } from './contexts/BettingContext'
import { useIsMobile } from './hooks/useIsMobile'
import { usePanelState } from './hooks/usePanelState'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { Toaster } from '@/components/ui/sonner'

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

  const [activeMobilePanel, setActiveMobilePanel] = useState<'nav' | 'betslip' | null>(null)

  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
    showLeftPanel,
    showRightPanel
  })

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
        // Handle profile navigation
        break
    }
  }

  return (
    <BettingProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        {/* Desktop Layout */}
        {!isMobile ? (
          <div className="flex-1 grid min-h-0 relative transition-all duration-300 ease-in-out"
               style={{
                 gridTemplateColumns: `${showLeftPanel ? `${leftPanelWidth}px` : '0px'} 1fr ${showRightPanel ? `${rightPanelWidth}px` : '0px'}`
               }}>
            
            {/* Left Panel - Navigation */}
            <motion.div
              className="min-h-0 overflow-hidden relative border-r border-border"
              initial={false}
              animate={{
                opacity: showLeftPanel ? 1 : 0,
                boxShadow: showLeftPanel 
                  ? '4px 0 8px -2px rgba(0, 0, 0, 0.1)' 
                  : 'none'
              }}
              transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <AnimatePresence mode="wait">
                {showLeftPanel && (
                  <motion.div
                    key="left-panel"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                    className="h-full"
                  >
                    <SideNavPanel />
                    <ResizeHandle
                      side="right"
                      onResize={setLeftPanelWidth}
                      currentWidth={leftPanelWidth}
                      minWidth={250}
                      maxWidth={400}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Center Panel - Workspace */}
            <div className="min-h-0 relative flex flex-col">
              {/* Panel Toggle Controls */}
              <PanelToggle
                side="left"
                isOpen={showLeftPanel}
                onToggle={toggleLeftPanel}
                className="absolute top-4 left-4 z-20"
              />
              <PanelToggle
                side="right"
                isOpen={showRightPanel}
                onToggle={toggleRightPanel}
                className="absolute top-4 right-4 z-20"
              />
              <WorkspacePanel />
            </div>

            {/* Right Panel - Action Hub */}
            <motion.div
              className="min-h-0 overflow-hidden relative border-l border-border"
              initial={false}
              animate={{
                opacity: showRightPanel ? 1 : 0,
                boxShadow: showRightPanel 
                  ? '-4px 0 8px -2px rgba(0, 0, 0, 0.1)' 
                  : 'none'
              }}
              transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <AnimatePresence mode="wait">
                {showRightPanel && (
                  <motion.div
                    key="right-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                    className="h-full"
                  >
                    <ResizeHandle
                      side="left"
                      onResize={setRightPanelWidth}
                      currentWidth={rightPanelWidth}
                      minWidth={300}
                      maxWidth={500}
                    />
                    <ActionHubPanel />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          /* Mobile Layout */
          <>
            {/* Main Content */}
            <div className="flex-1 min-h-0">
              {activeMobilePanel === null && (
                <div className="h-full flex items-center justify-center">
                  <WorkspacePanel />
                </div>
              )}
            </div>

            {/* Mobile Navigation Overlay */}
            <MobileOverlay
              isOpen={activeMobilePanel === 'nav'}
              onClose={() => setActiveMobilePanel(null)}
              title="Navigation"
            >
              <SideNavPanel />
            </MobileOverlay>

            {/* Mobile Bet Slip Overlay */}
            <MobileOverlay
              isOpen={activeMobilePanel === 'betslip'}
              onClose={() => setActiveMobilePanel(null)}
              title="Bet Slip"
            >
              <ActionHubPanel />
            </MobileOverlay>

            {/* Bottom Navigation */}
            <MobileBottomNav
              activePanel={activeMobilePanel || 'workspace'}
              onNavClick={handleMobileNavigation}
            />
          </>
        )}
        
        <Toaster />
      </div>
    </BettingProvider>
  )
}

export default App