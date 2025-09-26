"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Receipt } from "lucide-react";
import { useKV } from "@/hooks/useKV";
import { useBetSlipStore } from "@/store/betSlipStore";
import { useNavigationStore } from "@/store/navigationStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

interface FloatingBetSlipButtonProps {
  onClick?: () => void;
}

export function FloatingBetSlipButton({ onClick }: FloatingBetSlipButtonProps) {
  const betSlip = useBetSlipStore(state => state);
  const navigation = useNavigationStore(state => state);
  const setMobilePanel = useNavigationStore(state => state.setMobilePanel);
  const isMobile = useIsMobile();
  const [savedPosition, setSavedPosition] = useKV<Position>(
    "bet-slip-button-position",
    { x: 0, y: 0 },
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const hasMoved = useRef(false);
  const initialPosition = useRef({ x: 0, y: 0 });
  const dragStartTime = useRef(0);

  const getDefaultPosition = useCallback(() => {
    const margin = 16;
    const buttonSize = 48;
    const safeHeight = window.innerHeight - 80; // Account for bottom nav
    return {
      x: window.innerWidth - buttonSize - margin,
      y: safeHeight - buttonSize - margin,
    };
  }, []);

  // Initialize position
  useEffect(() => {
    if (typeof window === "undefined") return;

    const defaultPos = getDefaultPosition();

    // Use saved position or default
    const initPos =
      savedPosition && savedPosition.x !== 0 && savedPosition.y !== 0
        ? savedPosition
        : defaultPos;

    x.set(initPos.x);
    y.set(initPos.y);

    setIsInitialized(true);
  }, [savedPosition, getDefaultPosition, x, y]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const currentX = x.get();
      const currentY = y.get();
      const buttonSize = 48;
      const margin = 16;
      const maxX = window.innerWidth - buttonSize - margin;
      const maxY = window.innerHeight - buttonSize - margin - 80;

      // Keep button within bounds
      if (currentX > maxX) x.set(maxX);
      if (currentY > maxY) y.set(maxY);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [x, y]);

  const handleDragStart = () => {
    setIsDragging(true);
    dragStartTime.current = Date.now();
    hasMoved.current = false;
    initialPosition.current = { x: x.get(), y: y.get() };
  };

  const handleDrag = () => {
    const currentX = x.get();
    const currentY = y.get();

    const buttonSize = 48;
    const margin = 16;
    const maxX = window.innerWidth - buttonSize - margin;
    const maxY = window.innerHeight - buttonSize - margin - 80;

    // Constrain to viewport bounds
    if (currentX < margin) x.set(margin);
    if (currentX > maxX) x.set(maxX);
    if (currentY < margin) y.set(margin);
    if (currentY > maxY) y.set(maxY);

    // Track if user has moved significantly
    const deltaX = Math.abs(currentX - initialPosition.current.x);
    const deltaY = Math.abs(currentY - initialPosition.current.y);
    if (deltaX > 5 || deltaY > 5) {
      hasMoved.current = true;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Save position
    const finalPos = { x: x.get(), y: y.get() };
    setSavedPosition(finalPos);
  };

  if (!isInitialized || !isMobile) return null;

  // Responsive sizing: use universal-responsive-container for spacing
  return (
    <motion.button
      aria-label={betSlip.bets.length > 0 ? `Open betslip (${betSlip.bets.length} bets)` : "Open betslip"}
      className={cn(
        "fixed z-50 bottom-20 right-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg",
        isDragging && "ring-2 ring-primary",
      )}
      style={{ x, y }}
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={onClick || (() => setMobilePanel("betslip"))}
      tabIndex={0}
      role="button"
    >
      <Receipt className="w-6 h-6" aria-hidden="true" />
      {betSlip.bets.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full px-2 py-1 text-xs font-bold shadow" aria-label={`Betslip count: ${betSlip.bets.length}`}>{betSlip.bets.length}</span>
      )}
    </motion.button>
  );
}
