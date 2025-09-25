"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Game } from "@/types";
import { getGameById } from "@/services/mockApi";
import { formatDateDetailed } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { ArrowLeft } from "@phosphor-icons/react";
import { SmoothScrollContainer } from "@/components/VirtualScrolling";
import { toast } from "sonner";

export default function Page({ params }: { params: { gameId: string } }) {
  const router = useRouter();
  const { gameId } = params;
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("main");

  useEffect(() => {
    if (!gameId) return;
    const loadGameData = async () => {
      setLoading(true);
      try {
        const [gameData] = await Promise.all([getGameById(gameId)]);
        setGame(gameData);
      } catch (error) {
        console.error("Failed to load game data:", error);
        toast.error("Failed to load game details");
      } finally {
        setLoading(false);
      }
    };
    loadGameData();
  }, [gameId]);

  if (loading) {
    return <SkeletonLoader type="games" count={1} />;
  }

  if (!game) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="game-detail-not-found"
          className="h-full flex items-center justify-center bg-background"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center px-4">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Game Not Found
            </h3>
            <p className="text-muted-foreground mb-4">
              The requested game could not be found.
            </p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`game-detail-${game.id}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        className="h-full flex flex-col overflow-hidden bg-muted/10"
      >
        {/* ...existing code... */}
      </motion.div>
    </AnimatePresence>
  );
}
