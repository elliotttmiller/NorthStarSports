"use client";

import { useEffect, useState } from "react";
import { Game } from "@/types";
import { GameList } from "@/components/GameList";

export const GameListContainer = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        // Now always fetches from live backend API.
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
        const response = await fetch(`${apiUrl}/games`);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        
        const fetchedGames: Game[] = await response.json();
        setGames(fetchedGames);
      } catch (error) {
        console.error("Failed to fetch games:", error);
        // In a production app, you would set an error state here to show in the UI
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Pass the loading state and the final data down to the "dumb" presentational component.
  return <GameList games={games} loading={loading} />;
};