import React from 'react'


// Context
import { BettingProvider } from './contexts/BettingContext'

import { Work
import { MobileOverlay } from './components/MobileOverla

import { useIsMobile } from './hooks/useIsMobile'
import { useKeyboardShortcuts } from './hooks/useKeyboardSho
function App() {
import { MobileBottomNav } from './components/MobileBottomNav'

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
    showSportsOverlay,
    showBetSlipOverlay,
    setShowSportsOverlay,
    setShowBetSlipOverlay,
    activePanel,
    setActivePanel
  } = usePanelState()

  // Enable keyboard shortcuts for desktop
  useKeyboardShortcuts({
    onToggleLeftPanel: toggleLeftPanel,
    onToggleRightPanel: toggleRightPanel,
    showLeftPanel,
    showRightPanel
  })

  // Mobile navigation handlers
  const handleMobileNavigation = (panel: string) => {
      case 'betslip'
        break
        setActivePanel('profil
        setShowBetSlipOverlay(false
      default:
        setSh
        break
  }
  const close
    setShowBetSlipOve

    <BettingP
        {/* He
          onToggleLeftPanel={t
          showLeftPanel={showLeftPa
        />
        {/* M
     
   

                  <SideNavPanel />
              )}
              {/* Center Panel *
   

          
                  <Ac
              )}
          ) : (
            <div class
              <div className="flex-1 min-h-0"
              </div>
              {/* Mobile Sports Overlay
                isOpen={showSportsOverlay
          


              <MobileOverlay
                onClose=
              >
              </MobileOverlay>
              {/* Mobile Bottom 
                activePanel={acti
              />
          )}

        <Toaster

              {/* Center Panel */}
              <div className="flex-1 min-w-0">
                <WorkspacePanel />
              </div>

              {/* Right Panel */}
              {showRightPanel && (
                <div className="flex-shrink-0 border-l bg-card" style={{ width: rightPanelWidth }}>
                  <ActionHubPanel />
                </div>
              )}
            </div>
          ) : (
            // Mobile layout
            <div className="flex flex-col flex-1">
              {/* Main mobile content */}
              <div className="flex-1 min-h-0">
                <WorkspacePanel />
              </div>

              {/* Mobile Sports Overlay */}
              <MobileOverlay
                isOpen={showSportsOverlay}
                onClose={() => setShowSportsOverlay(false)}
                title="Sports"
              >
                <SideNavPanel />
              </MobileOverlay>

              {/* Mobile Bet Slip Overlay */}
              <MobileOverlay
                isOpen={showBetSlipOverlay}
                onClose={() => setShowBetSlipOverlay(false)}
                title="Bet Slip"
              >
                <ActionHubPanel />
              </MobileOverlay>

              {/* Mobile Bottom Navigation */}
              <MobileBottomNav
                activePanel={activePanel}
                onNavigate={handleMobileNavigation}
              />
            </div>
          )}
        </div>

        {/* Toast notifications */}
        <Toaster
          toastOptions={{
            style: {
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)'
            }
          }}
        />
      </div>
    </BettingProvider>
  )
}

export default App            style: {
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)'
            }
          }}
        />
      </div>
    </BettingProvider>
  )
}

export default App