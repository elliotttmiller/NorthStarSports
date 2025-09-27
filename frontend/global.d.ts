// Global type definitions
declare global {
  var __BUILD_ID__: string
  var __DEV__: boolean
}

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NEXT_PUBLIC_APP_URL: string
    readonly DATABASE_URL: string
    readonly NEXTAUTH_SECRET: string
    readonly NEXTAUTH_URL: string
  }
}

export {}