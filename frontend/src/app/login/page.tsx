import { Header } from "@/components/Header";
// import { LoginForm } from "@/components/forms/LoginForm"; // Uncomment when component is available

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Login</h1>
        {/* <LoginForm /> */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow">
          <p className="text-muted-foreground">Login form will appear here.</p>
        </div>
      </main>
    </div>
  );
}
