
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@/context/NavigationContext';
import { Game } from '@/types';
import { getGamesPaginated, PaginatedResponse } from '@/services/mockApi';
import { Button } from '@/components/ui/button';
import { GameCard } from '@/components/GameCard';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { useInfiniteScroll, useSmoothScroll } from '@/hooks/useInfiniteScroll';
import { useIsMobile } from '@/hooks/useIsMobile';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { CaretUp, SortAscending } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useKV } from '@/hooks/useKV';

// Interface for layout preferences
interface LayoutPreferences {
  viewMode: 'fluid' | 'compact' | 'list';
  sortBy: 'time' | 'popular' | 'odds';
  showExpanded: boolean;
}

const WorkspacePanel = () => {
  const { navigation, setMobilePanel } = useNavigation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // State management
  const [games, setGames] = useState<Game[]>([]);
  const [expandedCards, setExpandedCards] = useKV<string[]>('expanded-game-cards', []);
  const [favoriteGames] = useKV<string[]>('favorite-games', []);
  const [layoutPrefs, setLayoutPrefs] = useKV<LayoutPreferences>('workspace-layout-prefs', {
    viewMode: 'fluid',
    sortBy: 'time',
    showExpanded: false
  });

  const [pagination, setPagination] = useState<PaginatedResponse<Game>['pagination'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null);
  const { scrollToTop } = useSmoothScroll();

  const loadMoreRef = useInfiniteScroll({
    hasNextPage: pagination?.hasNextPage ?? false,
    isFetchingNextPage: loading,
    fetchNextPage: () => loadNextPage()
  });

  const loadGames = useCallback(async (page = 1, reset = false) => {
    if (!navigation.selectedLeague) return;

    if (reset) {
      setInitialLoading(true);
      setGames([]);
    } else {
      setLoading(true);
    }

    try {
      const response = await getGamesPaginated(navigation.selectedLeague, page, 12);

      if (reset) {
        setGames(response.data);
        setCurrentPage(1);
      } else {
        setGames(prevGames => [...prevGames, ...response.data]);
        setCurrentPage(page);
      }

      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to load games:', error);
      toast.error('Failed to load games');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [navigation.selectedLeague]);

  const loadNextPage = useCallback(() => {
    if (pagination?.hasNextPage && !loading) {
      loadGames(currentPage + 1, false);
    }
  }, [pagination?.hasNextPage, loading, currentPage, loadGames]);

  useEffect(() => {
    if (navigation.selectedLeague) {
      loadGames(1, true);
    } else {
      setGames([]);
      setPagination(null);
    }
  }, [navigation.selectedLeague, loadGames]);

  // Game interaction handlers
  const handleGameToggle = useCallback((gameId: string) => {
    setExpandedCards((current) => {
      if (current?.includes(gameId)) {
        return current.filter(id => id !== gameId);
      }
      return [...(current || []), gameId];
    });
  }, [setExpandedCards]);

  // Sorting and filtering
  const processedGames = useMemo(() => {
    let processed = [...games];

    // Sort games
    switch (layoutPrefs?.sortBy) {
      case 'time':
        processed.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        break;
      case 'popular':
        // Mock popularity sorting - in real app this would be based on betting volume
        processed.sort((a, b) => (favoriteGames?.includes(b.id) ? 1 : 0) - (favoriteGames?.includes(a.id) ? 1 : 0));
        break;
      case 'odds':
        // Sort by moneyline favorite
        processed.sort((a, b) => {
          const aFav = Math.min(a.odds.moneyline.home.odds, a.odds.moneyline.away.odds);
          const bFav = Math.min(b.odds.moneyline.home.odds, b.odds.moneyline.away.odds);
          return aFav - bFav;
        });
        break;
    }

    return processed;
  }, [games, layoutPrefs, favoriteGames]);

  const handleScrollToTop = () => {
    if (scrollContainerRef) {
      scrollToTop(scrollContainerRef);
    }
  };

  const gameIds = processedGames.map(game => game.id);

  if (initialLoading) {
    return <SkeletonLoader type="games" count={4} />;
  }

  if (!navigation.selectedLeague || games.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-foreground mb-2">Select a League</h3>
          <p className="text-muted-foreground mb-4">Choose a sport and league to view games and place bets.</p>

          {/* Mobile-only: Show button to open sports navigation */}
          {isMobile && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setMobilePanel('navigation')}
                className="rounded-full px-4 py-2 mt-2 shadow-md"
              >
                Open Sports
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-start mx-auto max-w-screen-lg px-4 sm:px-8 lg:px-12 py-10 gap-y-10 bg-background">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">Welcome to NSSPORTSCLUB</h1>
        <p className="text-lg text-muted-foreground mb-6">Your professional sports betting platform</p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Example stats, replace with real data if needed */}
        <div className="flex flex-col items-center justify-center bg-card/80 border border-border rounded-xl shadow-sm p-6 min-h-[120px]">
          <span className="text-sm text-muted-foreground mb-1">Balance</span>
          <span className="text-2xl font-semibold text-foreground">$1,250.00</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-card/80 border border-border rounded-xl shadow-sm p-6 min-h-[120px]">
          <span className="text-sm text-muted-foreground mb-1">Win Rate</span>
          <span className="text-2xl font-semibold text-foreground">68%</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-card/80 border border-border rounded-xl shadow-sm p-6 min-h-[120px]">
          <span className="text-sm text-muted-foreground mb-1">Active</span>
          <span className="text-2xl font-semibold text-foreground">0</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-card/80 border border-border rounded-xl shadow-sm p-6 min-h-[120px]">
          <span className="text-sm text-muted-foreground mb-1">This Week</span>
          <span className="text-2xl font-semibold text-foreground">+$340</span>
        </div>
      </div>
      {/* Games Container */}
      <div className="flex-1 overflow-hidden w-full">
        <div
          ref={(el) => setScrollContainerRef(el)}
          className={cn('h-full seamless-scroll overflow-y-auto')}
          style={{
            padding: 'var(--fluid-panel-padding)',
            fontSize: 'var(--fluid-base)'
          }}
        >
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {processedGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  className={cn(
                    'card-hover',
                    favoriteGames?.includes(game.id) && 'ring-1 ring-yellow-400/20'
                  )}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Load more trigger */}
          {pagination?.hasNextPage && !loading && (
            <div ref={loadMoreRef} className="h-16 w-full" />
          )}

          {/* End of results indicator */}
          {pagination && !pagination.hasNextPage && processedGames.length > 0 && (
            <motion.div
              className="text-center py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-sm text-muted-foreground">
                End of games list
              </div>
            </motion.div>
          )}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-border"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">Loading more games...</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Floating Action Button - Scroll to top */}
      <AnimatePresence>
        {processedGames.length > 5 && (
          <motion.div
            className="fixed bottom-20 right-4 z-30 lg:bottom-6"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={handleScrollToTop}
              className="rounded-full h-10 w-10 shadow-lg hover:shadow-xl transition-shadow bg-card/90 backdrop-blur-sm border border-border"
            >
              <CaretUp size={16} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkspacePanel;