"use client";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { SideNavPanel } from "@/components/panels/SideNavPanel";
import { ActionHubPanel } from "@/components/panels/ActionHubPanel";
import { FloatingBetSlipButton } from "@/components/FloatingBetSlipButton";
import { BetSlipModal } from "@/components/BetSlipModal";
import { MobileBetSlipPanel } from "@/components/MobileBetSlipPanel";
import { SidebarToggle } from "@/components/SidebarToggle";
import { Toaster } from "@/components/ui/sonner";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useState } from "react";

export function ClientLayout({ children, fontSans }: { children: React.ReactNode; fontSans: string }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isBetSlipOpen, setBetSlipOpen] = useState(false);

  return (
    <div className={cn("h-screen w-full bg-background text-foreground flex flex-col overflow-hidden", fontSans)}>
      {/* Top Navigation Bar */}
      <NavigationMenu aria-label="Top navigation" role="navigation">
        <Header />
      </NavigationMenu>
      {/* Main Flex Layout: Sidebar | Main | Bet Slip */}
      <div className="flex flex-1 w-full h-full" role="presentation">
        {/* Left Sidebar Sheet */}
        <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <SidebarToggle side="left" isOpen={isSidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]" aria-label="Sidebar navigation" role="complementary">
            <SideNavPanel />
          </SheetContent>
        </Sheet>
        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 py-4" aria-label="Main workspace" role="main">
          {children}
        </main>
        {/* Right Bet Slip Sheet */}
        <Sheet open={isBetSlipOpen} onOpenChange={setBetSlipOpen}>
          <SheetTrigger asChild>
            <SidebarToggle side="right" isOpen={isBetSlipOpen} onToggle={() => setBetSlipOpen((v) => !v)} />
          </SheetTrigger>
          <SheetContent side="right" className="w-[340px]" aria-label="Bet slip" role="region">
            <BetSlipModal open={isBetSlipOpen} onOpenChange={setBetSlipOpen} />
          </SheetContent>
        </Sheet>
      </div>
      {/* Bottom Navigation */}
      <NavigationMenu orientation="horizontal" aria-label="Bottom navigation" role="navigation">
        <BottomNav />
      </NavigationMenu>
      <FloatingBetSlipButton />
      <MobileBetSlipPanel />
      <Toaster position="top-right" />
    </div>
  );
}
