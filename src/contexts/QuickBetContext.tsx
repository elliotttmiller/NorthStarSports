/**
 * Quick Bet Context - Manages Quick Bet Modal State
 * Core component of the unified "Quick Bet" to "Parlay Builder" workflow
 */

import { createContext, useContext, ReactNode, useCallback, useState } from 'react'
import type { Bet } from '@/types'

interface QuickBetState {
  isVisible: boolean
  position?: { x: number; y: number }
  bet?: Omit<Bet, 'id' | 'stake'>
}

interface QuickBetContextType {
  quickBetState: QuickBetState
  showQuickBet: (bet: Omit<Bet, 'id' | 'stake'>, position?: { x: number; y: number }) => void
  hideQuickBet: () => void
  updateQuickBetStake: (stake: number) => void
  quickBetStake: number
}

const QuickBetContext = createContext<QuickBetContextType | null>(null)

export function QuickBetProvider({ children }: { children: ReactNode }) {
  const [quickBetState, setQuickBetState] = useState<QuickBetState>({
    isVisible: false
  })
  const [quickBetStake, setQuickBetStake] = useState<number>(25) // Default stake

  const showQuickBet = useCallback((
    bet: Omit<Bet, 'id' | 'stake'>, 
    position?: { x: number; y: number }
  ) => {
    setQuickBetState({
      isVisible: true,
      position,
      bet
    })
  }, [])

  const hideQuickBet = useCallback(() => {
    setQuickBetState(prev => ({
      ...prev,
      isVisible: false
    }))
  }, [])

  const updateQuickBetStake = useCallback((stake: number) => {
    setQuickBetStake(stake)
  }, [])

  return (
    <QuickBetContext.Provider
      value={{
        quickBetState,
        showQuickBet,
        hideQuickBet,
        updateQuickBetStake,
        quickBetStake
      }}
    >
      {children}
    </QuickBetContext.Provider>
  )
}

export function useQuickBet() {
  const context = useContext(QuickBetContext)
  if (!context) {
    throw new Error('useQuickBet must be used within a QuickBetProvider')
  }
  return context
}