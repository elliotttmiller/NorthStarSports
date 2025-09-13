import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileOverlayProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
  slideFrom?: 'left' | 'right'
}

export function MobileOverlay({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className,
  slideFrom = 'left'
}: MobileOverlayProps) {
  const slideInitial = slideFrom === 'left' ? { x: '-100%' } : { x: '100%' }
  const slideExit = slideFrom === 'left' ? { x: '-100%' } : { x: '100%' }
  const positionClass = slideFrom === 'left' ? 'left-0' : 'right-0'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Overlay Panel */}
          <motion.div
            initial={slideInitial}
            animate={{ x: 0 }}
            exit={slideExit}
            transition={{ type: 'tween', duration: 0.3 }}
            className={cn(
              "fixed top-0 h-full w-80 max-w-[85vw] bg-background z-50 flex flex-col",
              positionClass,
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">{title}</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}