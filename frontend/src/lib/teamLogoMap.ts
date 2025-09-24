// Centralized team logo mapping for future-proof, production-ready usage
// Usage: import { TEAM_LOGOS, DEFAULT_LOGO } from "@/lib/teamLogoMap";

// Example imports (add all teams as needed)
import detroitRedWings from "@/public/logos/nhl/detroit-red-wings.svg";
import bostonBruins from "@/public/logos/nhl/boston-bruins.svg";
import losAngelesLakers from "@/public/logos/nba/los-angeles-lakers.svg";
// ...import all other team logos here...

// Default fallback logo
import defaultLogo from "@/public/logos/default.svg";

export const TEAM_LOGOS: Record<string, string> = {
  "detroit-red-wings": detroitRedWings,
  "boston-bruins": bostonBruins,
  "los-angeles-lakers": losAngelesLakers,
  // ...add all other teams here...
};

export const DEFAULT_LOGO = defaultLogo;
