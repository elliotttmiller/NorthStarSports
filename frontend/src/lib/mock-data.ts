import { Game } from "@/types";

const now = new Date();

export const games: Game[] = [
  {
    id: "1",
    leagueId: "NFL",
    status: "upcoming",
    awayTeam: { id: "DET", name: "Lions", shortName: "DET", logo: "/logos/lions.svg" },
    homeTeam: { id: "CHI", name: "Bears", shortName: "CHI", logo: "/logos/bears.svg" },
    startTime: new Date(),
    odds: {
      moneyline: {
        away: { odds: -110, lastUpdated: now },
        home: { odds: +120, lastUpdated: now }
      },
      spread: {
        away: { line: +3.5, odds: -110, lastUpdated: now },
        home: { line: -3.5, odds: -110, lastUpdated: now }
      },
      total: {
        over: { line: 45.5, odds: -105, lastUpdated: now },
        under: { line: 45.5, odds: -115, lastUpdated: now },
        home: { line: 45.5, odds: -110, lastUpdated: now },
        away: { line: 45.5, odds: -110, lastUpdated: now }
      }
    }
  },
  {
    id: "2",
    leagueId: "NFL",
    status: "upcoming",
    awayTeam: { id: "PHI", name: "Eagles", shortName: "PHI", logo: "/logos/eagles.svg" },
    homeTeam: { id: "DAL", name: "Cowboys", shortName: "DAL", logo: "/logos/cowboys.svg" },
    startTime: new Date(),
    odds: {
      moneyline: {
        away: { odds: +130, lastUpdated: now },
        home: { odds: -140, lastUpdated: now }
      },
      spread: {
        away: { line: +2.0, odds: -110, lastUpdated: now },
        home: { line: -2.0, odds: -110, lastUpdated: now }
      },
      total: {
        over: { line: 48.0, odds: -110, lastUpdated: now },
        under: { line: 48.0, odds: -110, lastUpdated: now },
        home: { line: 48.0, odds: -110, lastUpdated: now },
        away: { line: 48.0, odds: -110, lastUpdated: now }
      }
    }
  }
];
