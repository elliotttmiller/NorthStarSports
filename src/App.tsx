import React, { useState } from 'react'
import { AnimatePresence, motion
import { AnimatePresence, motion } from 'framer-motion'


import { SideNavPanel } from './components/SideNavPanel'

import { Mobi
import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'
import { PanelToggle } from './components/PanelToggle'
import { ResizeHandle } from './components/ResizeHandle'

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
    setRightPanelWidth
  } = usePanelState()

  // Mobile overlay states
  const [showSportsOverlay, setShowSportsOverlay] = useState(false)
  const [showBetSlipOverlay, setShowBetSlipOverlay] = useState(false)

  // Mobile navigation state
  const [activePanel, setActivePanel] = useState<'workspace' | 'betslip' | 'profile'>('workspace')

  useKeyboardShortcuts({
    onToggleRightPanel: toggleRightPanel,
    showRightPanel
  })

  const handleMobileNavClick = (section: string) => {
    switch (section) {
      case 'home':
        setActivePanel('workspace')
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        setSh
      case 'nav':
        setShowSportsOverlay(true)
        break
      case 'betslip':
        setActivePanel('betslip')
        setShowBetSlipOverlay(true)
        break
      case 'profile':
        setActivePanel('profile')
        setShowSportsOverlay(false)
        setShowBetSlipOverlay(false)
        break
     
   

          
                  ani
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ResizeHandle
                    currentWidth={leftP
                    maxWidth={500}
                </motion.div>
            </AnimatePresence>
            {/* Center Pane
              {/* Panel Toggle Con
                <PanelToggle
                  onClick={toggleLeftPanel}
                />
                  isOpen={showRightPanel}
                  side="right"
              </d
              <WorkspacePanel />

            <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opaci
                  exit={{ opacity:
                  cl
                  <ActionHubP
                
                    minWidth={

                </motion.div>
            </AnimatePresence>
        ) : (
          <div className="h-full flex flex-col">
            <div className="
              {activePanel === 'betslip'
                  <ActionHubPanel />
              )}
                <d
                    <h2 clas
                  </div>
              )}

            <Mobil
              onClos

              <SideNavPanel />


              onClose={() => setShowBetSlipO
              slideFrom="right"
              <ActionHubPanel />

            <MobileBottomNav
              activePanel={activePanel}
          </div>

          position="top-right"
            className: 'bg-card text-card-foreground border border-border',
          }}
      </div>
  )
                    onResize={setRightPanelWidth}
                    currentWidth={rightPanelWidth}
                    minWidth={320}
                    maxWidth={500}
                    side="left"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Mobile focused experience
          <div className="h-full flex flex-col">
            {/* Main Content */}
            <div className="flex-1 min-h-0">
              {activePanel === 'workspace' && <WorkspacePanel />}
              {activePanel === 'betslip' && (
                <div className="h-full bg-card">
                  <ActionHubPanel />
                </div>
              )}
              {activePanel === 'profile' && (
                <div className="h-full flex items-center justify-center bg-card">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-foreground mb-2">Profile</h2>
                    <p className="text-muted-foreground">Profile features coming soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Sports Overlay */}
            <MobileOverlay
              isOpen={showSportsOverlay}
              onClose={() => setShowSportsOverlay(false)}
              title="Sports"
              slideFrom="left"
            >
              <SideNavPanel />
            </MobileOverlay>

            {/* Mobile Bet Slip Overlay */}
            <MobileOverlay
              isOpen={showBetSlipOverlay}
              onClose={() => setShowBetSlipOverlay(false)}
              title="Bet Slip"
              slideFrom="right"
            >
              <ActionHubPanel />
            </MobileOverlay>

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav
              onNavClick={handleMobileNavClick}
              activePanel={activePanel}
            />
          </div>
        )}

        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-card text-card-foreground border border-border',
            duration: 3000,
          }}
        />
      </div>
    </BettingProvider>
  )
}

export default App}

export default App