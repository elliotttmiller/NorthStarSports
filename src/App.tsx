import React from 'react'


// Context
import { BettingProvider } from './contexts/BettingContext'

// Components
import { HeaderNavbar } from './components/HeaderNavbar'
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileOverlay } from './components/MobileOverlay'
import { useIsMobile } from './hooks/useIsMobile'

function
  const {
    showRightPanel,
    rightPanelWidth,

    showBetSlipO
    setShowBetSlipOverlay,
    setAc

  useKeyboardShortc
    onToggleRightPa
    showRightPanel

  const handleMobileN
      case 'sports':
        setActivePanel(
      case 'betslip':
        setActivePanel('be
      case 'home
        setShowSpo
        break

    }

    <BettingProvider>
        {/* Header */}
          onToggle
          showLeft
    

          {!isMobile ? (
            <>
              {showL
                  <S
              )}
              {/* Center Panel *
             

              {showRightPanel && (
                  <ActionHubPanel
             
          ) : (
            <div className="fl
              <div className="flex-
              </div>
             
              
                title="Sports"
             

   

          
              </Mobil
              {/* Mobile Bottom Navigation */}
                active
              />
          )}

        <Toaster
            style: {
              border: '1px solid var(--border)'
            }
        />
    </BettingProvider>
}
















              </div>

              {/* Right Panel */}
              {showRightPanel && (
                <div className="flex-shrink-0 border-l bg-card" style={{ width: rightPanelWidth }}>
                  <ActionHubPanel />
                </div>
              )}
            </>
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

export default App