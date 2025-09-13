import React from 'react'
import { Button } from '@/components/u
import { Button } from '@/components/ui/button'
import { 
  CaretLeft, 
  CaretRight,
  PushPin,
  PushPinSlash
interface PanelToggleProps {

  className?: string
  onTogglePin?: (

  isOpen, 
  side, 
  isPinned = false,
}: PanelToggleProps) {
 

    <div className={`absolute 
      <mot
        whil
        
          size="s
          className
          }`}
        >
            animate={{ 
              scale: [1, 1.2, 1]
            transition={{ 

          
          </motion.div>
      </motion.div>
      {/* Pin/Unp
        <motion.div
          animate={{ opacity: 1, y
       
          while
          <Button
            size="s
            className={`h-7 
                ? 'border-accent/50 text-accent hover:bg-accent/10' 
            }`}
          >
              animate={{ 
         
              transit
              {isPinned
          </Button>
      )}
  )












        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onTogglePin}
            className={`h-7 w-7 p-0 rounded-full bg-background/60 backdrop-blur-sm border transition-all duration-200 ${
              isPinned 
                ? 'border-accent/50 text-accent hover:bg-accent/10' 
                : 'border-border/30 text-muted-foreground hover:bg-muted/60 hover:border-border/50'
            }`}
            title={isPinned ? 'Unpin panel' : 'Pin panel open'}
          >
            <motion.div
              animate={{ 
                rotate: isPinned ? 0 : 0,
                scale: isPinned ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              {isPinned ? <PushPin size={12} /> : <PushPinSlash size={12} />}
            </motion.div>
          </Button>
        </motion.div>
      )}
    </div>
  )
}