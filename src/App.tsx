import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SideNavPanel } from './components/SideNavPanel'

import { SideNavPanel } from './components/SideNavPanel'
import { WorkspacePanel } from './components/WorkspacePanel'
import { ActionHubPanel } from './components/ActionHubPanel'
import { PanelToggle } from './components/PanelToggle'
import { MobileBottomNav } from './components/MobileBottomNav'
import { MobileOverlay } from './components/MobileOverlay'

import { ResizeHandle } from './components/ResizeHandle'
  const isMobile = useIsMobile()
import { usePanelState } from './hooks/usePanelState'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { Toaster } from '@/components/ui/sonner'


  useKeyboardShortcuts({
    onToggleRightPanel: isMobile ? () => {} : toggleRightPanel,
    showRightPanel: isMobile ? false : showRightPanel

  
        setShowMobileNav(true)
      case
        setShowMobi
        break
        setShowMobil
      case 'profile'
        setShowMobile
        break
  }
  return (
      <div className=

            className="flex-1 grid min-h-0 relative"
              gridTempla
            transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2
            {/* Left Panel - Navigation */}
              className="min-h-0 overflow-hidden rel
                opacity: showLeftPanel ? 1 : 0,
    

              transition={{ duration: 0.3, ease: [0
              <Anima
                 
                    animate={{
             
                      e
                    }}
                  >
                    
             
                     
                      minWidth={25
             
                )}
            </motion.div>
            {/* Center Panel - 
              className={`min-h-0 r
             
     
   

          
              <PanelT
                onToggle={toggleLeftPanel}
                className="z-2

              <PanelTo
                onToggle={toggleRightPanel}
                clas

            </
            {/* Right Panel - Action Hub */}
           
                opacity: showRightPanel ? 1
                boxShado
                  : 'none'
              transition=
              <AnimatePresence mode="wait">
                  <motion.div
                    animate={{ opacity: 1
                    transition={{ 
                      ease
                
                  >
             
                    <ResizeHandle
                      onResize={set
                      minWidt
                    />
                )}
            </motion.div>
        )}
        {/* Mobile Layout */}
          <>
              {activeMobilePanel 
              )}
                <div className="h-full flex ite
                   
                  </div>
              )}

            <MobileOverlay
              onClose={() => setS
            >
            </MobileOverlay>
            {/* Mobile Bet Slip Over
              isOpen={showMobileBetS
              title="B
            >
            </Mobi
            {/* Bottom Navigatio
              activePanel

        )}
        <Toaster />
    </BettingProvider>
}
export default App























































































































