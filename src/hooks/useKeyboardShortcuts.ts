import { useEffect } from 'react'
import { toast } from 'sonner'

interface KeyboardShortcutsProps {
  onToggleLeftPanel: () => void
  onToggleRightPanel: () => void
  showLeftPanel?: boolean
  showRightPanel?: boolean
}

export function useKeyboardShortcuts({
  onToggleLeftPanel,
  onToggleRightPanel,
  showLeftPanel = false,
  showRightPanel = false
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when no input is focused
      const activeElement = document.activeElement as HTMLElement
      if (
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.contentEditable === 'true' ||
        activeElement?.role === 'textbox'
      ) {
        return
      }

      // Cmd/Ctrl + [ for left panel toggle
      if ((event.metaKey || event.ctrlKey) && event.key === '[') {
        event.preventDefault()
        onToggleLeftPanel()
        toast.success(`Navigation panel ${showLeftPanel ? 'hidden' : 'shown'}`, {
          duration: 1200,
          className: 'text-sm'
        })
        return
      }

      // Cmd/Ctrl + ] for right panel toggle  
      if ((event.metaKey || event.ctrlKey) && event.key === ']') {
        event.preventDefault()
        onToggleRightPanel()
        toast.success(`Bet slip panel ${showRightPanel ? 'hidden' : 'shown'}`, {
          duration: 1200,
          className: 'text-sm'
        })
        return
      }

      // Cmd/Ctrl + \ to hide all open panels or show both if both are closed
      if ((event.metaKey || event.ctrlKey) && event.key === '\\') {
        event.preventDefault()
        
        // If both panels are open, close both
        if (showLeftPanel && showRightPanel) {
          onToggleLeftPanel()
          onToggleRightPanel()
          toast.info('All panels hidden', {
            duration: 1200,
            className: 'text-sm'
          })
        }
        // If both panels are closed, open both  
        else if (!showLeftPanel && !showRightPanel) {
          onToggleLeftPanel()
          onToggleRightPanel()
          toast.info('All panels shown', {
            duration: 1200,
            className: 'text-sm'
          })
        }
        // If mixed state, close the open one(s)
        else {
          if (showLeftPanel) onToggleLeftPanel()
          if (showRightPanel) onToggleRightPanel()
          toast.info('Panels hidden', {
            duration: 1200,
            className: 'text-sm'
          })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onToggleLeftPanel, onToggleRightPanel, showLeftPanel, showRightPanel])
}