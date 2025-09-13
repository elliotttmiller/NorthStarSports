import React from 'react'
import { Toaster } from 'sonner'
// Contexts

import { Si
import { ActionHubPanel } from './components/ActionHubPanel

import { Resi
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { PanelToggle } from './components/PanelToggle'

// Hooks
import { useIsMobile } from './hooks/useIsMobile'
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

  useKeyboardShortcuts({
    onToggleRightPanel: toggleRightPanel,
    showRightPanel


        setActivePanel('workspace')
        setShowBetsO
      case 'nav':
        setShowSportsOverlay(true)
        break
        setActivePanel('betslip')
        setSh
      case 'profile'
        setShowSportsOverlay(false
        break
  }
  return (
      <div className="h-screen w
          // Desktop three-panel la
            {
     
   

          
                >
                  <ResizeHandle
                    cu
                    maxWidth={500}
                  />
              )}

            <div className="flex-
                <motion.div
                  key="left-panel"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: leftPanelWidth }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="min-h-0 border-r border-border flex-shrink-0 bg-card"
                >
                  <SideNavPanel />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Panel - Main Workspace */}
            <div className="flex-1 min-h-0 relative">
              {/* Panel Toggle Controls */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
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
                  className="min-h-0 border-l border-border flex-shrink-0 bg-card"
                >
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
              <ActionHubPane

            <MobileBottomNav
              onNavClick={
          </div>

        <Toaster
          toastOptions={{
             
              border: '1px solid
          }}

  )























