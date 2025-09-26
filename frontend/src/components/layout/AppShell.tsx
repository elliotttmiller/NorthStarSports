"use client";
import { SideNavPanel } from "@/components/panels/SideNavPanel";
import { ActionHubPanel } from "@/components/panels/ActionHubPanel";
import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="grid h-screen w-full grid-cols-[280px_1fr_320px] grid-rows-1" role="presentation">
      <aside className="border-r border-border/60 bg-card/80" aria-label="Sidebar navigation" role="complementary">
        <SideNavPanel />
      </aside>
      <main className="overflow-y-auto" aria-label="Workspace" role="main">
        {children}
      </main>
      <aside className="border-l border-border/60 bg-card/80" aria-label="Action hub" role="region">
        <ActionHubPanel />
      </aside>
    </div>
  );
};
