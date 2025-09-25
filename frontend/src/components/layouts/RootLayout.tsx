
import React from "react";
import "@/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased text-foreground transition-colors duration-300">
        {/* Main content */}
        {children}
      </body>
    </html>
  );
}
