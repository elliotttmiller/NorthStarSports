import React, { useState } from 'react'
import { Toaster } from 'sonner'
// Context

// Context
import { BettingProvider } from './contexts/BetSlipContext'

// Components
import { MobileOverlay } from './components/MobileOverla
import { ResizeHandle } from './components/ResizeHandle'
// Hooks
import { usePanelState } from './hooks/usePanelState'

  const isMobile = useIsMobile()
    showLeftPanel,

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


        setActive
        setShowBetSlipOverlay(false)
      case 'sports':
        break

      case 'profile':
        setShowSportsOve
        break
  }
  co


    setShowBetSlipOv
  }
  return (
      <div className="h-screen w-fu
          // Desktop three-panel lay
            {
              {showL
                  initial={{ opaci
             
                  cla
                >
             
                    c
                    maxWidth={500
                  />
              )}

     
   

                  side="left"
                <PanelToggle
                  onToggle
   

                <WorkspacePanel />
            </div>
            {/* Right Pane
   

          
                  cla
                >
                    on
                    minWidth={320}
                    side="left"
                  <ActionHubPanel />
              )}
          </div>
          <>
            <div className="flex-1 min-h-0">
            </div>
            {/* Mobile Sports Overlay */}
              isOpen={showSportsOverlay}
              title="Sports"
              <SideNavPanel />

            <MobileOverlay
              onClose={handleBe
            >
            </MobileOverlay>
            {/* Mobile Bottom Navi
              activePanel={activeP
            />
        )}
        <Toaster
          toastO
              background: 'var

          }}
      </div>
  )




















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
              onPanelClick={handleMobileNavClick}
            />
          </>
        )}

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