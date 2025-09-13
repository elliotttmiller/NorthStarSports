import { createContext, useContext, ReactNode } from 'react'
import { useKV } from '@github/spark/hooks'
import type { NavigationContextType } from '@/types'

const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [selectedSport, setSelectedSport] = useKV<string>('selected-sport', 'Football')
  const [selectedLeague, setSelectedLeague] = useKV<string>('selected-league', 'nfl')
  const [favorites, setFavorites] = useKV<string[]>('favorites', [])

  const toggleFavorite = (leagueId: string) => {
    setFavorites(currentFavorites => {
      if (!currentFavorites) return [leagueId]
      return currentFavorites.includes(leagueId)
        ? currentFavorites.filter(id => id !== leagueId)
        : [...currentFavorites, leagueId]
    })
  }

  return (
    <NavigationContext.Provider
      value={{
        selectedSport: selectedSport || 'Football',
        selectedLeague: selectedLeague || 'nfl',
        setSelectedSport,
        setSelectedLeague,
        favorites: favorites || [],
        toggleFavorite,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}