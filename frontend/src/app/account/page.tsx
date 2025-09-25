import { Header } from "@/components/Header";
// import { AccountCard } from "@/components/cards/AccountCard"; // Uncomment when component is available

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Account</h1>
        {/* <AccountCard /> */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow">
          <p className="text-muted-foreground">Account details will appear here.</p>
        </div>
      </main>
    </div>
  );
}
