import { SideNavPanel } from "@/components/panels/SideNavPanel";
import { ActionHubPanel } from "@/components/panels/ActionHubPanel";
import { ReactNode } from "react";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-screen w-full grid-cols-[280px_1fr_320px] grid-rows-1">
      <aside className="border-r border-border/60 bg-card/80">
        <SideNavPanel />
      </aside>
      <main className="overflow-y-auto">
        {/* This is the equivalent of your old <Outlet />. Next.js will render your page content here. */}
        {children}
      </main>
      <aside className="border-l border-border/60 bg-card/80">
        <ActionHubPanel />
      </aside>
    </div>
  );
}
