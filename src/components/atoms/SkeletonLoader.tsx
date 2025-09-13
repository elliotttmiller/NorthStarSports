/**
 * SkeletonLoader - Atomic Component
 * Generic skeleton loading component
 * Follows Protocol of Radical Reusability
 */

import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'default' | 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

export function SkeletonLoader({ 
  className,
  variant = 'default',
  width,
  height,
  lines = 1,
  ...props 
}: SkeletonLoaderProps & React.HTMLAttributes<HTMLDivElement>) {
  
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "animate-pulse bg-muted rounded",
              index === lines - 1 ? "w-3/4" : "w-full",
              "h-4"
            )}
            style={{ 
              width: width && index === 0 ? width : undefined,
              height: height ? height : undefined
            }}
          />
        ))}
      </div>
    )
  }

  const baseClasses = cn(
    "animate-pulse bg-muted",
    {
      'rounded': variant === 'default' || variant === 'rectangular',
      'rounded-full': variant === 'circular',
      'h-4': variant === 'text' || (variant === 'default' && !height),
      'w-full': variant === 'text' || (variant === 'default' && !width),
    },
    className
  )

  return (
    <div 
      className={baseClasses}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
      {...props}
    />
  )
}