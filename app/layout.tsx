import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { BottomNav } from "@/components/ui/bottom-nav";

export const metadata: Metadata = {
  title: "NorthStar Sports",
  description: "Professional sports betting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pb-20">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}