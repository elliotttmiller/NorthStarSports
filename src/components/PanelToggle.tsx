import { motion, AnimatePresence } from 'framer-motion'
import { 
  SidebarSimple, 
  X,
  Receipt,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PanelToggleProps {
  /** Whether the panel is currently open */
  isOpen: boolean
  /** Which side panel this toggle controls */
  side: 'left' | 'right'
  /** Function to call when toggle is clicked */
  onToggle: () => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Professional panel toggle component with smooth animations and proper iconography.
 * Provides contextual icons based on panel side and state.
 */
export function PanelToggle({ 
  isOpen, 
  side, 
  onToggle, 
  className 
}: PanelToggleProps) {
  
  // Determine the appropriate icon based on panel side and state
  const getIcon = () => {
    if (side === 'left') {
      // Left panel: Navigation/sidebar related icons
      if (isOpen) {
        return CaretLeft // Arrow pointing left to indicate "close"
      } else {
        return SidebarSimple // Sidebar icon to indicate "open navigation"
      }
    } else {
      // Right panel: Action hub/bet slip related icons
      if (isOpen) {
        return CaretRight // Arrow pointing right to indicate "close"
      } else {
        return Receipt // Receipt icon to indicate "open bet slip"
      }
    }
  }

  // Get base classes (positioning handled by parent)
  const getBaseClasses = () => {
    return '' // No positioning, handled by parent component
  }

  const Icon = getIcon()
  const baseClasses = getBaseClasses()
  
  return (
    <motion.div
      className={cn(
        baseClasses,
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: 0
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        duration: 0.2, 
        ease: [0.4, 0.0, 0.2, 1] 
      }}
    >
      <Button
        onClick={onToggle}
        size="sm"
        variant="outline"
        className={cn(
          "h-9 w-9 p-0 rounded-full",
          "border-border/60 bg-background/80 backdrop-blur-sm",
          "hover:bg-muted/50 hover:border-border",
          "hover:shadow-md hover:shadow-black/5",
          "transition-all duration-200 ease-out",
          "group relative overflow-hidden",
          // Enhanced states for better feedback
          isOpen 
            ? "ring-1 ring-accent/20 bg-muted/30" 
            : "hover:ring-1 hover:ring-muted-foreground/10"
        )}
        aria-label={
          side === 'left' 
            ? `${isOpen ? 'Close' : 'Open'} navigation panel`
            : `${isOpen ? 'Close' : 'Open'} bet slip panel`
        }
      >
        {/* Background ripple effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 rounded-full opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
        
        {/* Icon with smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${side}-${isOpen}`}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              rotate: side === 'left' ? -10 : 10
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              rotate: side === 'left' ? 10 : -10
            }}
            transition={{ 
              duration: 0.2, 
              ease: [0.4, 0.0, 0.2, 1] 
            }}
            className="relative z-10"
          >
            <Icon 
              className={cn(
                "w-4 h-4 transition-colors duration-200",
                // Color based on state for better visual hierarchy
                isOpen 
                  ? "text-muted-foreground group-hover:text-foreground" 
                  : "text-foreground group-hover:text-accent-foreground"
              )} 
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Subtle pulse animation for closed panels to encourage interaction */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 border border-accent/20 rounded-full"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              scale: [1, 1.1, 1] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        )}
      </Button>
    </motion.div>
  )
}