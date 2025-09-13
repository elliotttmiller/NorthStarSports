import React from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CaretLeft,
  CaretRight,
  PushPin,
} from '@phosphor-icons/react'

interface PanelToggleProps {
  isOpen: boolean
  onToggle: () => void
  side: 'left' | 'right'
  className?: string
  onTogglePin?: () => void
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
        {isOpen && onTogglePin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onTogglePin}
              className={`h-8 w-8 p-0 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-background/80 hover:border-border/50 ${
                isPinned 
                  ? 'text-accent border-accent/30 bg-accent/10' 
                  : 'text-muted-foreground'
              }`}
              title={isPinned ? 'Unpin panel' : 'Pin panel open'}
            >
              <motion.div
                animate={{ 
                  rotate: isPinned ? 0 : 45,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 0.3,
                  scale: { duration: 0.4, times: [0, 0.6, 1] }
                }}
              >
                <PushPin size={14} />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}