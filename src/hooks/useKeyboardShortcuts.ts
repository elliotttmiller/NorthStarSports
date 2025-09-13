import { useEffect } from 'react'
import { toast } from 'sonner'

export function useKeyboardShortcuts({
  onToggleLeftPanel,
  onToggleRightPanel,
}: {
  onToggleLeftPanel: () => void
  onToggleRightPanel: () => void
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when no input is focused
      const activeElement = document.activeElement as HTMLElement
      if (
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.contentEditable === 'true'
      ) {
        return
      }

      // Cmd/Ctrl + [ for left panel toggle
      if ((event.metaKey || event.ctrlKey) && event.key === '[') {
        event.preventDefault()
        onToggleLeftPanel()
        toast.success('Navigation panel toggled', {
          duration: 1000,
          className: 'text-sm'
        })
      }

      // Cmd/Ctrl + ] for right panel toggle  
      if ((event.metaKey || event.ctrlKey) && event.key === ']') {
        event.preventDefault()
        onToggleRightPanel()
        toast.success('Bet slip panel toggled', {
          duration: 1000,
          className: 'text-sm'
        })
      }

      // Escape key to hide all panels
      if (event.key === 'Escape' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        onToggleLeftPanel()
        onToggleRightPanel()
        toast.info('All panels hidden', {
          duration: 1000,
          className: 'text-sm'
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onToggleLeftPanel, onToggleRightPanel])
}