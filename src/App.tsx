import React, { useState } from 'react'
import { Toaster } from 'sonner'

// Context
import { BettingProvider } from './contexts/BetSlipContext'

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
type ActivePanel = 'home' | 'sports' | 'my-bets' | 'profile'

function App() {
  const isMobile = useIsMobile()
  const {
    showLeftPanel,
    showRightPanel,
    leftPanelWidth,
    rightPanelWidth,
    toggleLeftPanel,
    setRightPanelWidt

  const [showSportsOver
  const [activePanel,

    onToggleLeftPanel: tog
  })
  // Mobile navigation handlers
    setActivePanel(panel)

        setShowSportsOverlay(false
        break
        setShowSportsOverlay(true)
        break
    

        setShowSportsOverlay(fa
        break
  }
  co
    setActivePanel('

    setShowBetSlipOverlay(false)
  }
  return (
      <div className
        <HeaderNavbar 
          onToggleRightPanel={toggle
          sho

        <div className="flex-1 min-
            // Desktop three-panel 
             
                {show
                    initial={{ opac
                    exit={{ opacity:
             
     
   

                      side="right"
                    <SideNavPan
                )}


              </div>
              {/* Right Panel */
                {showRight
   

          
                  >
                      onResize={setRightPanelWidth}
                      minWidth={3
                      
                    <ActionHubPanel />
                )}
            </div>
            <>
          

              {/* Mobile Sports O
                isOpen={showSportsOverlay}
                title="S
                <SideNavPanel />

              <MobileOverlay
                onClose={handle
              >
              </MobileOverlay
              {/* Mobile Bottom Navigation */}
                activePanel={activePanel}
              />
          )}

        <Toaster
          toastOpti
              background: 'var(--
              border: '1px solid var(--border)',
          }}
      </div>
  )