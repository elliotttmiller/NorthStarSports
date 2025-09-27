import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { BetSlipModal } from "@/components/BetSlipModal";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = { title: "NorthStar Sports", description: "Next-generation sports betting platform" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased overflow-hidden", fontSans.variable)}>
        {/* The `children` here is your (main)/layout.tsx, which contains the three-panel shell */}
        {children}
        <BetSlipModal />
        <Toaster richColors theme="dark" position="top-right" />
      </body>
    </html>
  );
}