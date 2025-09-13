import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  CaretLeft,
  CaretRight, 
  Receipt, 
  X 
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface PanelToggleProps {
  isOpen: boolean
  side: 'left' | 'right'
  onToggle: () => void
  className?: string
}

export function PanelToggle({ 
  isOpen, 
  side, 
  onToggle, 
  className 
}: PanelToggleProps) {
  // Icon selection based on panel side and state
  const getIcon = () => {
    if (side === 'left') {
      return isOpen ? CaretLeft : CaretRight
    } else {
      return isOpen ? X : Receipt
    }
  }

  const Icon = getIcon()
  
  // Position classes based on side
  const positionClasses = side === 'left' 
    ? 'left-4 top-4' 
    : 'right-4 top-4'

  return (
    <motion.div 
      className={cn(
        "absolute z-30",
        positionClasses,
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className={cn(
          "h-9 w-9 p-0 rounded-lg shadow-lg backdrop-blur-sm",
          "bg-background/90 hover:bg-background",
          "border-border/50 hover:border-border",
          "transition-all duration-200",
          "hover:shadow-xl hover:scale-105",
          isOpen && "bg-muted/80"
        )}
        title={`${isOpen ? 'Hide' : 'Show'} ${side} panel`}
      >
        <motion.div
          animate={{ 
            rotate: isOpen ? 180 : 0 
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.4, 0.0, 0.2, 1] 
          }}
        >
          <Icon 
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              isOpen ? "text-muted-foreground" : "text-foreground"
            )} 
          />
        </motion.div>
      </Button>
    </motion.div>
  )
}