import { GameList } from "../components/lists/GameList";
import { Header } from "../components/layout/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">
          Games
        </h1>
        <GameList />
      </main>
    </div>
  );
}
