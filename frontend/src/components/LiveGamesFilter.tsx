import type { Sport, League } from "@/types";

interface LiveGamesFilterProps {
  sports: Sport[];
  onSportChange: (sportId: string) => void;
  onLeagueChange: (leagueId: string) => void;
  selectedSport: string;
  selectedLeague: string;
}

export function LiveGamesFilter({
  sports,
  onSportChange,
  onLeagueChange,
  selectedSport,
  selectedLeague,
}: LiveGamesFilterProps) {
  return (
    <div className="flex gap-4 mb-4">
      <label htmlFor="sport-select" className="sr-only">Sport</label>
      <select
        id="sport-select"
        value={selectedSport}
        onChange={e => {
          onSportChange(e.target.value);
          onLeagueChange("");
        }}
        className="px-2 py-1 rounded border border-border bg-muted/20 text-sm"
        title="Select sport"
      >
        <option value="">All Sports</option>
        {sports.map((sport: Sport) => (
          <option key={sport.id} value={sport.id}>{sport.name}</option>
        ))}
      </select>
      <label htmlFor="league-select" className="sr-only">League</label>
      <select
        id="league-select"
        value={selectedLeague}
        onChange={e => onLeagueChange(e.target.value)}
        className="px-2 py-1 rounded border border-border bg-muted/20 text-sm"
        disabled={!selectedSport}
        title="Select league"
      >
        <option value="">All Leagues</option>
        {selectedSport && sports.find((s: Sport) => s.id === selectedSport)?.leagues.map((league: League) => (
          <option key={league.id} value={league.id}>{league.name}</option>
        ))}
      </select>
    </div>
  );
}
