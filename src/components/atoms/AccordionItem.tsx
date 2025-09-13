/**
 * AccordionItem - Atomic Component
 * Reusable accordion item for navigation panels
 * Follows Protocol of Radical Reusability
 */

import { useState } from 'react'
import { ChevronDown } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { AccordionItemProps } from '@/types'

export function AccordionItem({ 
  title, 
  children, 
  isExpanded: controlledExpanded,
  onToggle,
  className,
  ...props 
}: AccordionItemProps & React.HTMLAttributes<HTMLDivElement>) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  
  // Use controlled state if provided, otherwise use internal state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded
  const handleToggle = onToggle || (() => setInternalExpanded(!internalExpanded))

  return (
    <div className={cn("fluid-container", className)} {...props}>
      <button
        onClick={handleToggle}
        className="
          flex items-center justify-between w-full p-fluid-sm
          text-left font-medium text-foreground
          hover:bg-muted/50 rounded-md transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          group
        "
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="text-sm font-medium overflow-safe">{title}</span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200 flex-shrink-0",
            isExpanded && "rotate-180"
          )} 
        />
      </button>
      
      <div
        id={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!isExpanded}
      >
        <div className="py-2 pl-fluid-sm">
          {children}
        </div>
      </div>
    </div>
  )
}