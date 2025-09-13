// Global type definitions for the NorthStarSports Wagering Studio
export {}

declare global {
  interface Window {
    spark: {
      llmPrompt: (strings: string[], ...values: any[]) => string
      llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>
      user: () => Promise<UserInfo>
      kv: {
        keys: () => Promise<string[]>
        get: <T>(key: string) => Promise<T | undefined>
        set: <T>(key: string, value: T) => Promise<void>
        delete: (key: string) => Promise<void>
      }
    }
  }

  interface UserInfo {
    avatarUrl: string
    email: string
    id: string
    isOwner: boolean
    login: string
  }
}

// Re-export commonly used types for consistency
export type { UserInfo }

// Component prop type helpers
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Animation easing presets
export const EASING = {
  ease: [0.4, 0.0, 0.2, 1] as const,
  spring: { type: 'spring', damping: 25, stiffness: 120 } as const,
  bounce: { type: 'spring', damping: 10, stiffness: 100 } as const,
} as const

// Common transition durations
export const DURATION = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.35,
} as const