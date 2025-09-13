import { Badge } from '@/
import { List, Receipt } from '@phosphor-icon
import { Button } from '@/components/ui/button'
import { List, Receipt } from '@phosphor-icons/react'

  isMobile?: boolean
  onToggleRightPanel?: () => void

export function WorkspacePanel(
  onToggleLeftPanel,
  className = ''
  const { activeView, setActiveVi
  return (
 

            <Button
  isMobile = false,
  onToggleLeftPanel,
  onToggleRightPanel,
  className = ''
}: WorkspacePanelProps) {
  const { activeView, setActiveView, betSlip } = useBetting()

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="sm"
                  {bets.length}
              )}
          </>
          <>
              <Button
                size="sm"
                onC
                <List classNam
              <h1 class

              <Button
             
                className="nav-button"
                Game Lines
              <Button
                size="sm"
                classNam
                
            </div>
            <
             
            
              >
              </Butto
          </>
      </div>
      {/* Main Content Area */}
        {activeView === 'games' ? (
        ) : (
        )}
    </div>
}













































