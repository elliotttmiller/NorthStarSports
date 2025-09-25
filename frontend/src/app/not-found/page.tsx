export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <a href="/" className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded shadow hover:bg-accent/80 transition">Go Home</a>
      </main>
    </div>
  );
}
