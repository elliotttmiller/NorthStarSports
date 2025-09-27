"use client";
import { motion } from "framer-motion";

export function ProgressiveLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center p-8"
    >
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
      </div>
      <p className="text-lg font-medium text-foreground">{text}</p>
    </motion.div>
  );
}

// Skeleton loader for specific components
export function GameCardSkeleton() {
  return (
    <motion.div
      className="border rounded-lg p-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted/20 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-muted/20 rounded animate-pulse w-1/2" />
        </div>
        <div className="h-6 w-16 bg-muted/20 rounded animate-pulse" />
      </div>

      {/* Teams with logo placeholders */}
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Team logo skeleton */}
              <div className="w-8 h-8 bg-muted/20 rounded-full animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/10 to-transparent animate-shimmer" />
              </div>
              {/* Team name skeleton */}
              <div className="space-y-1">
                <div className="h-4 bg-muted/20 rounded animate-pulse w-24" />
                <div className="h-3 bg-muted/20 rounded animate-pulse w-12" />
              </div>
            </div>
            {/* Betting buttons skeleton */}
            <div className="flex space-x-2">
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="w-16 h-8 bg-muted/20 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-2 border-t">
        <div className="h-3 bg-muted/20 rounded animate-pulse w-20" />
        <div className="h-6 w-20 bg-muted/20 rounded animate-pulse" />
      </div>
    </motion.div>
  );
}
