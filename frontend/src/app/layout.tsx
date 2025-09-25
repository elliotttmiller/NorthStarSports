import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { BetSlipModal } from "@/components/BetSlipModal";
import { Toaster } from "@/components/ui/sonner";
import { MSWProvider } from './msw-provider';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NorthStar Sports",
  description: "Next-generation sports betting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-hidden",
          fontSans.variable
        )}
      >
        <MSWProvider>
          {/* The application no longer needs to be wrapped in providers */}
          {children}
          <BetSlipModal />
          <Toaster richColors theme="dark" position="top-right" />
        </MSWProvider>
      </body>
    </html>
  );
}