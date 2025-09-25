import { Header } from "@/components/Header";
// import { LiveGamesList } from "@/components/lists/LiveGamesList"; // Uncomment when component is available

export default function LivePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Live Games</h1>
        {/* <LiveGamesList /> */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow">
          <p className="text-muted-foreground">Live games will appear here.</p>
        </div>
      </main>
    </div>
  );
}
