
import { cn } from "@/lib/utils";
import "@/globals.css";
import { BetSlipProvider } from "@/context/BetSlipContext";
import { UserProvider } from "@/context/UserContext";
import { BetHistoryProvider } from "@/context/BetHistoryContext";
import { BetsProvider } from "@/context/BetsContext";
import { NavigationProvider } from "@/context/NavigationContext";
import type { ReactNode } from "react";

export const metadata = {
  title: "NorthStar Sports",
  description: "Polished, professional sports betting UI with custom dark theme.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground")}> 
        <NavigationProvider>
          <BetSlipProvider>
            <UserProvider>
              <BetHistoryProvider>
                <BetsProvider>
                  {children}
                </BetsProvider>
              </BetHistoryProvider>
            </UserProvider>
          </BetSlipProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}
