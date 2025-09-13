import React from 'react'
import { Button } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { 
  PushPin,
} from '@phos
interface 
  onToggle: ()
  className?: string


  isOpen, 
  side, 
  onTogglePin,
}: PanelToggleProps)
  
  isPinned?: boolean
}

export function PanelToggle({ 
  isOpen, 
  onToggle, 
  side, 
  className = '',
  onTogglePin,
  isPinned = false,
}: PanelToggleProps) {
  const isLeft = side === 'left'
  
  return (
    <div className={`absolute ${
      isLeft ? 'left-4 top-4' : 'right-4 top-4'
    } z-30 flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-2 ${className}`}>
      
      {/* Main Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={`h-9 w-9 p-0 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-background/90 hover:border-border/70`}
          title={`${isOpen ? 'Hide' : 'Show'} ${isLeft ? 'navigation' : 'bet slip'}`}
        >
          <motion.div
            animate={{ 
              rotate: isOpen ? (isLeft ? 0 : 180) : (isLeft ? 180 : 0),
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
              scale: { duration: 0.4, times: [0, 0.6, 1] }
            }}
          >
            {isLeft ? <CaretRight size={16} /> : <CaretLeft size={16} />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Pin/Unpin Button - Only show when panel is open */}
      <AnimatePresence>
                isPinned 
                  : '
              title={isPinned ? 'Unpin panel
              <motion.div
                  rotate: isPinned ? 0 : 
                }}
              >
              </motion.div>
          <
      </AnimatePres
  )
























