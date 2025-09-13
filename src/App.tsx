import { useState } from 'react'
import { SideNavPanel } from './components/SideNavPanel
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { PanelToggle } from './components/PanelToggle'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { useIsMobile } from './hooks/useIsMobile'
import { useKeyboardShortcuts } from './hooks/useKeyboardSh

  const isMobile = useIsMobile()
    showLeftPanel,
    leftPanelWidth,

    setLeftPanel
  } = usePanelState()
  const [
  useKeyboardShort
    onToggleRightPa
    showRightPanel

    switch (panel) {
        setActiveMobi
      case 'betslip':
        break
        setActiveMobi

        break

  return (
      <div className="flex flex-col h-s
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
            
                      currentWidth={leftPan
                      m
                  </motion.div>
              </AnimatePresen

            <div className="min-h-0 relative fl
              <PanelToggle
                isOpen={showLeftPanel}
                className=
              <P
                isOpen={showRightPanel}
             
              <WorkspacePanel />

            <motion.div
              initial={false}
                opacity: showRightPanel ? 1 : 0,
                  ? '-4px 0 8px -2px rgba(0, 0, 0,
              }}
            >
                {showRightPanel && (
                   
                    animate={{ opaci
                    transition={{
                  >
                      side="left"
                      currentWidth={
                      maxWidth={500}
                    <A
                )}
            </moti
        ) : (
          <>

                <div className="h-full flex 
                </div>
            </div>
            {/* Mobile Navig
              isOpen={activeM
              title="Navigation"
              <SideNavPanel />

            <Mobil
              onClose={() =>
            >
            </MobileOverlay>
            {/* Bottom Navigation */}
              activePanel={activeM
            />
        )}
        <Toaster />
    </BettingProvi

export default App













































































