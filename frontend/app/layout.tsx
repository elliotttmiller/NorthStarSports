import "../src/globals.css";

export const metadata = {
  title: "NorthStar Sports",
  description: "Your hub for sports betting, stats, and more.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/pwa-192x192.png",
    apple: "/pwa-512x512.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-muted text-foreground">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/pwa-512x512.png" />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-muted text-foreground">
        {/* Global header/navigation can go here */}
        {/* <Header /> */}
        <main className="flex-1 flex flex-col items-center justify-center">
          {children}
        </main>
        {/* Global footer can go here */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
