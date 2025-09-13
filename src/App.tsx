import React, { useState } from 'react'
import { Toaster } from 'sonner'
import { Toaster } from 'sonner'


import { SideNavPanel } from './components/SideNavPanel'

import { MobileBott
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { PanelToggle } from './components/PanelToggle'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { ResizeHandle } from './components/ResizeHandle'

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

          
              gridTem
          >
            <AnimatePresence m
                <motio
               
                  transition={{ duration: 0.2 }}
                  st
                  }}
              
           
                    onResize={
                    maxWidth={400}
                </motion.div>
            </AnimatePresen
            {/* Center Panel - Workspace */}
              {/* Panel Toggle Buttons */}
                isOpen={showLeftPanel}
                side="left"
              />
                isOpen={sh
                side="right"
              />
              {/*
            </div>
            {/* Right Panel */}
              {showRightPanel &&
                  initial={{ opacity: 0, x: 20 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="min-h
                    boxShadow: sho
                >
                  <ResizeHand
                
                    minWidth={

              )}
          </div>
          /* Mobile Layout */
            {/* Panel Togg
              <PanelToggle
                onToggle={() => setActiveM
              />
                isOpen={activeMobilePanel === 'betslip
                
            </div>
            {/* Main Mobile Workspace *

            <MobileOverlay
              onClose={() => setActiveMobilePanel(null)
              sl
              

              isOpen={activeMobi
              titl

            </MobileOverlay>
            {/* Bottom Navigation */}
              onNavClick={handleMo
            />
        )}
        {/* Global Toast Notifications */}
      </div>
  )
                  className="min-h-0 border-l border-border bg-card relative"
                  style={{
                    boxShadow: showRightPanel ? '-4px 0 8px -2px rgba(0, 0, 0, 0.1)' : 'none'
                  }}
                >
                  <ActionHubPanel />
                  <ResizeHandle
                    side="left"
                    currentWidth={rightPanelWidth}
                    onWidthChange={setRightPanelWidth}
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
              side="left"
            >
              <SideNavPanel />
            </MobileOverlay>

            <MobileOverlay
              isOpen={activeMobilePanel === 'betslip'}
              onClose={() => setActiveMobilePanel(null)}
              side="right"
            >
              <ActionHubPanel />
            </MobileOverlay>

            {/* Bottom Navigation */}
            <MobileBottomNav
              onNavigate={handleMobileNavigation}
            />
          </div>
        )}

        {/* Global Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </BettingProvider>
  )
}

export default App}

export default App