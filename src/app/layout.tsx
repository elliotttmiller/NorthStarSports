import React from "react";
import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "NorthStar Sports",
  description: "Your hub for sports betting, stats, and more.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    shortcut: "/pwa-192x192.png",
    apple: "/pwa-512x512.png",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-muted text-foreground">
      {/* The <head> is now fully managed by Next.js Metadata API */}
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
