import React, { useState } from 'react'
import { Toaster } from 'sonner'

// Components
import { WorkspacePanel } from '@/components/WorkspacePanel


import { useMediaQuery } from '@/hooks/useMediaQuery'
// Types

  const isMobile = useMediaQuery('(max-width: 1023px)')
  // Mobile overlay states

  const 


        
      case 'betslip':

        setActiveMobilePanel(nu
    }

    setActiveMobilePanel(n

  
        {isMobile ? (
            {/* Mobile Experience */}
              {/* Main Content Area */}

                  onToggleLeftPanel={() => setActiveMobilePanel('sports')}
                />

              <MobileOverlay
             
              >
              </MobileOverlay>
             
                is
                side="right"
             

   

            </div>
        ) : (
   

          
                </div

              <div cl
            
            {/* Mobile Experience */}
            <div className="flex flex-col h-screen">
              {/* Main Content Area */}
              <div className="flex-1 min-h-0">
                <WorkspacePanel 
                  isMobile={true}
                  onToggleLeftPanel={() => setActiveMobilePanel('sports')}
                  onToggleRightPanel={() => setActiveMobilePanel('betslip')}
                />
            </div>

              {/* Mobile Sports Overlay */}
              <MobileOverlay
                isOpen={activeMobilePanel === 'sports'}
                onClose={closeMobileOverlay}
                side="left"
              >
                <SideNavPanel />
              </MobileOverlay>

              {/* Mobile Bet Slip Overlay */}
              <MobileOverlay
                isOpen={activeMobilePanel === 'betslip'}
                onClose={closeMobileOverlay}
                side="right"
              >
                <ActionHubPanel />
              </MobileOverlay>

              {/* Mobile Bottom Navigation */}
              <MobileBottomNav
                onNavigate={handleMobileNavigation}
                activePanel={activeMobilePanel === 'sports' ? 'sports' : activeMobilePanel === 'betslip' ? 'betslip' : 'home'}
              />
            </div>
          </>
        ) : (
          <>
            {/* Desktop Experience - Three Panel Layout */}
            <div className="grid grid-cols-[320px,1fr,380px] h-screen">
              {/* Left Panel - Sports Navigation */}
              {showLeftPanel && (
                <div className="border-r border-border bg-card">
                  <SideNavPanel />

              )}

              {/* Center Panel - Main Workspace */}
              <div className={`flex flex-col ${showLeftPanel ? '' : 'col-span-1'} ${showRightPanel ? '' : 'col-span-1'}`}>
                <WorkspacePanel
                  isMobile={false}
                  onToggleLeftPanel={() => setShowLeftPanel(!showLeftPanel)}
                  onToggleRightPanel={() => setShowRightPanel(!showRightPanel)}
                />
              </div>

              {/* Right Panel - Action Hub */}
              {showRightPanel && (
                <div className="border-l border-border bg-card">
                  <ActionHubPanel />
                </div>
              )}

          </>



        <Toaster position="top-right" />

    </BettingProvider>

}