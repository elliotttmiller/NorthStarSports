import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


// Contexts
import { BettingProvider } from './contexts/BettingContext'

// Components
import { PanelToggle } from './components/PanelToggle'
import { SideNavPanel } from './components/SideNavPanel'

import { useIsMobile } from './hooks/useIsMobile'
import { usePanelState } from './hooks/usePanelState'
function App() {
  

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
    showRightPanel

  
      case 'nav':
        break

      case 'workspace':
        break
        // Handle profile navigation if
    }

    <BettingProvid
    

            style={{
            }}
            {/* Left
              {sh
                  initial={{ opacit
             
                  cla
                    boxShadow: showLeft
             
                  <Resi
                    currentWidth={
             
                  />
              )}

     
   

  return (
    <BettingProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {!isMobile ? (
          /* Desktop Layout - Three Panel Studio */
          <div 
            className="flex-1 grid transition-all duration-200 ease-in-out"
            style={{
              gridTemplateColumns: `${showLeftPanel ? `${leftPanelWidth}px` : '0px'} 1fr ${showRightPanel ? `${rightPanelWidth}px` : '0px'}`
            }}
          >
            {/* Left Panel - Sports Library */}
            <AnimatePresence mode="wait">
              {showLeftPanel && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
            {/* Right Panel - Action Hub */}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-0 border-r border-border bg-card relative"
                  style={{
                    boxShadow: showLeftPanel ? '4px 0 8px -2px rgba(0, 0, 0, 0.1)' : 'none'
                  }}
                >
                  <SideNavPanel />
                  <ResizeHandle
                    side="right"
                    currentWidth={leftPanelWidth}
                    onWidthChange={setLeftPanelWidth}
                    minWidth={250}
                    maxWidth={400}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Panel - Workspace */}
            <div className="min-h-0 relative flex flex-col">
              {/* Panel Toggle Buttons */}
              <div className="absolute top-4 left-4 right-4 flex justify-between z-20 pointer-events-none">
                <div className="pointer-events-auto">
                  <PanelToggle
                    isOpen={showLeftPanel}
                    onToggle={toggleLeftPanel}
                    side="left"
                  />
                </div>
                <div className="pointer-events-auto">
                  <PanelToggle
                    isOpen={showRightPanel}
                    onToggle={toggleRightPanel}
                    side="right"
                  />
                </div>
              </div>

              <WorkspacePanel />
            </div>

            {/* Right Panel - Action Hub */}
            <AnimatePresence mode="wait">
              {showRightPanel && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
              slideFrom="left"
              <SideNavPanel />

              isOpen={acti
              title="Bet Slip"
            >
            </Mob
            {/* Bottom Navigation */
              onNavClick={handl
            />
        )}
        {/* Global Toast Notifications */}
      </div>
  )
























































