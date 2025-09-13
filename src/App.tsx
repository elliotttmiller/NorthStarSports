import React from 'react'
import { Toaster } from 'sonner'
// Contexts

import { Pa
import { WorkspacePanel } from './components/WorkspacePanel

import { Resi
// Hooks
import { useKeyboardShortcuts } from './hooks/useKeyboar

  const isMobile = useIsMobile()
  const {
    showRightPanel,
    rightPanelWidth,

    setR

  const [activePanel, setActivePanel] = React.useState<'nav' | 'wor
  const [showBetsOverlay, setShowBetsOverlay] = React

    onToggleLeft
  })
  
    setAc
    switch (panel)
        setShowSpor
        break
        setShowBetsO
        break
      case 'profile':
        setShowBetsOve
    }


        {!isMobile ? (
          <div 
            style={{
            }}

              {showLeftPanel && (
                  initia
                  exit={{ opacity: 0, x
                  className="min-h-0 bord
    

                  <ResizeHand
                    currentWidth={leftPanelWidth}
                    minWi
    
              )}

            <div className="min-h-
              <div className="abs
             
                    o
                  />
                <div className="poi
             
                    sid
                </div

            </div>
            {
     
   

          
                    b
                >
                  <Res
                    currentWidth={rightPanelWidth}
               
                  />
              )}
          </div>
          /* M
           
              <WorkspacePanel />

            <MobileOverlay
              onClose={() =
                setActivePanel('workspace')
              slideFrom="left"
            >
            </MobileOverlay>
            {/* Mobile Bets Overlay */}
              isOpen={show
                setShowBetsOverlay(false)
              }}
              tit
              <ActionHubPanel />

            <MobileBottomNav
              onNavClick={handleMobileNavClick}
          </div>

        <Toaster 
          toastOptio
              background: 'va
              co
          }}

  )




























































                setActivePanel('workspace')












                setActivePanel('workspace')









              activePanel={activePanel}





















