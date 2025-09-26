import { SideNavPanel } from "@/components/panels/SideNavPanel";
import { WorkspacePanel } from "@/components/panels/WorkspacePanel";
import { ActionHubPanel } from "@/components/panels/ActionHubPanel";
import { Game } from "@/types";

// THIS IS THE CRITICAL ARCHITECTURAL CHANGE
// We make the page component an `async` function.
// This turns it into a React Server Component that can fetch data.
async function getGames(): Promise<Game[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
    // This fetch happens ON THE SERVER. It is fast and secure.
    const res = await fetch(`${apiUrl}/games`, { 
      // This ensures that the data is fresh on every request.
      cache: 'no-store' 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch games");
    }
    return res.json();
  } catch (error) {
    console.error("Data fetching error:", error);
    return []; // Return an empty array on error
  }
}

export default async function HomePage() {
  // The server will `await` this data before sending any HTML to the browser.
  const games = await getGames();

  return (
    <div className="grid h-screen w-full grid-cols-[280px_1fr_320px] grid-rows-1" role="presentation">
      <aside className="border-r border-border/60 bg-card/80" aria-label="Sidebar navigation" role="complementary">
        <SideNavPanel />
      </aside>
      
      <main className="overflow-y-auto" aria-label="Main workspace" role="main">
        {/* We now pass the server-fetched data down as a prop. */}
        <WorkspacePanel initialGames={games} />
      </main>

      <aside className="border-l border-border/60 bg-card/80" aria-label="Action hub" role="region">
        <ActionHubPanel />
      </aside>
    </div>
  );
}