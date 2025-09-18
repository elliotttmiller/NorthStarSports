import { useEffect, useState } from "react";
import { getLiveGames } from "@/services/mockApi";
import { getSports } from "@/services/mockApi";
import { ProfessionalGameRow } from "@/components/ProfessionalGameRow";
import { GameCard } from "@/components/GameCard";
import { LiveGamesFilter } from "@/components/LiveGamesFilter";
import { CompactMobileGameRow } from "@/components/CompactMobileGameRow";
import { SmoothScrollContainer } from "@/components/VirtualScrolling";
import { motion } from "framer-motion";
import type { Game } from "@/types";

export function LivePage() {
  const [liveGames, setLiveGames] = useState<Game[]>([]);
  const [sports, setSports] = useState<any[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedLeague, setSelectedLeague] = useState<string>("");

  useEffect(() => {
    getLiveGames().then((games) => {
      setLiveGames(games);
    });
    getSports().then(setSports);
  }, []);

  // Group live games by sport and league
  let displayGames = liveGames;
  if (selectedSport) {
    // Find all league IDs for the selected sport
    const sportObj = sports.find((s: any) => s.id === selectedSport);
    if (sportObj) {
      const leagueIds = sportObj.leagues.map((l: any) => l.id);
      displayGames = liveGames.filter((g) => leagueIds.includes(g.leagueId));
    }
  }
  if (selectedLeague) {
    displayGames = displayGames.filter((g) => g.leagueId === selectedLeague);
  }

  return (
    <SmoothScrollContainer className="flex-1 min-h-0 universal-responsive-container scrollbar-hide" showScrollbar={false} maxHeight="100vh">
      <div className="mx-auto w-full max-w-4xl px-4 md:px-8 lg:px-12 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-bold text-foreground mb-4">Live Games</h1>
          <LiveGamesFilter
            sports={sports}
            selectedSport={selectedSport}
            selectedLeague={selectedLeague}
            onSportChange={setSelectedSport}
            onLeagueChange={setSelectedLeague}
          />
          <div className="space-y-2">
            {displayGames.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No live games right now.</div>
            ) : (
              displayGames.map((game) => (
                <GameCard key={game.id} game={{ ...game, startTime: typeof game.startTime === 'string' ? new Date(game.startTime) : game.startTime }} />
              ))
            )}
          </div>
        </motion.div>
      </div>
    </SmoothScrollContainer>
  );
}
