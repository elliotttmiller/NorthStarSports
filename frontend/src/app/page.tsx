import { SideNavPanel } from "@/components/panels/SideNavPanel";
import { WorkspacePanel } from "@/components/panels/WorkspacePanel";
import { ActionHubPanel } from "@/components/panels/ActionHubPanel";

export default function HomePage() {
  return (
    <div className="grid h-screen w-full grid-cols-[280px_1fr_320px] grid-rows-1">
      <aside className="border-r border-border/60 bg-card/80">
        <SideNavPanel />
      </aside>

      <main className="overflow-y-auto">
        <WorkspacePanel />
      </main>

      <aside className="border-l border-border/60 bg-card/80">
        <ActionHubPanel />
      </aside>
    </div>
  );
}